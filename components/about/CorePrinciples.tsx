import { Sparkles, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export default function CorePrinciples() {
  const principles = [
    {
      num: "01",
      icon: Sparkles,
      title: "Craft first, scale second.",
      desc: "Beauty is an art form of precision, empathy, and personal trust. Every professional on Cloud Salon is vetted for quality of service, verified client satisfaction, and true dedication to their craft.",
    },
    {
      num: "02",
      icon: Compass,
      title: "Independence, not dependence.",
      desc: "We build intuitive tools that make beauty specialists powerful and autonomous — never trapped. Your clients, your pricing, your schedules remain 100% yours.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Trust through transparency.",
      desc: "Authentic verified reviews, clear up-front pricing, and real-time chair rental availability. Clients know exactly what they are booking, and specialists keep what they earn.",
    },
    {
      num: "04",
      icon: HeartHandshake,
      title: "Community over competition.",
      desc: "The beauty and barber industry flourishes when professionals uplift one another. We bridge stylists, barbers, and salon owners through continuous innovation and shared growth.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mb-12 sm:mb-16">
        <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-3">
          WHAT WE STAND FOR
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          The core principles that shape <br className="hidden sm:inline" />
          <span className="text-[#D99722]">every decision</span> we make.
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-xl">
          When we design a new booking workflow, chair rental service, or platform policy, we hold ourselves accountable to these four core foundations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/80 shadow-xs hover:shadow-xl hover:border-[#D99722]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider text-[#D99722] bg-[#D99722]/10 border border-[#D99722]/20 px-3 py-1 rounded-full">
                    PRINCIPLE {p.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-accent text-[#D99722] flex items-center justify-center group-hover:bg-[#D99722] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-[#D99722] transition-colors">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
