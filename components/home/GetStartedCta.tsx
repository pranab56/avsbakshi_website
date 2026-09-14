import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function GetStartedCta() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="relative rounded-[32px] sm:rounded-[44px] bg-gradient-to-br from-[#1E1C1A] via-[#151413] to-[#2B2319] text-white p-8 sm:p-16 lg:p-20 overflow-hidden shadow-2xl border border-[#D99722]/40 text-center">
        
        {/* Glow Background Elements */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#D99722]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          
          {/* Top Sub-tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-[0.25em]">
              GET STARTED TODAY
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-md">
            Ready for Your Next <br />
            <span className="bg-gradient-to-r from-[#CAA054] via-[#D4AF37] to-[#E5C158] bg-clip-text text-transparent font-serif italic">
              Beauty Experience?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed max-w-lg mx-auto">
            Join thousands of happy customers discovering top-rated beauty professionals and salons across the city.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <Link
              href="/search"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#D99722]/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Find a Service</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/discover?tab=professionals"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm"
            >
              Explore Professionals
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-zinc-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span>Free Rescheduling</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
