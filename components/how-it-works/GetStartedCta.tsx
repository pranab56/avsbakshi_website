import Link from "next/link";

export default function GetStartedCta() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-accent/70 text-center border-t border-border">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
          Ready to get{" "}
          <span className="text-primary font-title italic">started?</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Find your next appointment in under 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/search"
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm rounded-lg shadow transition-all cursor-pointer text-center"
          >
            Find a Professional
          </Link>
          <Link
            href="/discover"
            className="w-full sm:w-auto px-6 py-3 bg-card hover:bg-accent text-foreground font-medium text-sm rounded-lg transition-all cursor-pointer text-center border border-border"
          >
            Browse Salons
          </Link>
        </div>
      </div>
    </section>
  );
}

