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
      value: "5000+",
      label: "Salon Locations",
    },
    {
      icon: Heart,
      value: "100,000+",
      label: "Happy Clients",
    },
    {
      icon: Star,
      value: "4.9+",
      label: "Average Rating",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#121214] transition-colors duration-200">
      {/* Metric Cards Row with subtle vertical dividers */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border/60 rounded-sm ">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-3 py-2 sm:py-2.5 justify-center lg:justify-start"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-[#D99722] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h4 className="font-title text-sm sm:text-base font-medium leading-none mb-0.5">
                    {item.value}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luxury Brand Marquee Ribbon with Left & Right Horizontal Lines */}
      <div className="w-full dark:bg-[#121214] py-2.5 overflow-hidden select-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex-1 h-[1px] bg-[#D99722]/40" />
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99722] shrink-0">
            <span>BEAUTY</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>CONNECTION</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>OPPORTUNITY</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>IN THE CLOUD</span>
          </div>
          <div className="flex-1 h-[1px] bg-[#D99722]/40" />
        </div>
      </div>
    </div>
  );
}

