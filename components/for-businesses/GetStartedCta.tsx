import Button from "../shared/Button";

export default function GetStartedCta() {
  return (
    <section className="bg-accent/70 py-20 sm:py-28 text-center border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-4">
          GET STARTED
        </span>
        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.15] mb-4">
          Ready to run your <br />
          <span className="font-light italic text-primary">salon smarter?</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-md mx-auto mb-8">
          Join thousands of salons and beauty businesses that use Cloud Salon to manage their entire operation.
        </p>
        <div>
          <Button href="/register?role=business" variant="primary" size="md">
            Start Your Business
          </Button>
        </div>
      </div>
    </section>
  );
}
