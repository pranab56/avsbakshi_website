"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { saveToken, saveRefreshToken, saveUser } from "@/utils/storage";
import OnboardingModal from "@/components/auth/OnboardingModal";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "+44 7700 900077";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const dispatch = useDispatch();

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }
    try {
      const res = await verifyOtp({
        email,
        oneTimeCode: parseInt(fullOtp, 10),
      }).unwrap();

      const tokenData = res?.data?.accessToken || res?.accessToken || res?.token;
      const refreshToken = res?.data?.refreshToken || res?.refreshToken;
      const userData = res?.data || res?.user;

      let savedRole = "";
      if (typeof window !== "undefined") {
        savedRole =
          sessionStorage.getItem("pending_registration_role") ||
          localStorage.getItem("pending_registration_role") ||
          "";
      }
      const queryRole = searchParams.get("role");
      const apiRole = res?.data?.role || res?.role || userData?.role;
      const rawRole = (queryRole || savedRole || apiRole || "customer").toLowerCase().trim();

      let normalizedRole = "customer";
      if (
        rawRole === "business" ||
        rawRole === "salon_owner" ||
        rawRole === "salonowner" ||
        rawRole === "salon-owner"
      ) {
        normalizedRole = "business";
      } else if (rawRole === "professional" || rawRole === "pro") {
        normalizedRole = "professional";
      } else {
        normalizedRole = "customer";
      }

      if (tokenData) {
        saveToken(tokenData);
        if (refreshToken) saveRefreshToken(refreshToken);
        const resolvedUser = userData ? { ...userData, role: normalizedRole } : null;
        if (resolvedUser) saveUser(resolvedUser);

        dispatch(
          setCredentials({
            token: tokenData,
            refreshToken: refreshToken || null,
            user: resolvedUser,
          })
        );

        try {
          await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              token: tokenData,
              refreshToken: refreshToken || null,
              role: normalizedRole,
              user: resolvedUser,
            }),
          });
        } catch {}
      }

      // Cleanup pending registration storage
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("pending_registration_role");
        localStorage.removeItem("pending_registration_role");
      }

      toast.success(res?.message || "Verification Successful");
      if (normalizedRole === "business") {
        router.push("/onboarding/business/saloninfo");
      } else if (normalizedRole === "professional") {
        router.push("/professional/dashboard");
      } else {
        router.push("/customer/overview");
      }
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string } };
      const msg = errObj?.data?.message || "Invalid OTP. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      setOtp(["", "", "", "", "", ""]);
      setError("");
      toast.success(res?.message || "Please check your email. We have sent you a one-time passcode (OTP).");
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const errObj = err as { data?: { message?: string } };
      toast.error(errObj?.data?.message || "Failed to resend code.");
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6 text-left">
      <div>
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Register
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
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Verify Phone Number
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            We sent a 6-digit verification code to <span className="font-semibold text-foreground">{phone}</span>
          </p>
        </div>
      </div>

      {/* 6 Digit Input Boxes */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 my-4" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-10 sm:w-12 h-12 sm:h-14 text-center font-bold text-xl rounded-xl border transition-all focus:outline-none focus:ring-2 ${error
                  ? "border-destructive bg-destructive/10 focus:ring-destructive/30 text-destructive"
                  : digit
                    ? "border-primary bg-primary/10 text-primary focus:ring-primary/20"
                    : "border-border bg-card text-foreground focus:border-primary focus:ring-primary/20"
                }`}
            />
          ))}
        </div>
        {error && <p className="text-destructive text-xs font-medium text-center">{error}</p>}
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Code"}
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
          Resend code
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground pt-2">
        Already verified?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log In
        </Link>
      </p>

      {/* Onboarding Modal Popup for Professional Role */}
      <OnboardingModal
        open={showOnboardingModal}
        onOpenChange={setShowOnboardingModal}
      />
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading OTP screen...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
