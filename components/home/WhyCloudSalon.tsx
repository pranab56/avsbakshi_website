import { CheckCheck, Sparkles, ShieldCheck } from "lucide-react";

export default function WhyCloudSalon() {
  const reasons = [
    {
      title: "Verified Professionals",
      desc: "Every professional goes through our rigorous 5-step verification process.",
    },
    {
      title: "Transparent Pricing",
      desc: "See full service pricing upfront before you book. No surprises, no hidden fees.",
    },
    {
      title: "Real-Time Availability",
      desc: "Live calendar sync means you only see slots that are actually open to book right now.",
    },
    {
      title: "Trusted Customer Reviews",
      desc: "Real reviews & ratings from verified clients help you make confident decisions.",
    },
    {
      title: "Seamless One-Click Booking",
      desc: "Manage everything from one place — discover, book, pay, and reschedule with ease.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* Left Column: Info & Glassmorphic Reasons List */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99722]/10 border border-[#D99722]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D99722]" />
              <span className="text-[11px] font-bold text-[#D99722] uppercase tracking-[0.2em]">
                WHY CLOUD SALON
              </span>
            </div>
            <h2 className="  text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground leading-[1.12] mb-3">
              Beauty discovery, <br />
              <span className="text-[#D99722]">built different.</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              We built Cloud Salon because finding and booking great beauty services should be as simple as ordering a coffee.
            </p>
          </div>

          {/* Reasons List */}
          <div className="space-y-3.5">
            {reasons.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl bg-card border border-border/60 shadow-xs hover:border-[#D99722]/40 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D99722] group-hover:text-white transition-colors">
                  <CheckCheck className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Video Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl shadow-black/15 h-[350px] sm:h-[680px] w-full bg-muted border border-border/60 group">
            <video
              src="/video/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Gradient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Verified Guarantee Badge */}
            <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-border shadow-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-tight">100% Verified Quality</p>
                <p className="text-[10px] text-muted-foreground font-medium">Satisfaction Guaranteed</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
