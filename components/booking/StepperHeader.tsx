"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

interface StepperHeaderProps {
  step: number;
  handlePrevStep: () => void;
}

export default function StepperHeader({ step, handlePrevStep }: StepperHeaderProps) {
  const activeStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [step]);

  return (
    <div className="border-b border-border py-3.5 sm:py-6 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 min-w-0">
        <button
          type="button"
          onClick={handlePrevStep}
          className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 bg-card hover:bg-accent border border-border rounded-sm text-xs font-semibold text-foreground transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {/* Stepper Steps with smooth horizontal scrolling */}
        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x flex justify-start sm:justify-end">
          <div className="flex items-center gap-2 sm:gap-3 text-xs w-max py-1 pr-4 sm:pr-0">
            {[
              { num: 1, label: "Service" },
              { num: 2, label: "Date" },
              { num: 3, label: "Time" },
              { num: 4, label: "Review" },
              { num: 5, label: "Submitted" },
            ].map((s, idx) => {
              const isActive = step === s.num;
              return (
                <div
                  key={s.num}
                  ref={isActive ? activeStepRef : null}
                  className="flex items-center gap-2 shrink-0"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/30"
                          : step > s.num
                          ? "bg-emerald-600 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </span>
                    <span
                      className={`text-xs whitespace-nowrap ${
                        isActive
                          ? "text-foreground font-bold"
                          : "text-muted-foreground font-medium"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 4 && <span className="w-3 sm:w-8 h-[1px] bg-border shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

