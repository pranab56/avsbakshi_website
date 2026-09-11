export default function JourneyTimeline() {
  const timeline = [
    { year: "2020", title: "Founded in a kitchen in Peckham" },
    { year: "2021", title: "First 100 professionals join" },
    { year: "2022", title: "Series A — £4.2M raised" },
    { year: "2023", title: "Expansion to 12 UK cities" },
    { year: "2024", title: "£28M paid out to professionals", highlight: true },
  ];

  return (
    <section className="bg-card text-foreground py-20 sm:py-28 border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-3">
            OUR JOURNEY
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-light italic text-foreground leading-tight">
            Four years of building in public.
          </h2>
        </div>

        <div className="border-t border-border">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 sm:gap-16 py-6 sm:py-7 border-b border-border transition-colors"
            >
              <span
                className={`font-title font-light italic text-xl sm:text-2xl w-20 shrink-0 ${
                  item.highlight ? "text-primary font-normal" : "text-muted-foreground"
                }`}
              >
                {item.year}
              </span>
              <span
                className={`font-title text-base sm:text-lg sm:text-xl ${
                  item.highlight ? "text-foreground font-bold" : "text-muted-foreground font-normal"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

