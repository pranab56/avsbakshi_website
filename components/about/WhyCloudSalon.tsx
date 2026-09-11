export default function WhyCloudSalon() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block">
            WHY CLOUD SALON
          </span>

          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-foreground">
            Started behind the chair. <br />
            Built for everyone behind the chair.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
            <p className="text-foreground/90 font-medium">
              In 2020, during the first lockdown, Amara Osei had 800 regular clients and no reliable way to contact them. No CRM, no booking system, no automated reminders. Just a phone with thousands of unread messages.
            </p>
            <p>
              She spent 14 hours rebuilding her client list from Instagram DMs and WhatsApp threads. Then she called James Whitfield, a friend from university who had spent a decade building marketplace software at scale.
            </p>
            <p>
              They built the first version of Cloud Salon in eight weeks, launching it to 40 of Amara&apos;s colleagues in Manhattan, New York. Within six months, 2,000 professionals were on the waiting list.
            </p>
            <p>
              Four years later, Cloud Salon is home to more than 47,000 independent beauty professionals across 15 US major metropolitan areas — and we&apos;re just getting started.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 pl-0 lg:pl-6">
          <div className="relative">
            {/* Main Salon Image Container */}
            <div className="relative rounded-[32px] overflow-hidden shadow-xl h-[440px] sm:h-[540px] w-full border border-border">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')` }}
              />
            </div>

            {/* Overlapping Bottom-Left Image Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-background z-10 hidden sm:block">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80')` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

