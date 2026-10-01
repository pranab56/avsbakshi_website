"use client";

import { Sparkles, Building2, Armchair, ArrowRight } from "lucide-react";

interface OnboardingChoiceScreenProps {
  onSelectBusiness: () => void;
  onSelectSkip: () => void;
}

export default function OnboardingChoiceScreen({
  onSelectBusiness,
  onSelectSkip,
}: OnboardingChoiceScreenProps) {
  return (
    <div className="space-y-8 text-left animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Welcome Professional</span>
        </div>
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl lg:text-5xl text-foreground pt-1">
          Onboarding &amp; Profile Setup
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Your account verification is complete! How would you like to set up your professional profile today?
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Setup Salon Business */}
        <div
          onClick={onSelectBusiness}
          className="bg-card hover:bg-accent/40 border-2 border-border hover:border-primary p-6 rounded-2xl transition-all cursor-pointer space-y-4 group shadow-md text-left relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>Setup Salon Business</span>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Create your salon page, showcase your services, operating hours, gallery photos, and location.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-1">
            <span>Start Step-by-Step Setup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Option 2: Rent Chair / Independent Professional */}
        <div
          onClick={onSelectSkip}
          className="bg-card hover:bg-accent/40 border-2 border-border hover:border-emerald-500/50 p-6 rounded-2xl transition-all cursor-pointer space-y-4 group shadow-md text-left relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Armchair className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-emerald-500 transition-colors flex items-center justify-between">
              <span>Rent Chair / Independent</span>
              <ArrowRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rent chairs or work independently across salon spaces. You can configure a full business profile anytime later.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span>Go to Professional Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
