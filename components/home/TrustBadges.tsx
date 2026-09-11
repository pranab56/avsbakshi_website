import { CheckCircle2, ShieldCheck, Tag, Star, RotateCcw } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-card/60 py-6 sm:py-10 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-center text-muted-foreground font-semibold mb-4 sm:mb-5">
          TRUSTED BY BEAUTY PROFESSIONALS AND CUSTOMERS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 text-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground">
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
            <span>Trusted Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-foreground col-span-2 md:col-span-1">
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
            <span>Easy Rescheduling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
