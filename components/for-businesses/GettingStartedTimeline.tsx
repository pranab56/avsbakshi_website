export default function GettingStartedTimeline() {
  const steps = [
    { num: "01", title: "Register", desc: "Create your business account and submit your salon information." },
    { num: "02", title: "Onboard", desc: "Add your team, services, opening hours, and photos." },
    { num: "03", title: "Verify", desc: "We review your business details within 3-5 business days." },
    { num: "04", title: "Launch", desc: "Your business profile goes live and bookings start coming in." },
  ];

  return (
    <section className="bg-accent/60 py-20 sm:py-28 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-14 sm:mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3">
            GETTING STARTED
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-foreground">
            Up and running in days.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="font-title font-light italic text-4xl sm:text-5xl lg:text-6xl text-primary mb-4 block">
                {step.num}
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-medium text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

