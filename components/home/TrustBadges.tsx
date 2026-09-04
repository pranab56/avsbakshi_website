import { CheckCircle2, ShieldCheck, Tag, Star, RotateCcw } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-[#E5E0D6] bg-[#FAF9F5] py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-widest text-center text-zinc-400 font-semibold mb-5">
          TRUSTED BY BEAUTY PROFESSIONALS AND CUSTOMERS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C2E33]">
            <CheckCircle2 className="w-4 h-4 text-[#B78735]" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C2E33]">
            <ShieldCheck className="w-4 h-4 text-[#B78735]" />
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C2E33]">
            <Tag className="w-4 h-4 text-[#B78735]" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C2E33]">
            <Star className="w-4 h-4 text-[#B78735]" />
            <span>Trusted Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C2E33] col-span-2 md:col-span-1">
            <RotateCcw className="w-4 h-4 text-[#B78735]" />
            <span>Easy Rescheduling</span>
          </div>
        </div>
      </div>
    </section>
  );
}
