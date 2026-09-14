import { Search, CalendarCheck, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Search by service, location, and availability. Browse verified professionals and top salons near you.",
      icon: Search,
      badge: "Step 1",
    },
    {
      num: "02",
      title: "Book Seamlessly",
      desc: "Choose your preferred specialist, pick a convenient date & time slot, and confirm instantly.",
      icon: CalendarCheck,
      badge: "Step 2",
      active: true,
    },
    {
      num: "03",
      title: "Enjoy & Review",
      desc: "Get your luxury beauty treatment, rate your experience, and earn reward points on every booking.",
      icon: Sparkles,
      badge: "Step 3",
    },
  ];

  return (
    <section className="bg-accent/40 border-y border-border/70 py-12 sm:py-20 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-12 max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B78735]/10 border border-[#B78735]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#B78735]" />
            <span className="text-[11px] font-bold text-[#B78735] uppercase tracking-[0.2em]">
              THE PROCESS
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            How Cloud Salon Works
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Booking your next luxury beauty experience is as simple as 1-2-3.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 shadow-lg border ${
                  step.active
                    ? "bg-gradient-to-b from-[#B78735] to-[#8C621E] text-white border-[#D4AF37] shadow-2xl shadow-[#B78735]/25"
                    : "bg-card border-border/70 text-foreground hover:border-[#B78735]/40"
                }`}
              >
                {/* Top Badge & Number */}
                <div className="w-full flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      step.active
                        ? "bg-white/20 text-white"
                        : "bg-[#B78735]/10 text-[#B78735]"
                    }`}
                  >
                    {step.badge}
                  </span>
                  <span
                    className={`font-title font-bold italic text-3xl sm:text-4xl ${
                      step.active ? "text-white/60" : "text-[#B78735]/40"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Step Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shrink-0 shadow-md ${
                    step.active
                      ? "bg-white text-[#B78735]"
                      : "bg-[#B78735]/15 text-[#B78735]"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-title text-xl sm:text-2xl font-bold leading-tight">
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-normal leading-relaxed max-w-[260px] mx-auto ${
                      step.active ? "text-white/90" : "text-muted-foreground"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
