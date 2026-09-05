import { CheckCircle2, ShieldCheck, Tag, Star, RotateCcw } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-[#E5E0D6] bg-[#FAF9F5] py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-center text-zinc-600 font-semibold mb-4 sm:mb-5">
          TRUSTED BY BEAUTY PROFESSIONALS AND CUSTOMERS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 text-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2C2E33]">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B78735] shrink-0" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2C2E33]">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B78735] shrink-0" />
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2C2E33]">
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B78735] shrink-0" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2C2E33]">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B78735] shrink-0" />
            <span>Trusted Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#2C2E33] col-span-2 md:col-span-1">
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B78735] shrink-0" />
            <span>Easy Rescheduling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
