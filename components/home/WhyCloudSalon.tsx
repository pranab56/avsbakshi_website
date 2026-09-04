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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Info & Reasons List */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
              WHY CLOUD SALON
            </span>
            <h2 className="font-title text-4xl sm:text-5xl font-normal text-[#1A1A1A] leading-[1.15] mb-4">
              Beauty discovery, built different.
            </h2>
            <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-md">
              We built Cloud Salon because finding and booking great beauty services should be as easy as ordering a coffee.
            </p>
          </div>

          {/* Reasons List */}
          <div className="space-y-6">
            {reasons.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm bg-[#E4DACB] text-[#B78735] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <CheckCheck className="w-5 h-5 text-[#B78735]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#1A1A1A] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 h-[460px] sm:h-[640px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80')`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
