import Link from "next/link";

export default function ServicesTab() {
  const serviceCategories = [
    { title: "Hair", desc: "Cuts, colour, styling, treatments", count: "1,842", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80" },
    { title: "Nails", desc: "Manicure, pedicure, nail art", count: "934", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80" },
    { title: "Makeup", desc: "Bridal, occasion, everyday looks", count: "481", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" },
    { title: "Skincare", desc: "Facials, peels, LED therapy", count: "586", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
    { title: "Barber", desc: "Cuts, beard, hot towel shave", count: "789", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80" },
    { title: "Eyebrows", desc: "Shaping, lamination, tinting", count: "418", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
    { title: "Threading", desc: "Extensions, lift, tint", count: "326", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80" },
    { title: "Massage", desc: "Swedish, deep tissue, hot stone", count: "382", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" },
  ];

  const popularTags = [
    "Balayage", "Colour Correction", "Keratin Treatments", "Bridal Hair",
    "Short Cuts", "Curly Hair Specialist", "Extensions", "Toning"
  ];

  return (
    <div className="animate-in fade-in duration-200">
      <div className="mb-12">
        <p className="text-xs sm:text-sm font-normal text-muted-foreground mb-6">
          {serviceCategories.length} service categories
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/search?category=${encodeURIComponent(cat.title)}`}
              className="relative rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group h-64 sm:h-80 border border-border flex flex-col justify-end p-5 sm:p-6"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${cat.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <h3 className="font-title text-xl sm:text-2xl font-bold text-white mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/80 font-normal leading-tight">
                    {cat.desc}
                  </p>
                </div>
                <span className="bg-background/90 text-foreground font-semibold text-xs px-3 py-1 rounded-full shrink-0 shadow-xs ml-2 border border-border/50">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Right Now */}
      <div className="pt-8 border-t border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4">
          POPULAR RIGHT NOW
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {popularTags.map((tag, idx) => (
            <Link
              key={idx}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="bg-accent hover:bg-muted text-primary text-xs font-medium px-4 py-2 rounded-xl transition-colors border border-border cursor-pointer"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
