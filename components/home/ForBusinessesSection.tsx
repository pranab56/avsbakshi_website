import Link from "next/link";
import {
  Users,
  LayoutGrid,
  CalendarCheck,
  Calendar,
  Store,
  Wallet,
  TrendingUp,
  Star,
} from "lucide-react";

export default function ForBusinessesSection() {
  const features = [
    {
      icon: Users,
      title: "Team management",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: LayoutGrid,
      title: "Service management",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: CalendarCheck,
      title: "Online bookings",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: Calendar,
      title: "Calendar management",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: Store,
      title: "Business profile",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: Wallet,
      title: "Payouts",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: TrendingUp,
      title: "Earnings",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      icon: Star,
      title: "Reviews",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Salon Team Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 h-[320px] sm:h-[580px] lg:h-[640px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')`,
              }}
            />
          </div>
        </div>

        {/* Right Column: Info, 2-Col Grid & Action Buttons */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
              FOR BUSINESSES
            </span>
            <h2 className="font-title text-3xl sm:text-5xl font-normal text-[#1A1A1A] leading-[1.15] mb-4">
              Run your salon from one powerful platform.
            </h2>
            <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-md">
              Manage your team, services, schedules, bookings, customers, and revenue from one centralized workspace.
            </p>
          </div>

          {/* 2-Column Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#E4DACB] text-[#B78735] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <IconComp className="w-5 h-5 text-[#B78735]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1A1A1A] mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#666159] font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/for-businesses"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Join as a Business
            </Link>
            <Link
              href="/for-businesses"
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              Explore Business Tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
