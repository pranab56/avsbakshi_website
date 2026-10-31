"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  XCircle,
  ArrowLeft,
  RotateCcw,
  Calendar,
  HelpCircle,
  Home,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

function PaymentCancelContent() {
  const router = useRouter();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D99722]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-xl w-full"
      >
        {/* Main Card */}
        <div className="relative rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161618] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Cancel Icon */}
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
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25"
              >
                <XCircle className="w-10 h-10 stroke-[2.5]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.25, opacity: 0.3 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2.2,
                }}
                className="absolute inset-0 rounded-full bg-rose-400 blur-md -z-10"
              />
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              Checkout Incomplete
            </span>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Payment Cancelled
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md">
              Your payment session was cancelled. No money was deducted from your account, and your card was not charged.
            </p>
          </div>

          {/* Explanation Box */}
          <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-5 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <p className="font-semibold text-zinc-900 dark:text-white text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#D99722]" />
              What happened?
            </p>
            <p>
              • The checkout process was closed before completion, or the transaction was declined by the cardholder.
            </p>
            <p>
              • If you intended to modify your services, booking date, or select a different specialist, your details can be updated easily.
            </p>
            <p>
              • Any reserved slots that were not confirmed will be released back to the salon schedule.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D99722] to-[#b87e1a] hover:from-[#c2841b] hover:to-[#a16d14] text-white font-semibold text-sm shadow-lg shadow-[#D99722]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#D99722]" />
              <span>Browse Services</span>
            </Link>
          </div>

          {/* Auxiliary Navigation Links */}
          <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs gap-3">
            <Link
              href="/customer/bookings"
              className="text-zinc-500 hover:text-[#D99722] dark:text-zinc-400 dark:hover:text-[#D99722] flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>My Bookings</span>
            </Link>

            <Link
              href="/faq"
              className="text-zinc-500 hover:text-[#D99722] dark:text-zinc-400 dark:hover:text-[#D99722] flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help &amp; FAQs</span>
            </Link>

            <Link
              href="/"
              className="text-zinc-500 hover:text-[#D99722] dark:text-zinc-400 dark:hover:text-[#D99722] flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading cancellation...</p>
          </div>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}

