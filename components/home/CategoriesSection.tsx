"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/data/marketplaceData";

export default function CategoriesSection() {
  return (
    <section className="w-full py-6 sm:py-10 bg-white dark:bg-[#121214] transition-colors duration-200 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-1">
              SERVICES & SUBCATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
              What are you looking for?
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Explore professional beauty categories & subcategory services
            </p>
          </div>

          <Link
            href="/discover?tab=services"
            className="self-start sm:self-auto px-5 py-2.5 rounded-md bg-[#E6E3DC] dark:bg-[#252529] hover:bg-[#DDD9D0] dark:hover:bg-[#303036] text-[#2A2A2D] dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors shadow-2xs shrink-0"
          >
            Browse all services
          </Link>
        </div>

        {/* Categories Grid with Subcategory Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICE_CATEGORIES.filter((c) => c.subcategories.length > 0).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Category Image Header */}
              <Link
                href={`/search?category=${encodeURIComponent(cat.title)}`}
                className="relative block h-44 sm:h-48 overflow-hidden group/img"
              >
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover/img:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 text-left z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] bg-white/20 backdrop-blur-md text-white font-semibold px-2 py-0.5 rounded-full border border-white/30">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-normal mt-0.5 truncate">
                    {cat.desc}
                  </p>
                </div>
              </Link>

              {/* Subcategories List & Pills */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-card">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
                    Subcategories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/search?category=${encodeURIComponent(cat.title)}&subcategory=${encodeURIComponent(sub.name)}`}
                        className="bg-accent/70 hover:bg-[#D99722]/15 hover:text-[#D99722] text-foreground text-[11px] font-medium px-2.5 py-1 rounded-md border border-border/50 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 text-right">
                  <Link
                    href={`/search?category=${encodeURIComponent(cat.title)}`}
                    className="text-[11px] font-semibold text-[#D99722] hover:underline"
                  >
                    Explore all {cat.title} &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
