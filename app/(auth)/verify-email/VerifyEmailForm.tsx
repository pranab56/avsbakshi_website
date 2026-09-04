'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react';
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
    <div className="max-w-lg mx-auto w-full space-y-6 text-center">
      <div className="text-left">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#B78735] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="w-12 h-12 rounded-full bg-[#B78735]/10 text-[#B78735] flex items-center justify-center mx-auto">
        <MailCheck className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h1 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
          Verify Your Email
        </h1>
        <p className="text-xs text-zinc-500">
          We&apos;ve sent a 6-digit verification code to{' '}
          {email ? <span className="font-semibold text-zinc-800 break-all">{email}</span> : 'your email'}
        </p>
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
              className={`w-10 sm:w-12 h-12 sm:h-14 text-center font-bold text-xl rounded-sm border transition-all focus:outline-none focus:ring-2 ${
                otpError
                  ? 'border-red-500 bg-red-50/20 focus:ring-red-300 text-red-600'
                  : digit
                  ? 'border-[#B78735] bg-[#B78735]/5 text-[#B78735] focus:ring-[#B78735]/30'
                  : 'border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20 text-[#1A1A1A]'
              }`}
            />
          ))}
        </div>
        {otpError && <p className="text-red-500 text-xs font-medium">{otpError}</p>}
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Email'}
      </button>

      <div className="flex items-center justify-between text-xs pt-2">
        <span className="text-zinc-500">Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-[#B78735] font-semibold hover:underline cursor-pointer disabled:opacity-50 flex items-center gap-1"
        >
          {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
          Resend Code
        </button>
      </div>

      <p className="text-xs text-center text-zinc-500 pt-2">
        Already verified?{' '}
        <Link href="/login" className="text-[#B78735] font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
