"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "+44 7700 900077";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleVerify = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }
    toast.success("Phone verified successfully! Welcome to Cloud Salon.");
    router.push("/");
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    toast.info("A new verification code has been sent to " + phone);
    inputRefs.current[0]?.focus();
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
            <h1 className="  text-3xl font-bold text-foreground">
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
        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow transition-all text-sm cursor-pointer"
      >
        Verify Phone Number
      </button>

      <div className="flex items-center justify-between text-xs pt-2">
        <span className="text-muted-foreground">Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={handleResend}
          className="text-primary font-semibold hover:underline cursor-pointer"
        >
          Resend code
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground pt-2">
        Already verified?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Log In
        </Link>
      </p>
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
