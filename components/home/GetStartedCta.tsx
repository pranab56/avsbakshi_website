"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStartedCta() {
  return (
    <section className="w-full bg-[#F4EBE0] dark:bg-[#151413] py-16 sm:py-24 lg:py-28 transition-colors duration-200 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          {/* Top Sub-tagline */}
          <span className="text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            GET STARTED
          </span>

          {/* Main Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#1C1C1E] dark:text-white tracking-tight">
            Ready for Your Next <br />
            <span className="font-serif italic text-[#B98C44] dark:text-[#D99722]">
              Appointment?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#66635D] dark:text-zinc-400 font-light leading-relaxed max-w-lg mx-auto pt-1 pb-4 sm:pb-6">
            Join thousands of customers discovering and booking beauty services they love.
          </p>

          {/* Dual Action CTAs */}
          <div className="max-w-4xl mx-auto ">
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
            <Link
              href="/discover"
              className=" px-7 sm:px-9 py-3.5 rounded-lg bg-[#D99722] hover:bg-[#A37937] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs text-center shrink-0"
            >
              Find a Service
            </Link>

            <Link
              href="/discover?tab=professionals"
              className=" px-7 sm:px-9 py-3.5 rounded-lg bg-gray-100 dark:bg-[#242322] hover:bg-[#D5D0C7] dark:hover:bg-[#2F2E2C] text-[#222222] dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors shadow-2xs border border-black/5 dark:border-white/10 text-center shrink-0"
            >
              Explore Professionals
            </Link>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
