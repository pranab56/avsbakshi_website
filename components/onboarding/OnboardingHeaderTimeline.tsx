"use client";

import { Check, Building2, Sparkles, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface OnboardingHeaderTimelineProps {
  currentStep: number;
  onNavigateToStep: (step: number) => void;
}

const STEPS_LIST = [
  { number: 1, label: "Salon Info", icon: Building2 },
  { number: 2, label: "Category", icon: Sparkles },
  { number: 3, label: "Contact & Links", icon: Phone },
  { number: 4, label: "Address", icon: MapPin },
  { number: 5, label: "Schedule", icon: Clock },
  { number: 6, label: "Media", icon: CheckCircle2 },
];

export default function OnboardingHeaderTimeline({
  currentStep,
  onNavigateToStep,
}: OnboardingHeaderTimelineProps) {
  return (
    <div className="space-y-3 pt-1">
      {/* Top Progress Bar Line */}
      <div className="relative w-full h-1.5 bg-accent/60 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(234,179,8,0.5)]"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        />
      </div>

      {/* 6 Step Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
        {STEPS_LIST.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onNavigateToStep(step.number)}
              disabled={step.number > currentStep}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center duration-200 ${
                isActive
                  ? "bg-primary/10 border-primary/50 text-foreground font-semibold shadow-xs ring-1 ring-primary/30"
                  : isCompleted
                    ? "bg-accent/40 border-border text-foreground hover:bg-accent/70 cursor-pointer"
                    : "bg-accent/20 border-border/50 text-muted-foreground opacity-50 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-transform duration-200 mb-1 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs scale-105"
                    : isCompleted
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-muted/80 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
              </div>
              <span className={`text-[10px] truncate w-full leading-tight font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
