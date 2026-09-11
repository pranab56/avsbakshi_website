export default function ReviewsTab() {
  const reviews = [
    { name: "Rachel Thompson", date: "12 Jul 2025", service: "Full Colour & Style", text: "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment." },
    { name: "Elena Rostova", date: "02 Jul 2025", service: "Haircut & Style", text: "Best haircut I've had in New York in 5 years. Sofia's attention to detail is unmatched and her advice on hair health was super helpful." },
    { name: "Jessica Miller", date: "24 Jun 2025", service: "Balayage", text: "Sofia is a true artist! The color blend is so natural and seamless. Highly recommended to anyone looking for expert color." },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="p-6 sm:p-8 rounded-xl bg-card border border-border space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-border pb-6">
          <div className="text-center sm:text-left">
            <h2 className="font-title text-5xl font-bold text-foreground">4.9</h2>
            <div className="flex items-center justify-center sm:justify-start gap-1 my-1 text-primary">
              ★★★★★
            </div>
            <p className="text-xs text-muted-foreground">312 reviews</p>
          </div>

          <div className="flex-1 w-full space-y-1.5 text-xs text-muted-foreground">
            {[
              { star: "5 ★", pct: "76%" },
              { star: "4 ★", pct: "15%" },
              { star: "3 ★", pct: "5%" },
              { star: "2 ★", pct: "1%" },
              { star: "1 ★", pct: "1%" },
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 text-right text-muted-foreground font-medium">{bar.star}</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: bar.pct }} />
                </div>
                <span className="w-8 text-muted-foreground text-right">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-accent/50 p-5 rounded-sm border border-border/50">
            <h4 className="font-title text-lg font-bold text-foreground">4.9</h4>
            <p className="text-[10px] text-muted-foreground">Communication</p>
          </div>
          <div className="bg-accent/50 p-5 rounded-sm border border-border/50">
            <h4 className="font-title text-lg font-bold text-foreground">5.0</h4>
            <p className="text-[10px] text-muted-foreground">Skill</p>
          </div>
          <div className="bg-accent/50 p-5 rounded-sm border border-border/50">
            <h4 className="font-title text-lg font-bold text-foreground">4.7</h4>
            <p className="text-[10px] text-muted-foreground">Value</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev, idx) => (
          <div key={idx} className="p-5 rounded-lg bg-card border border-border shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">{rev.name}</span>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                  Verified
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">{rev.date}</span>
            </div>

            <div className="flex items-center gap-1 text-primary text-xs">
              ★★★★★
              <span className="text-xs text-primary font-medium ml-2">{rev.service}</span>
            </div>

            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              {rev.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

