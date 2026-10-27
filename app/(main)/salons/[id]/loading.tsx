export default function SalonDetailsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 select-none animate-in fade-in duration-200">
      {/* Top Navigation Bar Skeleton */}
      <div className="bg-card border-b border-border sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="h-4 w-32 bg-muted rounded-md animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-muted animate-pulse" />
            <div className="w-8 h-8 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Business Profile Header Skeleton */}
      <section className="bg-card border-b border-border py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 w-full md:w-auto">
                {/* Logo Box Skeleton */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-muted animate-pulse shrink-0 border-2 border-border/60" />

                <div className="space-y-3 w-full sm:w-80">
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
                    <div className="h-5 w-28 bg-muted rounded-full animate-pulse" />
                  </div>

                  {/* Salon Title */}
                  <div className="h-8 w-3/4 bg-muted rounded-lg animate-pulse" />

                  {/* Rating & Address */}
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
                    <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                    <div className="h-4 w-40 bg-muted rounded-md animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA Skeleton */}
              <div className="w-full md:w-44 h-12 rounded-xl bg-muted animate-pulse shrink-0" />
            </div>

            {/* Quick Info Grid Skeleton (3 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-border/60">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/40">
                  <div className="w-9 h-9 rounded-xl bg-muted animate-pulse shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-20 bg-muted rounded-md animate-pulse" />
                    <div className="h-3 w-32 bg-muted rounded-md animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Navigation Tabs Skeleton */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs Skeleton */}
        <div className="flex border-b border-border gap-6 pb-2">
          <div className="h-7 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-7 w-36 bg-muted rounded-md animate-pulse" />
          <div className="h-7 w-24 bg-muted rounded-md animate-pulse" />
          <div className="h-7 w-24 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Team Members Grid Skeleton (6 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl overflow-hidden border border-border p-5 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse shrink-0 border border-border" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse" />
                  <div className="h-3 w-1/2 bg-muted rounded-md animate-pulse" />
                  <div className="h-3 w-20 bg-muted rounded-md animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
                <div className="h-9 rounded-xl bg-muted animate-pulse" />
                <div className="h-9 rounded-xl bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
