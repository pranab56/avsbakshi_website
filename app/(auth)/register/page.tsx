"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, User, Scissors, Building2 } from "lucide-react";
import { Suspense, useState } from "react";
import { Combobox } from "@/components/ui/combobox";

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
    description: "Offer your skills & services",
    icon: Scissors,
  },
  {
    value: "business",
    label: "Business / Salon Owner",
    description: "Manage your salon",
    icon: Building2,
  },
];

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required").min(10, "Please enter a valid phone number"),
  role: z.string().min(1, "Please select a role"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterFormContent() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "customer",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    toast.success("Account details saved! Please verify your phone number.");
    router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&role=${encodeURIComponent(data.role)}`);
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#B78735] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>

      <div className="space-y-3">
        <Image
          src="/icons/logo.png"
          alt="Cloud Salon Logo"
          width={80}
          height={80}
          className="object-contain block dark:hidden"
        />
        <Image
          src="/icons/logo.png"
          alt="Cloud Salon Logo"
          width={80}
          height={80}
          className="object-contain hidden dark:block"
          style={{ mixBlendMode: "screen" }}
        />
        <div className="space-y-1">
          <h1 className="font-title text-3xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="text-xs text-muted-foreground">
            Join The Cloud Salon and get started today.
          </p>
        </div>
      </div>

      {/* Social Register */}
      <div className="grid gap-2.5">
        <button
          type="button"
          onClick={() => {
            toast.success("Google signup successful!");
            router.push("/verify-otp");
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
            toast.success("Facebook signup successful!");
            router.push("/verify-otp");
          }}
          className="w-full py-3 px-4 bg-card border border-border rounded-xl text-xs font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-border w-full" />
        <span className="bg-background px-3 text-[10px] text-muted-foreground font-medium tracking-wider uppercase absolute">
          or register with email
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-foreground block">First name</label>
            <input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.firstName
                ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
                }`}
            />
            {errors.firstName && (
              <p className="text-destructive text-[11px] font-medium mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-foreground block">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.lastName
                ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
                : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
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
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.email
              ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
              : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
              }`}
          />
          {errors.email && (
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">Phone number</label>
          <input
            type="tel"
            placeholder="+1 234 567 8900"
            {...register("phone")}
            className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.phone
              ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
              : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
              }`}
          />
          {errors.phone && (
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Role Dropdown — after phone number */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">I am joining as</label>
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
            triggerClassName="w-full px-3.5 py-3 rounded-xl border border-border bg-card hover:bg-accent text-foreground text-sm font-medium transition-all"
            align="start"
          />
          {errors.role && (
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-foreground block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${errors.password
              ? "border-destructive bg-destructive/10 focus:ring-destructive/30"
              : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
              }`}
          />
          {errors.password && (
            <p className="text-destructive text-[11px] font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer mt-2"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
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
