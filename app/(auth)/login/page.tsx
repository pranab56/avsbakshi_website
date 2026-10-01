"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { useDispatch } from "react-redux";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

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
      const role = res?.data?.role || res?.role || userData?.role || "customer";

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

      // Redirect user according to authenticated role
      let targetPath = "/customer/overview";
      if (role === "professional") {
        targetPath = "/professional/dashboard";
      } else if (role === "business") {
        targetPath = "/business/dashboard";
      }
      router.push(targetPath);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

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
          <h1 className="  text-3xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground">
            Log in to your Cloud Salon account.
          </p>
        </div>
      </div>

      {/* Social Logins */}
      {/* <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => {
            toast.success("Google login successful!");
            router.push("/");
          }}
          className="w-full py-3 px-4 bg-card border border-border rounded-xl text-xs font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => {
            toast.success("Facebook login successful!");
            router.push("/");
          }}
          className="w-full py-3 px-4 bg-card border border-border rounded-xl text-xs font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div> */}

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
            className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.email
              ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
              : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
              }`}
          />
          {/* Required error message displayed under input field */}
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
              className={`w-full px-3.5 py-3 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.password
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
          {/* Required error message displayed under input field */}
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
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
