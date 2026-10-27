"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials, logout } from "@/features/auth/authSlice";

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
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const redirectParam = searchParams.get("redirect") || (typeof window !== "undefined" ? sessionStorage.getItem("pendingBookingUrl") : null);

  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      dispatch(logout());
      toast.success("Successfully logged out.");
      router.replace("/login");
    }
  }, [searchParams, dispatch, router]);

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
      const userData = res?.data?.user || res?.data || res?.user;

      const rawRole =
        res?.data?.role ||
        res?.role ||
        res?.data?.user?.role ||
        res?.user?.role ||
        userData?.role ||
        "";

      const role = String(rawRole).toLowerCase().trim();

      // Only customer (or user) and professional roles are allowed.
      // Super admin or any other role throws an error and is blocked.
      const isCustomer = role === "customer" || role === "user";
      const isProfessional = role === "professional";

      if (!isCustomer && !isProfessional) {
        throw new Error("Access denied. Only Customer and Professional accounts can log in here. Super Admin and unauthorized roles are not permitted.");
      }

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

      // Check role & determine destination path
      let targetPath = "/customer/overview";
      if (isProfessional) {
        targetPath = "/professional/dashboard";
      } else if (isCustomer) {
        if (redirectParam) {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("pendingBookingUrl");
          }
          targetPath = redirectParam;
        } else {
          targetPath = "/customer/overview";
        }
      }

      // Smooth redirection delay
      setIsRedirecting(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push(targetPath);
    } catch (err: unknown) {
      setIsRedirecting(false);
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error?.data?.message || error?.message || "Login failed. Please check your credentials.");
    }
  };

  const registerHref = redirectParam
    ? `/register?redirect=${encodeURIComponent(redirectParam)}`
    : "/register";

  return (
    <div className="max-w-md mx-auto w-full space-y-6">
      <div className="space-y-3">
        <Link href="/" className="inline-block group">
          <Image
            src="/icons/Light_Mode.png"
            alt="Cloud Salon Logo"
            width={160}
            height={44}
            className="h-10 w-auto object-contain block dark:hidden transition-transform group-hover:scale-102"
          />
          <Image
            src="/icons/Dark_Mode.png"
            alt="Cloud Salon Logo"
            width={160}
            height={44}
            className="h-10 w-auto object-contain hidden dark:block transition-transform group-hover:scale-102"
          />
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Log in to manage appointments, workspaces, or book your next service.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold text-foreground block">
            Email or username
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                  : "border-border bg-card text-foreground focus:border-[#D99722] focus:ring-[#D99722]/20"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-xs font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground block">
              Password
            </label>
            <Link href="/forgot-password" className="text-[11px] font-semibold text-[#D99722] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                  : "border-border bg-card text-foreground focus:border-[#D99722] focus:ring-[#D99722]/20"
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
          disabled={isSubmitting || isLoading || isRedirecting}
          className="w-full py-3.5 bg-[#D99722] hover:bg-[#C2841B] active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-[#D99722]/20 transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-70"
        >
          {isLoading || isSubmitting || isRedirecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isRedirecting ? "Redirecting..." : "Logging In..."}</span>
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground pt-1">
        Don&apos;t have an account?{" "}
        <Link href={registerHref} className="text-[#D99722] font-bold hover:underline">
          Create an account
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
