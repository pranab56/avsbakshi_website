export default function UnreviewedCallout() {
  return (
    <div className="bg-accent/70 border border-border rounded-lg p-5 sm:p-6 space-y-3 shadow-xs">
      <h3 className="font-title font-bold text-lg text-foreground leading-tight">
        You have 2 unreviewed visits
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Share your experience and help others discover great professionals.
      </p>
      <div className="pt-1">
        <button
          type="button"
          className="w-full sm:w-auto px-5 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}

