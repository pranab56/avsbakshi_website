import { CheckCheck } from "lucide-react";

export default function WhyCloudSalon() {
  const reasons = [
    {
      title: "Verified Professionals",
      desc: "Every professional goes through our verification process so you know exactly who you are booking.",
    },
    {
      title: "Transparent Pricing",
      desc: "See full service pricing before you book. No surprises, no hidden fees.",
    },
    {
      title: "Real Availability",
      desc: "Live availability means you only see slots that are actually open to book right now.",
    },
    {
      title: "Trusted Reviews",
      desc: "Real reviews from verified customers help you make confident, informed decisions.",
    },
    {
      title: "Easy Booking",
      desc: "Manage everything from one place — discover, book, pay, and reschedule with ease.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Info & Reasons List */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-2 sm:mb-3">
              WHY CLOUD SALON
            </span>
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.15] mb-3 sm:mb-4">
              Beauty discovery, built different.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-md">
              We built Cloud Salon because finding and booking great beauty services should be as easy as ordering a coffee.
            </p>
          </div>

          {/* Reasons List */}
          <div className="space-y-6">
            {reasons.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0 mt-0.5 border border-border/50 shadow-xs">
                  <CheckCheck className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Video */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 h-[350px] sm:h-[800px] w-full bg-muted">
            <video
              src="/video/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
