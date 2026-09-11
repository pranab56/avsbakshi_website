export default function JourneyTimeline() {
  const steps = [
    { num: "01", title: "Create Your Profile", desc: "Sign up and complete your professional profile with your services, availability, and portfolio.", bg: "bg-primary" },
    { num: "02", title: "Get Verified", desc: "Submit your credentials and ID. Our team reviews applications within 2-3 business days.", bg: "bg-foreground text-background" },
    { num: "03", title: "Go Live", desc: "Once approved, your profile is live and visible to customers searching for professionals like you.", bg: "bg-foreground text-background" },
    { num: "04", title: "Start Earning", desc: "Accept bookings, deliver great services, collect reviews, and grow your client base.", bg: "bg-primary" },
  ];

  return (
    <section className="bg-accent/60 py-20 sm:py-28 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-14 sm:mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3">
            THE JOURNEY
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-foreground">
            From sign-up to your first booking.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className={`w-12 h-12 rounded-full ${step.bg} font-title font-light italic text-lg sm:text-xl flex items-center justify-center mx-auto mb-5 shadow-sm`}>
                {step.num}
              </span>
              <h3 className="font-title text-lg sm:text-xl font-medium text-foreground mb-3">
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

