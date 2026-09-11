export default function Hero() {
  return (
    <section className="bg-[#181614] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#B78735]/30 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
            LEGAL TERMS
          </span>
        </div>

        <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Terms &amp;
          <span className="font-serif italic text-[#C48B36] font-normal">
            Conditions
          </span>
        </h1>

        <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
          <p>Last updated: September 5, 2026</p>
          <p>
            Cloud Salon connects independent beauty professionals with customers. These terms govern your use of our platform and services.
          </p>
        </div>
      </div>
    </section>
  );
}
