"use client";

import { Sparkles, Clock, ShieldCheck, Headphones } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#121214] text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
      {/* Ambient Gold Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D99722]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-80 h-80 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D99722] animate-pulse" />
            <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
              HELP CENTER &amp; CONTACT
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white">
            We are here to assist <br />
            your <span className="text-[#D99722]">salon journey.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Whether you need assistance with an appointment, chair rental, salon onboarding, or account settings, our concierge support team is ready seven days a week.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-8 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D99722]" />
              <span>Response in under 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#D99722]" />
              <span>7 Days a Week Live Concierge</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D99722]" />
              <span>Verified Client &amp; Stylist Protection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

