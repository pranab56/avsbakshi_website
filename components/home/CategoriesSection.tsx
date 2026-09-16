"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Hair",
      count: "1,842 Services",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Hair",
    },
    {
      title: "Nails",
      count: "934 services",
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Nails",
    },
    {
      title: "Makeup",
      count: "672 services",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Makeup",
    },
    {
      title: "Skincare",
      count: "541 services",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Skincare",
    },
    {
      title: "Barber",
      count: "789 services",
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Barber",
    },
    {
      title: "Eyebrows",
      count: "418 services",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Eyebrows",
    },
    {
      title: "Eyelashes",
      count: "Extensions, lifts & tints",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      link: "/search?category=Eyelashes",
    },
  ];

  return (
    <section className="w-full py-6 sm:py-10 bg-white dark:bg-[#121214] transition-colors duration-200 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-1">
              CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
              What are you looking for?
            </h2>
          </div>

          <Link
            href="/discover?tab=services"
            className="self-start sm:self-auto px-5 py-2.5 rounded-md bg-[#E6E3DC] dark:bg-[#252529] hover:bg-[#DDD9D0] dark:hover:bg-[#303036] text-[#2A2A2D] dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors shadow-2xs shrink-0"
          >
            Browse all services
          </Link>
        </div>

        {/* 5-Column Categories Grid */}
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={cat.link}
                className="group relative block h-40 sm:h-44 lg:h-48 rounded-lg overflow-hidden shadow-xs border border-black/5 dark:border-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background Image */}
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Dark Gradient Overlay for legible crisp white text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Card Text Content */}
                <div className="absolute bottom-3.5 left-4 right-4 text-left z-10">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 font-sans font-normal mt-0.5 truncate">
                    {cat.count}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
