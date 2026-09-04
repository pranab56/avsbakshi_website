"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useResendPasswordMutation } from "@/features/auth/authApi";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResendPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      if (token) {
        await resetPassword({
          token,
          data: { newPassword: data.password, confirmPassword: data.confirmPassword },
        }).unwrap();
      }
      toast.success("Password reset successfully! Please log in.");
      router.push("/login");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to reset password. Please try again.");
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

      <div className="space-y-1.5">
        <h1 className="font-title text-3xl font-bold text-[#1A1A1A]">
          Set New Password
        </h1>
        <p className="text-xs text-zinc-500">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-zinc-700 block">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-3.5 py-3 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 bg-red-50/20 focus:ring-red-300"
                  : "border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-zinc-700 block">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`w-full px-3.5 py-3 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 bg-red-50/20 focus:ring-red-300"
                  : "border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs font-medium mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
        </button>
      </form>

      <p className="text-xs text-center text-zinc-500 pt-2">
        Remember your password?{" "}
        <Link href="/login" className="text-[#B78735] font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-xs text-zinc-500">Loading screen...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
