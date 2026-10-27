"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, User, Scissors, Building2, Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { Combobox } from "@/components/ui/combobox";
import { PhoneInput } from "@/components/ui/phone-input";
import { useSignUpMutation } from "@/features/auth/authApi";

const roles = [
  {
    value: "customer",
    label: "Customer",
    description: "Book beauty services",
    icon: User,
  },
  {
    value: "professional",
    label: "Professional",
    description: "Offer your skills & create your business",
    icon: Scissors,
  }
];

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const initialRole = roles.find((r) => r.value === roleParam?.toLowerCase()) || roles[0];

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: initialRole.value,
      password: "",
    },
  });

  useEffect(() => {
    if (roleParam) {
      const matchedRole = roles.find((r) => r.value === roleParam.toLowerCase());
      if (matchedRole) {
        setSelectedRole(matchedRole);
        setValue("role", matchedRole.value, { shouldValidate: true });
      }
    }
  }, [roleParam, setValue]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        password: data.password,
      };
      const res = await signUp(payload).unwrap();
      toast.success(res?.message || "Account created successfully. Please verify your email.");
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}&role=${encodeURIComponent(data.role)}`);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-5">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[#D99722] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>

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
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Join The Cloud Salon to book appointments or elevate your beauty career.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-foreground block">First name</label>
            <input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                  : "border-border bg-card text-foreground focus:border-[#D99722] focus:ring-[#D99722]/20"
              }`}
            />
            {errors.firstName && (
              <p className="text-destructive text-[11px] font-medium mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-foreground block">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                  : "border-border bg-card text-foreground focus:border-[#D99722] focus:ring-[#D99722]/20"
              }`}
            />
            {errors.lastName && (
              <p className="text-destructive text-[11px] font-medium mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold text-foreground block">Email address</label>
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
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="space-y-1.5 text-left relative">
          <label className="text-xs font-bold text-foreground block">I am joining as</label>
          <input type="hidden" {...register("role")} value={selectedRole.value} />
          <Combobox
            options={roles}
            value={selectedRole.value}
            onChange={(val) => {
              const r = roles.find((role) => role.value === val) || roles[0];
              setSelectedRole(r);
              setValue("role", r.value, { shouldValidate: true });
            }}
            error={!!errors.role}
            triggerClassName="w-full h-12 px-3.5 rounded-xl border border-border bg-card hover:bg-accent/40 text-foreground text-sm font-medium transition-all focus:border-[#D99722] focus:ring-[#D99722]/20 shadow-2xs"
            align="start"
          />
          {errors.role && (
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold text-foreground block">Password</label>
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
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-3.5 bg-[#D99722] hover:bg-[#C2841B] active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-[#D99722]/20 transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-70"
        >
          {isLoading || isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground pt-1">
        Already have an account?{" "}
        <Link href="/login" className="text-[#D99722] font-bold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading signup form...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
