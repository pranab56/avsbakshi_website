"use client";

import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data/marketplaceData";
import { Sparkles, ChevronRight, Tag } from "lucide-react";
import { useGetAllCategoryQuery } from "@/features/category/category";

export default function ServicesTab() {
  const { data: categoriesRes } = useGetAllCategoryQuery({});

  const apiCategories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const categoriesList = apiCategories.length > 0
    ? apiCategories.map((cat: any, idx: number) => ({
      id: cat._id || cat.id || `cat-${idx}`,
      title: cat.name || cat.title,
      count: cat.totalServices !== undefined ? `${cat.totalServices}` : cat.count || "0",
      img: cat.image || cat.img || SERVICE_CATEGORIES[idx % SERVICE_CATEGORIES.length]?.img || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      desc: cat.name ? `${cat.name} professional beauty services` : cat.desc || "",
    }))
    : SERVICE_CATEGORIES;

  return (
    <div className="animate-in fade-in duration-200 space-y-8">
      {/* Category Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">
            All Service Categories ({categoriesList.length})
          </h3>
          <p className="text-xs text-muted-foreground">
            Click any category card to browse services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoriesList.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/professionals?serviceCategory=${encodeURIComponent(cat.id)}`}
              className="bg-card rounded-xl border border-border shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 block"
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

              {/* Category Card Footer */}
              <div className="p-4 space-y-3 bg-card flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-[#D99722] group-hover:text-[#C2841B] transition-colors">
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
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
    </div>
  );
}
