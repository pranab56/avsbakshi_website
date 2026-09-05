import Link from "next/link";

export default function DualBanners() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl shadow-black/5 grid grid-cols-1 md:grid-cols-2">
        {/* Left: Dark Professional Banner */}
        <div className="bg-[#1A1A1D] text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-6 sm:space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-2 sm:mb-3">
              FOR PROFESSIONALS
            </span>
            <h3 className="font-title text-2xl sm:text-4xl lg:text-[40px] font-normal leading-tight text-white mb-3 sm:mb-4">
              Turn Your Talent Into Your Business.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md">
              Manage your services, availability, bookings, customers, and earnings from one professional workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/for-professionals"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Join as a Professional
            </Link>
            <Link
              href="/for-professionals"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right: Gold Business Banner */}
        <div className="bg-[#B78735] text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-6 sm:space-y-8">
          <div>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-[0.2em] block mb-2 sm:mb-3">
              FOR BUSINESSES
            </span>
            <h3 className="font-title text-2xl sm:text-4xl lg:text-[40px] font-normal leading-tight text-white mb-3 sm:mb-4">
              Run Your Salon From One Place.
            </h3>
            <p className="text-xs sm:text-sm text-white/95 font-normal leading-relaxed max-w-md">
              Manage your team, services, bookings, schedules, customers, and revenue with one powerful business platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/for-businesses"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#1A1A1D] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Join as a Business
            </Link>
            <Link
              href="/for-businesses"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
