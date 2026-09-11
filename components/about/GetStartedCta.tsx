import Link from "next/link";

export default function GetStartedCta() {
  return (
    <section className="bg-accent/70 py-20 sm:py-28 text-center border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-4">
          GET STARTED
        </span>
        <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.15] mb-4">
          Ready for Your Next <br />
          <span className="font-light italic text-primary">Appointment?</span>
        </h2>
        <div className="flex justify-center gap-3 pt-4">
          <Link
            href="/search"
            className="px-7 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-all hover:scale-[1.02] inline-block"
          >
            Find a Service
          </Link>
          <Link
            href="/discover?tab=professionals"
            className="px-7 py-3.5 bg-card hover:bg-accent text-foreground text-xs sm:text-sm font-semibold rounded-sm transition-all inline-block border border-border"
          >
            Explore Professionals
          </Link>
        </div>
      </div>
    </section>
  );
}

