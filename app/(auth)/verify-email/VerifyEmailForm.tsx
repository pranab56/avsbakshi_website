'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/features/auth/authApi';

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const router = useRouter();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    if (otp.some((d) => d === '')) {
      setOtpError('Please enter the full 6-digit code');
      return;
    }
    try {
      await verifyOtp({ email, oneTimeCode: parseInt(otp.join(''), 10) }).unwrap();
      toast.success('Email verified successfully!');
      router.push('/login');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      const msg = error?.data?.message || 'Invalid code. Please try again.';
      setOtpError(msg);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      toast.success('A new code has been sent to your email.');
      otpRefs.current[0]?.focus();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6 text-left">
      <div>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Log In
        </Link>
      </div>

      <div className="space-y-3">
        <Image
          src="/icons/Light_Mode.png"
          alt="Cloud Salon Logo"
          width={150}
          height={40}
          className="h-10 w-auto object-contain block dark:hidden"
        />
        <Image
          src="/icons/Dark_Mode.png"
          alt="Cloud Salon Logo"
          width={150}
          height={40}
          className="h-10 w-auto object-contain hidden dark:block"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MailCheck className="w-5 h-5" />
            </div> */}
            <h1 className="  text-3xl font-bold text-foreground">
              Verify Your Email
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            We&apos;ve sent a 6-digit verification code to{' '}
            {email ? <span className="font-semibold text-foreground break-all">{email}</span> : 'your email'}
          </p>
        </div>
      </div>

      {/* 6 Digit Input Boxes */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 my-4" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                otpRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-10 sm:w-12 h-12 sm:h-14 text-center font-bold text-xl rounded-xl border transition-all focus:outline-none focus:ring-2 ${otpError
                ? 'border-destructive bg-destructive/10 focus:ring-destructive/30 text-destructive'
                : digit
                  ? 'border-primary bg-primary/10 text-primary focus:ring-primary/20'
                  : 'border-border bg-card text-foreground focus:border-primary focus:ring-primary/20'
                }`}
            />
          ))}
        </div>
        {otpError && <p className="text-destructive text-xs font-medium text-center">{otpError}</p>}
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Email'}
      </button>

      <div className="flex items-center justify-between text-xs pt-2">
        <span className="text-muted-foreground">Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-primary font-semibold hover:underline cursor-pointer disabled:opacity-50 flex items-center gap-1"
        >
          {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
          Resend Code
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground pt-2">
        Already verified?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
