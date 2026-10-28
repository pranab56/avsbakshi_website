import Link from "next/link";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";

export default function GetStartedCta() {
  return (
    <section className="relative overflow-hidden bg-[#121214] text-white py-20 sm:py-28 border-t border-white/10">
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D99722]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D99722]" />
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
            START YOUR JOURNEY TODAY
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Ready for your next <br />
          <span className="text-[#D99722]">exceptional appointment?</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-xl mx-auto leading-relaxed">
          Whether you are looking to book a top-tier beauty specialist or want to elevate your own independent salon career, The Cloud Salon is built for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/professionals"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D99722] hover:bg-[#C2841B] active:scale-95 text-white text-sm font-bold rounded-xl shadow-lg shadow-[#D99722]/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Professionals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-[#D99722]" />
            <span>Join as a Specialist</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
