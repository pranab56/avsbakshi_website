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
    <div className="max-w-lg mx-auto w-full space-y-6 text-center">
      <div className="text-left">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#B78735] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <Image
        src="/icons/logo.png"
        alt="Cloud Salon Logo"
        width={80}
        height={80}
        className="object-contain mx-auto block dark:hidden"
      />
      <Image
        src="/icons/logo.png"
        alt="Cloud Salon Logo"
        width={80}
        height={80}
        className="object-contain mx-auto hidden dark:block"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="w-12 h-12 rounded-full bg-[#B78735]/10 text-[#B78735] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h1 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
          Verify Phone Number
        </h1>
        <p className="text-xs text-zinc-500">
          We sent a 6-digit verification code to <span className="font-semibold text-zinc-800">{phone}</span>
        </p>
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
              className={`w-10 sm:w-12 h-12 sm:h-14 text-center font-bold text-xl rounded-sm border transition-all focus:outline-none focus:ring-2 ${error
                  ? "border-red-500 bg-red-50/20 focus:ring-red-300 text-red-600"
                  : digit
                    ? "border-[#B78735] bg-[#B78735]/5 text-[#B78735] focus:ring-[#B78735]/30"
                    : "border-[#E5E0D6] bg-white focus:border-[#B78735] focus:ring-[#B78735]/20 text-[#1A1A1A]"
                }`}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
      </div>

      <button
        onClick={handleVerify}
        className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer"
      >
        Verify Phone Number
      </button>

      <div className="flex items-center justify-between text-xs pt-2">
        <span className="text-zinc-500">Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={handleResend}
          className="text-[#B78735] font-semibold hover:underline cursor-pointer"
        >
          Resend code
        </button>
      </div>

      <p className="text-xs text-center text-zinc-500 pt-2">
        Already verified?{" "}
        <Link href="/login" className="text-[#B78735] font-semibold hover:underline">
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
