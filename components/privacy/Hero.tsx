export default function Hero() {
  return (
    <section className="bg-[#121214] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-border/30">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#D99722]/30 to-transparent" />

      <div className="max-w-5xl mx-auto space-y-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-[#D99722]" />
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
            PRIVACY &amp; DATA PROTECTION
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Privacy{" "}
          <span className="text-[#D99722]">
            Policy
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-xl">
          Learn how Cloud Salon securely collects, protects, and manages your personal information and privacy rights.
        </p>
      </div>
    </section>
  );
}
