import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    { title: "Hair", count: "1,842 services", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80" },
    { title: "Brows & Lashes", count: "612 services", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
    { title: "Nails", count: "934 services", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80" },
    { title: "Skincare", count: "541 services", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
    { title: "Massage", count: "213 services", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
    { title: "Makeup", count: "672 services", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" },
    { title: "Waxing", count: "318 services", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80" },
    { title: "Barber", count: "789 services", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80" },
  ];

  // Duplicate for continuous seamless marquee loop
  const marqueeItems = [...categories, ...categories];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="font-title text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            Explore Services
          </h2>
        </div>
        <Link
          href="/discover?tab=services"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D99722] hover:text-[#A0732A] transition-colors group shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Continuous Marquee Ribbon inside Container */}
      <div className="relative w-full overflow-hidden rounded-2xl py-2">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF8F5] dark:from-[#0E0D0C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF8F5] dark:from-[#0E0D0C] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-3 sm:gap-4">
          {marqueeItems.map((cat, idx) => (
            <Link
              key={idx}
              href={`/search?category=${encodeURIComponent(cat.title)}`}
              className="group relative w-36 min-[380px]:w-40 sm:w-48 h-44 min-[380px]:h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shrink-0 active:scale-[0.98]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.img}')` }}
              />

              {/* Bottom Shaded Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h3 className="font-title text-sm sm:text-base font-bold text-white group-hover:text-[#F5E6C8] transition-colors leading-tight">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-white/75 font-medium mt-0.5">
                  {cat.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
