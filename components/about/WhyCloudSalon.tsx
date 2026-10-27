import Image from "next/image";
import { CheckCircle2, Sparkles, Building, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyCloudSalon() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Story Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99722]/10 border border-[#D99722]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D99722]" />
            <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              THE CLOUD SALON MISSION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-foreground tracking-tight">
            Started behind the chair. <br />
            <span className="text-[#D99722]">Built for everyone</span> behind the chair.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
            <p className="text-foreground font-medium text-base">
              In 2020, during the first lockdown, Amara Osei had 800 regular clients and no reliable way to contact them. No centralized CRM, no automatic reminders — just a phone flooded with thousands of unread messages.
            </p>
            <p>
              She spent 14 hours rebuilding her client list from Instagram DMs and WhatsApp threads. That was the turning point: beauty professionals deserved dedicated, world-class business technology that honors their creative autonomy.
            </p>
            <p>
              We built the first version of Cloud Salon to give stylists, barbers, and salon owners total control over their calendar, payments, and client relationships.
            </p>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-foreground">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/70">
              <CheckCircle2 className="w-4 h-4 text-[#D99722] shrink-0" />
              <span>Independent client ownership</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/70">
              <CheckCircle2 className="w-4 h-4 text-[#D99722] shrink-0" />
              <span>Transparent instant payouts</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/70">
              <CheckCircle2 className="w-4 h-4 text-[#D99722] shrink-0" />
              <span>Verified chair rentals &amp; salons</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/70">
              <CheckCircle2 className="w-4 h-4 text-[#D99722] shrink-0" />
              <span>Dedicated 24/7 partner support</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/for-professionals"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D99722] hover:underline group"
            >
              <span>Explore partner benefits for stylists</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-6 pl-0 lg:pl-6">
          <div className="relative">
            {/* Main Salon Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[440px] sm:h-[520px] w-full border border-border/80 group">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Salon Interior Workspace"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Bottom Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl max-w-xs space-y-2 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Premier Salons</h4>
                  <p className="text-xs text-muted-foreground">Across top major cities</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground border-t border-border/50 pt-2">
                Connecting top stylists with flexible luxury salon workspace rentals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
