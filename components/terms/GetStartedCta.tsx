import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GetStartedCta() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-accent/70 text-center border-t border-border">
      <div className="max-w-2xl mx-auto space-y-6">
        <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block">
          GET STARTED
        </span>
        <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
          Ready to get{" "}
          <span className="text-primary font-title italic">started?</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Find your next appointment in under 2 minutes.
        </p>

        <div className="pt-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm rounded-lg shadow transition-all cursor-pointer"
          >
            Find a Professional
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

