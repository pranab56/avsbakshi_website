import { User, Calendar, Scissors, Clock, DollarSign, Star } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: User,
      title: "Get Discovered",
      desc: "Build a verified public profile and be found by thousands of customers searching for beauty services every day.",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500 dark:text-blue-400",
    },
    {
      icon: Calendar,
      title: "Manage Bookings",
      desc: "Accept, reschedule, and manage appointments from a single professional dashboard. No phone tag, no back-and-forth.",
      bgColor: "bg-rose-500/10",
      textColor: "text-rose-500 dark:text-rose-400",
    },
    {
      icon: Scissors,
      title: "Manage Services",
      desc: "List your services with pricing, duration, and descriptions. Update them anytime to reflect your current offering.",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Clock,
      title: "Control Availability",
      desc: "Set your own hours and days. Block off time, set recurring availability, and take breaks whenever you need.",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500 dark:text-purple-400",
    },
    {
      icon: DollarSign,
      title: "Track Earnings",
      desc: "See every payment, payout, and transaction in one place. Get paid directly to your account after each service.",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      icon: Star,
      title: "Receive Reviews",
      desc: "Build your reputation with verified reviews from real customers. Your rating is your most powerful marketing tool.",
      bgColor: "bg-amber-500/15",
      textColor: "text-amber-500",
      fill: true,
    },
  ];

  return (
    <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3">
          EVERYTHING YOU NEED
        </span>
        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight mb-3">
          Built for independent professionals.
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-md mx-auto">
          One platform to manage your entire beauty business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-card rounded-lg p-8 border border-border flex flex-col items-start text-left shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-9 h-9 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center mb-5 shrink-0`}>
                <Icon className={`w-5 h-5 ${item.fill ? "fill-amber-500" : ""} ${item.textColor}`} />
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

