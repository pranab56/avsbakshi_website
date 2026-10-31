"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Receipt,
  Home,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const [copied, setCopied] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const user = useSelector(
    (state: { auth?: { user?: { role?: string; firstName?: string; name?: string } | null } }) =>
      state.auth?.user
  );

  const isProfessional = user?.role === "professional" || user?.role === "business";
  const dashboardHref = isProfessional
    ? "/professional/dashboard"
    : "/customer/overview";
  const bookingsHref = isProfessional
    ? "/professional/appointments"
    : "/customer/bookings";

  useEffect(() => {
    // Current date and time formatted nicely
    const now = new Date();
    setFormattedDate(
      now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  }, []);

  const handleCopySessionId = async () => {
    if (!sessionId) return;
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);
      toast.success("Transaction Reference ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy ID.");
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D99722]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-xl w-full"
      >
        {/* Main Card */}
        <div className="relative rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161618] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Success Icon with Animated Rings */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25"
              >
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.25, opacity: 0.4 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }}
                className="absolute inset-0 rounded-full bg-emerald-400 blur-md -z-10"
              />
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Payment Confirmed
            </span>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md">
              Thank you{user?.firstName ? `, ${user.firstName}` : ""}! Your transaction has been processed securely. Your booking details have been confirmed.
            </p>
          </div>

          {/* Transaction Summary Box */}
          <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-5 space-y-3.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Payment Status
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[#D99722]" />
                Payment Method
              </span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Stripe Secure Checkout
              </span>
            </div>

            {formattedDate && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  Date &amp; Time
                </span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {formattedDate}
                </span>
              </div>
            )}

            {/* Session ID Reference (with copy button) */}
            {sessionId && (
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
                    Session Reference
                  </span>
                  <p className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate max-w-[260px] sm:max-w-[300px]">
                    {sessionId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySessionId}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Helpful Information Notice */}
          <div className="mt-6 rounded-2xl bg-[#D99722]/5 dark:bg-[#D99722]/10 border border-[#D99722]/20 p-4 text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5">
            <p className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99722]" />
              What happens next?
            </p>
            <p>
              • A full booking confirmation &amp; receipt has been sent to your registered email.
            </p>
            <p>
              • Your specialist has received your booking schedule and is notified.
            </p>
            <p>
              • You can view appointment status, message the professional, or make changes anytime in your bookings dashboard.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={bookingsHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D99722] to-[#b87e1a] hover:from-[#c2841b] hover:to-[#a16d14] text-white font-semibold text-sm shadow-lg shadow-[#D99722]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Calendar className="w-4 h-4" />
              <span>View My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={dashboardHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Secondary Link */}
          <div className="mt-6 text-center">
            <Link
              href="/services"
              className="text-xs text-zinc-500 hover:text-[#D99722] dark:text-zinc-400 dark:hover:text-[#D99722] transition-colors underline-offset-4 hover:underline"
            >
              Browse more services &amp; salons
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[#D99722] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Verifying payment confirmation...
            </p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

