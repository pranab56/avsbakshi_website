"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data/marketplaceData";
import { ServiceCategory } from "@/types";
import { Sparkles, ChevronRight, Layers, ArrowLeft, Clock, Tag } from "lucide-react";

export default function ServicesTab() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null);

  return (
    <div className="animate-in fade-in duration-200 space-y-8">
      {/* Detail View when a Category Card is Clicked */}
      {activeCategory ? (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D99722] hover:underline cursor-pointer bg-card px-4 py-2 rounded-lg border border-border shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </button>

          {/* Selected Category Banner */}
          <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 border border-border shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${activeCategory.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#D99722] uppercase tracking-widest block mb-1">
                  CATEGORY DETAILS
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {activeCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                  {activeCategory.desc}
                </p>
              </div>
              <div className="bg-background/90 text-foreground font-bold text-xs px-4 py-2 rounded-full border border-border/50 shrink-0 self-start sm:self-auto">
                {activeCategory.count} Services Available
              </div>
            </div>
          </div>

          {/* Subcategories Inside the Selected Category */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D99722]" />
                <span>Subcategories ({activeCategory.subcategories.length})</span>
              </h3>
              <Link
                href={`/search?category=${encodeURIComponent(activeCategory.title)}`}
                className="text-xs font-semibold text-[#D99722] hover:underline"
              >
                Search all {activeCategory.title} &rarr;
              </Link>
            </div>

            {activeCategory.subcategories && activeCategory.subcategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-xl bg-card border border-border hover:border-[#D99722]/50 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-foreground">
                        {sub.name}
                      </h4>
                      {sub.count && (
                        <span className="text-[10px] text-muted-foreground bg-accent px-2.5 py-1 rounded-full font-semibold border border-border/50">
                          {sub.count} services
                        </span>
                      )}
                    </div>

                    {sub.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {sub.description}
                      </p>
                    )}

                    {/* Services preview under subcategory */}
                    {sub.services && sub.services.length > 0 && (
                      <div className="pt-2 border-t border-border/50 space-y-2">
                        {sub.services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-accent/40 text-xs border border-border/30"
                          >
                            <span className="font-medium text-foreground">{service.name}</span>
                            <div className="flex items-center gap-2">
                              {service.duration && (
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#D99722]" />
                                  {service.duration}
                                </span>
                              )}
                              {service.price && (
                                <span className="font-bold text-[#D99722] bg-[#D99722]/10 px-2 py-0.5 rounded text-[11px]">
                                  {service.price}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 text-right">
                      <Link
                        href={`/search?category=${encodeURIComponent(activeCategory.title)}&subcategory=${encodeURIComponent(sub.name)}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#D99722] hover:underline"
                      >
                        <span>Book {sub.name}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground bg-card rounded-xl border border-dashed border-border">
                No subcategories listed for this category. Direct booking available.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Category Cards Grid (NO subcategories listed inside cards!) */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">
              All Service Categories ({SERVICE_CATEGORIES.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Click any category card to view its subcategories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className="bg-card rounded-xl border border-border shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                {/* Category Card Header Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-700"
                    style={{ backgroundImage: `url('${cat.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-md text-foreground font-bold text-[10px] px-2.5 py-1 rounded-full border border-border/50 shadow-xs">
                    {cat.count} Services
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[9px] font-bold text-[#D99722] uppercase tracking-widest block mb-0.5">
                      CATEGORY
                    </span>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {cat.title}
                    </h4>
                  </div>
                </div>

                {/* Category Card Footer (NO subcategories listed inside card!) */}
                <div className="p-4 space-y-3 bg-card flex-1 flex flex-col justify-between">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-[#D99722] group-hover:text-[#C2841B] transition-colors">
                    <span>View Subcategories</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Search Tags */}
          <div className="pt-8 border-t border-border">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99722]" />
              <span>POPULAR BEAUTY SEARCHES</span>
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {["Balayage", "Russian Manicure", "Hydrafacial", "Skin Fade", "Brow Lamination", "Keratin Treatment", "Deep Tissue Massage"].map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-accent hover:bg-[#D99722]/15 hover:text-[#D99722] text-foreground text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-border cursor-pointer flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-[#D99722]" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
