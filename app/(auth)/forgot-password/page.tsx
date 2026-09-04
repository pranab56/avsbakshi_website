'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';
import {
  useForgotEmailMutation,
  useResendOtpMutation,
  useResendPasswordMutation,
  useVerifyOtpMutation,
} from '@/features/auth/authApi';

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [forgotEmail, { isLoading: isSendingOtp }] = useForgotEmailMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResendPasswordMutation();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

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

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      await forgotEmail({ email: data.email }).unwrap();
      setSubmittedEmail(data.email);
      toast.success('OTP sent! Please check your email.');
      setStep(2);
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const onVerifyOtp = async () => {
    if (otp.some((d) => d === '')) {
      setOtpError('Please enter the full 6-digit code');
      return;
    }
    try {
      const result = await verifyOtp({
        email: submittedEmail,
        oneTimeCode: parseInt(otp.join(''), 10),
      }).unwrap();
      setResetToken(result.data);
      toast.success('OTP verified!');
      setStep(3);
    } catch (err) {
      const error = err as { data?: { message?: string } };
      const msg = error?.data?.message || 'Invalid OTP. Please try again.';
      setOtpError(msg);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email: submittedEmail }).unwrap();
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      toast.success('A new code has been sent to your email.');
      otpRefs.current[0]?.focus();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to resend code.');
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      await resetPassword({
        token: resetToken,
        data: { newPassword: data.password, confirmPassword: data.confirmPassword },
      }).unwrap();
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#B78735] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Log In
      </Link>

      {/* Step 1: Email Input */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-title text-3xl font-bold text-[#1A1A1A]">
              Reset Password
            </h1>
            <p className="text-xs text-zinc-500">
              Enter your email address and we&apos;ll send you a verification code to reset your password.
            </p>
          </div>

          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-700 block">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...emailForm.register('email')}
                className={`w-full px-3.5 py-3 rounded-sm border text-sm transition-all focus:outline-none focus:ring-2 ${
                  emailForm.formState.errors.email
                    ? 'border-red-500 bg-red-50/20 focus:ring-red-300'
                    : 'border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20'
                }`}
              />
              {emailForm.formState.errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isSendingOtp ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Send Verification Code'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Verification Code */}
      {step === 2 && (
        <div className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#B78735]/10 text-[#B78735] flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Enter Verification Code
            </h1>
            <p className="text-xs text-zinc-500">
              Enter the 6-digit code sent to <span className="font-semibold text-zinc-800">{submittedEmail}</span>
            </p>
          </div>

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
            onClick={onVerifyOtp}
            disabled={isVerifyingOtp}
            className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isVerifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Code'}
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
        </div>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-title text-3xl font-bold text-[#1A1A1A]">
              Set New Password
            </h1>
            <p className="text-xs text-zinc-500">
              Please enter a secure new password for your account.
            </p>
          </div>

          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-700 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...passwordForm.register('password')}
                  className={`w-full px-3.5 py-3 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-2 ${
                    passwordForm.formState.errors.password
                      ? 'border-red-500 bg-red-50/20 focus:ring-red-300'
                      : 'border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordForm.formState.errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {passwordForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-700 block">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...passwordForm.register('confirmPassword')}
                  className={`w-full px-3.5 py-3 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-2 ${
                    passwordForm.formState.errors.confirmPassword
                      ? 'border-red-500 bg-red-50/20 focus:ring-red-300'
                      : 'border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isResetting}
              className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
