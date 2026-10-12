"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Suspense, useState } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const redirectParam = searchParams.get("redirect") || (typeof window !== "undefined" ? sessionStorage.getItem("pendingBookingUrl") : null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const tokenData = res?.data?.accessToken || res?.accessToken || res?.token;
      const refreshToken = res?.data?.refreshToken || res?.refreshToken;
      const userData = res?.data || res?.user;
      const role = (res?.data?.role || res?.role || userData?.role || "customer").toLowerCase();

      if (tokenData) {
        // Store token & role securely in httpOnly cookies via server handler
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: tokenData,
            refreshToken: refreshToken || null,
            role: role,
            user: userData || null,
          }),
        });

        dispatch(
          setCredentials({
            token: tokenData,
            refreshToken: refreshToken || null,
            user: userData || null,
          })
        );
      }

      toast.success(res?.message || "User logged in successfully.");

      // Check role & navigate accordingly
      let targetPath = "/customer/overview";
      if (role === "professional") {
        targetPath = "/professional/dashboard";
      } else if (role === "business") {
        targetPath = "/business/dashboard";
      } else if (role === "customer" || role === "user") {
        if (redirectParam) {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("pendingBookingUrl");
          }
          targetPath = redirectParam;
        } else {
          targetPath = "/customer/overview";
        }
      }
      router.push(targetPath);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const registerHref = redirectParam
    ? `/register?redirect=${encodeURIComponent(redirectParam)}`
    : "/register";

  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
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
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground">
            Log in to your Cloud Salon account.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">
            Email or username
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
            }`}
          />
          {errors.email && (
            <p className="text-destructive text-xs font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground block">
              Password
            </label>
            <Link href="/forgot-password" className="text-[11px] text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-3.5 py-3 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                  : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg cursor-pointer flex items-center justify-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-xs font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
        >
          {isLoading || isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link href={registerHref} className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
