import { Users, MapPin, Heart, Star } from "lucide-react";

export default function StatsTicker() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Verified Professionals",
    },
    {
      icon: MapPin,
      value: "5,000+",
      label: "Salon Locations",
    },
    {
      icon: Heart,
      value: "100,000+",
      label: "Happy Clients",
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Average Rating",
    },
  ];

  const slogans = [
    "BEAUTY",
    "CONNECTION",
    "OPPORTUNITY",
    "IN THE CLOUD",
  ];

  return (
    <div className="w-full pb-10">
      {/* Metric Cards Row */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-15">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-card border border-border/50 shadow-xs hover:border-[#B78735]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B78735]/15 text-[#B78735] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-title text-base sm:text-lg font-extrabold text-foreground leading-none mb-0.5">
                    {item.value}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luxury Brand Continuous Marquee Ribbon */}
      <div className="w-full bg-[#FAF8F5] dark:bg-[#151413] border-y  border-border/60 py-3 overflow-hidden select-none flex">
        <div className="animate-marquee flex items-center text-xs font-bold uppercase tracking-[0.3em] text-[#B78735] whitespace-nowrap">
          {Array(8)
            .fill(slogans)
            .flat()
            .map((word, index) => (
              <div key={index} className="flex items-center gap-8 sm:gap-14 px-4">
                <span>{word}</span>
                <span className="text-[#B78735]/40 font-light">•</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
