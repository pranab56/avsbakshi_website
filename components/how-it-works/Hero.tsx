"use client";

import { User, Scissors, Building2 } from "lucide-react";

export type RoleType = "customers" | "professionals" | "businesses";

interface HeroProps {
  activeRole: RoleType;
  setActiveRole: (role: RoleType) => void;
}

export default function Hero({ activeRole, setActiveRole }: HeroProps) {
  return (
    <section className="bg-[#181715] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.25em] block">
          HOW IT WORKS
        </span>

        <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight">
          <span className="italic block text-white font-serif">
            Simple for everyone.
          </span>
          <span className="italic block text-[#B78735] font-serif mt-1">
            Powerful where it counts.
          </span>
        </h1>

        {/* Role Filter Tabs (Segmented Control Pill) */}
        <div className="pt-4 flex justify-center">
          <div className="bg-[#242220] p-1.5 rounded-2xl border border-white/10 inline-flex items-center gap-1 max-w-full overflow-x-auto shadow-inner">
            <button
              type="button"
              onClick={() => setActiveRole("customers")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeRole === "customers"
                  ? "bg-[#B78735] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              For Customers
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("professionals")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeRole === "professionals"
                  ? "bg-[#B78735] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Scissors className="w-4 h-4" />
              For Professionals
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("businesses")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeRole === "businesses"
                  ? "bg-[#B78735] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              For Businesses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
