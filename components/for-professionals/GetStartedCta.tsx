import Button from "../shared/Button";

export default function GetStartedCta() {
  return (
    <section className="bg-accent/70 py-20 sm:py-28 text-center border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-4">
          GET STARTED
        </span>
        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.15] mb-4">
          Ready to grow <br />
          <span className="font-light italic text-primary">your business?</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-md mx-auto mb-8">
          Join Cloud Salon today and start connecting with customers who are looking for exactly what you offer.
        </p>
        <div>
          <Button href="/register?role=professional" variant="primary" size="md">
            Start Your Professional Profile
          </Button>
        </div>
      </div>
    </section>
  );
}

