"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
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
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Log In
      </Link>

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
        <div className="space-y-1.5">
          <h1 className="  text-3xl font-bold text-foreground">
            Set New Password
          </h1>
          <p className="text-xs text-muted-foreground">
            Your new password must be different from previously used passwords.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-3.5 py-3 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.password
                  ? "border-destructive bg-destructive/10 text-foreground placeholder:text-muted-foreground focus:ring-destructive/30"
                  : "border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-xs font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`w-full px-3.5 py-3 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.confirmPassword
                  ? "border-destructive bg-destructive/10 text-foreground placeholder:text-muted-foreground focus:ring-destructive/30"
                  : "border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-xs font-medium mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Password"}
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground pt-2">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-xs text-muted-foreground">Loading screen...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

