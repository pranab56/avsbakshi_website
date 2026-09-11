import { LucideIcon } from "lucide-react";

export interface StepItem {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface RoleStepsTimelineProps {
  steps: StepItem[];
}

export default function RoleStepsTimeline({ steps }: RoleStepsTimelineProps) {
  return (
    <section className="py-20 flex justify-center items-center bg-background">
      <div className="relative space-y-16 sm:space-y-20 max-w-xl">
        {/* Vertical Connecting Line */}
        <div className="absolute left-6 sm:left-7 top-6 bottom-6 w-[2px] bg-border -z-0" />

        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isFirst = idx === 0;

          return (
            <div
              key={step.num}
              className="relative z-10 flex items-start gap-5 sm:gap-6 group"
            >
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm ${
                  isFirst
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent border border-border text-muted-foreground"
                }`}
              >
                <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Content */}
              <div className="pt-1 sm:pt-2 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-title font-semibold text-xs sm:text-sm text-primary">
                    {step.num}
                  </span>
                  <h3 className="font-title text-lg sm:text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal mt-1.5 max-w-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

