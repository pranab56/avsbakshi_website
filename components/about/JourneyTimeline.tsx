import { Calendar, Flag, Sparkles, TrendingUp, Award } from "lucide-react";

export default function JourneyTimeline() {
  const timeline = [
    {
      year: "2020",
      icon: Flag,
      title: "Founded behind the chair",
      desc: "Conceived during lockdown to help independent stylists preserve client relationships without middleman markups.",
    },
    {
      year: "2021",
      icon: Sparkles,
      title: "First 1,000 verified specialists",
      desc: "Expanded across Manhattan and Brooklyn, empowering barbers, colorists, and nail artists with real-time bookings.",
    },
    {
      year: "2022",
      icon: TrendingUp,
      title: "Salon Owner & Chair Rental platform",
      desc: "Launched our marketplace workspace suite, connecting salon owners who have vacant chairs with mobile freelancers.",
    },
    {
      year: "2023",
      icon: Calendar,
      title: "Nationwide expansion",
      desc: "Scaled to 15 major metropolitan areas with over 300,000 satisfied client appointments completed.",
    },
    {
      year: "2024",
      icon: Award,
      title: "$35M+ paid directly to specialists",
      desc: "Celebrating our largest milestone of continuous community growth and zero-hassle instant payouts.",
      highlight: true,
    },
  ];

  return (
    <section className="bg-card text-foreground py-20 sm:py-28 border-y border-border relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#D99722]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-16">
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-3">
            OUR JOURNEY &amp; MILESTONES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Four years of building <br className="hidden sm:inline" />
            <span className="text-[#D99722]">in public</span> with our community.
          </h2>
        </div>

        {/* Timeline Track with 100% Centered Alignment */}
        <div className="relative space-y-6 sm:space-y-8">
          {/* Vertical Timeline Guide Line - Dead centered through every node */}
          <div className="absolute left-5 sm:left-6 top-5 sm:top-6 bottom-5 sm:bottom-6 w-[2px] bg-[#D99722]/30 -translate-x-1/2" />

          {timeline.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Node Dot Container - Exact width/height ensures line bisects the center */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 relative z-10 mt-1 sm:mt-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.highlight
                      ? "bg-[#D99722] border-white shadow-lg shadow-[#D99722]/50 scale-110"
                      : "bg-card border-[#D99722] group-hover:bg-[#D99722] group-hover:scale-105"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.highlight ? "bg-white" : "bg-[#D99722] group-hover:bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* Milestone Content Card */}
              <div
                className={`flex-1 p-5 sm:p-6 rounded-2xl border transition-all ${
                  item.highlight
                    ? "bg-[#D99722]/10 border-[#D99722]/40 shadow-sm"
                    : "bg-background/80 hover:bg-background border-border/80 hover:border-[#D99722]/40 shadow-xs"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      item.highlight
                        ? "bg-[#D99722] text-white"
                        : "bg-accent text-foreground border border-border"
                    }`}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
