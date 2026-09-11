import Button from "../shared/Button";

export default function GetStartedCta() {
  return (
    <section className="bg-accent/70 py-14 sm:py-28 lg:py-32 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3 sm:mb-4">
          GET STARTED
        </span>

        <h2 className="font-title text-2xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.15] mb-3 sm:mb-4">
          Ready for Your Next <br />
          <span className="font-light italic text-primary">Appointment?</span>
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
          Join thousands of customers discovering and booking beauty services they love.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xs sm:max-w-none mx-auto">
          <Button href="/search" variant="primary" size="md" className="w-full sm:w-auto">
            Find a Service
          </Button>
          <Button href="/discover?tab=professionals" variant="secondary" size="md" className="w-full sm:w-auto">
            Explore Professionals
          </Button>
        </div>
      </div>
    </section>
  );
}

