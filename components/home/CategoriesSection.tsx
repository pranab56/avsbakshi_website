import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    { title: "Hair", count: "1,842 services", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80" },
    { title: "Nails", count: "934 services", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80" },
    { title: "Makeup", count: "672 services", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
    { title: "Skincare", count: "541 services", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80" },
    { title: "Barber", count: "789 services", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
    { title: "Eyebrows", count: "418 services", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { title: "Eyelashes", count: "612 services", img: "https://images.unsplash.com/photo-1583001809873-a1284d56338b?auto=format&fit=crop&w=600&q=80" },
    { title: "Threading", count: "213 services", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block mb-1">
            CATEGORIES
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-medium">
            What are you looking for?
          </h2>
        </div>
        <Link
          href="/discover?tab=services"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#B78735]/30 bg-[#F3F0EA] text-xs font-semibold text-[#2C2E33] hover:bg-[#F5F3EF] hover:border-[#B78735] transition-all self-start md:self-auto"
        >
          Browse all services
          <ArrowRight className="w-3.5 h-3.5 text-[#B78735]" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={`/search?category=${encodeURIComponent(cat.title)}`}
            className="group relative h-40 sm:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E0D6]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${cat.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
              <div>
                <h3 className="font-title text-base sm:text-lg font-bold text-white group-hover:text-[#CAA054] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-zinc-300 font-light">{cat.count}</p>
              </div>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-white/20 text-white flex items-center justify-center backdrop-blur-sm group-hover:bg-[#B78735] transition-colors shrink-0">
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
