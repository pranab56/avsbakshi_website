export default function AboutTab() {
  const specialities = [
    "Balayage", "Colour Correction", "Keratin Treatments", "Bridal Hair",
    "Short Cuts", "Curly Hair Specialist", "Extensions", "Toning"
  ];

  return (
    <div className="animate-in fade-in duration-150 space-y-8">
      <blockquote className="font-title font-light italic text-lg sm:text-xl text-foreground border-l-2 border-primary pl-6 py-1 leading-relaxed">
        &ldquo;My philosophy is simple &mdash; listen first, create second. Every client&apos;s hair has its own history, and I work with that history, not against it.&rdquo;
      </blockquote>

      <div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
        <p>
          Award-winning hair stylist with 10+ years of experience specialising in colour, cuts, and transformations for all hair types. With a dedication to her craft and a calm, attentive approach to every client, Sofia has built a loyal following across New York over more than a decade behind the chair.
        </p>
        <p>
          Specialising in bespoke balayage, precision cutting, and luxury hair care treatments in Soho. Trained at top academies in NYC and LA, bringing effortlessly chic, tailored looks to every client.
        </p>
      </div>

      {/* 4 Stat Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-card p-4 sm:p-8 rounded-lg text-center border border-border space-y-1">
          <h4 className="font-title text-xl sm:text-2xl font-normal text-foreground">10 years</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground">Experience</p>
        </div>
        <div className="bg-card p-4 sm:p-8 rounded-lg text-center border border-border space-y-1">
          <h4 className="font-title text-xl sm:text-2xl font-normal text-foreground">500+</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground">Happy clients</p>
        </div>
        <div className="bg-card p-4 sm:p-8 rounded-lg text-center border border-border space-y-1">
          <h4 className="font-title text-xl sm:text-2xl font-normal text-foreground">312</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground">Reviews</p>
        </div>
        <div className="bg-card p-4 sm:p-8 rounded-lg text-center border border-border space-y-1">
          <h4 className="font-title text-xl sm:text-2xl font-normal text-foreground">4.9★</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground">Average rating</p>
        </div>
      </div>

      {/* Specialities Tags */}
      <div className="space-y-3 pt-6 border-t border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] block">
          SPECIALITIES
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {specialities.map((tag, idx) => (
            <span
              key={idx}
              className="bg-accent text-primary dark:text-primary-light text-xs font-medium px-4 py-2 rounded-md border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

