import Image from "next/image";

export default function TrustBadges() {
  const features = [
    {
      icon: "/icons/hero/calendar.png",
      title: "Book Anytime",
      desc: "Easy. Fast. On your schedule.",
    },
    {
      icon: "/icons/hero/user-1.png",
      title: "Expert Specialists",
      desc: "Verified pros. Top rated.",
    },
    {
      icon: "/icons/hero/clock.png",
      title: "Flexible Scheduling",
      desc: "Choose what works best for you.",
    },
    {
      icon: "/icons/hero/location-1.png",
      title: "Services Wherever You Are",
      desc: "At home, on-site or in-salon.",
    },
    {
      icon: "/icons/hero/computer.png",
      title: "Work From Anywhere",
      desc: "Run your beauty business in the cloud.",
    },
  ];

  return (
    <section className="border-y border-border/80 bg-accent/40 py-8 sm:py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {features.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-card border border-border/60 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center space-y-2.5 transition-all duration-300 hover:shadow-md hover:border-primary/40 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D99722]/10 flex items-center justify-center shrink-0 border border-[#D99722]/20 group-hover:bg-[#D99722]/20 transition-colors relative">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-normal leading-snug">
                    {item.desc}
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
