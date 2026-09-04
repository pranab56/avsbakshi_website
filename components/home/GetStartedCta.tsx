import Link from "next/link";

export default function GetStartedCta() {
  return (
    <section className="bg-[#E6DFD5] py-20 sm:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-4">
          GET STARTED
        </span>

        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.15] mb-4">
          Ready for Your Next <br />
          <span className="font-light italic text-[#B78735]">Appointment?</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-md mx-auto mb-8">
          Join thousands of customers discovering and booking beauty services they love.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <Link
            href="/search"
            className="px-7 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all hover:scale-[1.02]"
          >
            Find a Service
          </Link>
          <Link
            href="/discover?tab=professionals"
            className="px-7 py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-lg transition-all"
          >
            Explore Professionals
          </Link>
        </div>
      </div>
    </section>
  );
}
