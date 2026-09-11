export default function CorePrinciples() {
  const principles = [
    {
      num: "01",
      title: "Craft first, scale second.",
      desc: "Beauty is a practice of precision and intuition. Every professional on Cloud Salon is vetted not for volume, but for quality of work and depth of care.",
    },
    {
      num: "02",
      title: "Independence, not dependence.",
      desc: "We build tools that make professionals more powerful — never tools that make them dependent on us. Your clients, your pricing, your calendar. We're just the infrastructure.",
    },
    {
      num: "03",
      title: "Trust through transparency.",
      desc: "We show real reviews, real pricing, real availability. Clients know exactly what to expect. Professionals know exactly what they earn.",
    },
    {
      num: "04",
      title: "Community over competition.",
      desc: "The beauty industry thrives when professionals support each other. We invest in education, mentorship, and the connections that help careers grow.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block">
            WHAT WE STAND FOR
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-foreground">
            The principles that shape every decision we make.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-sm">
            When we face a hard product or business decision, we come back to these four ideas.
          </p>
        </div>

        <div className="md:col-span-7">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="border-b border-border pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex items-start gap-6 sm:gap-8">
                <span className="font-title font-light italic text-2xl sm:text-3xl text-primary w-8 shrink-0 pt-0.5">
                  {p.num}
                </span>
                <div className="space-y-2">
                  <h3 className="font-title text-lg sm:text-xl font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

