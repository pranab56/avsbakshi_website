import { Users, Scissors, Calendar, DollarSign, UserCheck, Building2 } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: Users,
      title: "Team Management",
      desc: "Add your professionals, set their services and availability, and manage your entire team from one place.",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500 dark:text-blue-400",
    },
    {
      icon: Scissors,
      title: "Shared Services",
      desc: "Create a shared service menu that your team members can offer, with individual pricing and durations.",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Calendar,
      title: "Shared Calendar",
      desc: "See all bookings across your entire team in one unified calendar view. Never double-book again.",
      bgColor: "bg-rose-500/10",
      textColor: "text-rose-500 dark:text-rose-400",
    },
    {
      icon: DollarSign,
      title: "Revenue Tracking",
      desc: "Monitor earnings per service, per professional, and across your whole business in real time.",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      icon: UserCheck,
      title: "Customer Management",
      desc: "Build a detailed client database with history, preferences, and spending insights.",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500 dark:text-purple-400",
    },
    {
      icon: Building2,
      title: "Business Profile",
      desc: "A premium business profile page that showcases your team, services, gallery, and reviews.",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3">
          PLATFORM FEATURES
        </span>
        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight mb-3">
          Everything your salon needs.
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
          From team management to revenue tracking — all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-card rounded-lg p-8 border border-border flex flex-col items-start text-left shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-9 h-9 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center mb-5 shrink-0`}>
                <Icon className={`w-5 h-5 ${item.textColor}`} />
              </div>
              <h3 className="font-title text-lg font-bold text-foreground mb-2.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

