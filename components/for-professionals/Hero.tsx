import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#1E1C1A] text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Bottom-right warm amber color gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/40 via-[#5A3819]/15 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#B78735]" />
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
              FOR PROFESSIONALS
            </span>
          </div>

          <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
            Your Skills. <br />
            Your Clients. <br />
            <span className="font-light italic text-[#CAA054]">Your Business.</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
            Join thousands of independent beauty professionals who manage their entire business through Cloud Salon.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/register?role=professional"
              className="w-full sm:w-auto text-center px-6 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-colors"
            >
              Start Your Professional Profile
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto text-center px-6 py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-sm transition-colors"
            >
              See How It Works
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10">
            <div>
              <h4 className="font-title text-xl sm:text-3xl font-bold text-white mb-0.5">12,000+</h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-normal">Active Professionals</p>
            </div>
            <div>
              <h4 className="font-title text-xl sm:text-3xl font-bold text-white mb-0.5">4.8★</h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-normal">Average Rating</p>
            </div>
            <div>
              <h4 className="font-title text-xl sm:text-3xl font-bold text-white mb-0.5">$1,250</h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-normal">Avg Monthly Earnings</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 h-[280px] sm:h-[580px] lg:h-[620px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80')` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
