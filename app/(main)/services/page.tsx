"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Loader2,
  X,
  Compass,
} from "lucide-react";
import { useGetAllCategoryQuery } from "@/features/category/category";
import { SERVICE_CATEGORIES } from "@/lib/data/marketplaceData";

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  img: string;
  desc: string;
}

const ITEMS_PER_PAGE = 10;

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const { data: categoriesRes, isLoading } = useGetAllCategoryQuery({});

  const apiCategories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

  const categoriesList: CategoryItem[] = useMemo(() => {
    if (apiCategories.length > 0) {
      return apiCategories.map((cat: any, idx: number): CategoryItem => ({
        id: cat._id || cat.id || `cat-${idx}`,
        title: cat.name || cat.title || "Beauty Service",
        count:
          cat.totalServices !== undefined
            ? `${cat.totalServices} Services`
            : cat.count || "Available",
        img:
          cat.image ||
          cat.img ||
          SERVICE_CATEGORIES[idx % SERVICE_CATEGORIES.length]?.img ||
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        desc:
          cat.description ||
          cat.desc ||
          (cat.name
            ? `Top-rated verified professionals specializing in ${cat.name.toLowerCase()} treatments.`
            : "Professional beauty & wellness services"),
      }));
    }
    return SERVICE_CATEGORIES.map((cat): CategoryItem => ({
      id: cat.id,
      title: cat.title,
      count: cat.count.includes("Services") ? cat.count : `${cat.count} Services`,
      img: cat.img,
      desc: cat.desc,
    }));
  }, [apiCategories]);

  // Filter categories by search input
  const filteredCategories: CategoryItem[] = useMemo(() => {
    if (!searchQuery.trim()) return categoriesList;
    const query = searchQuery.toLowerCase().trim();
    return categoriesList.filter(
      (cat: CategoryItem) =>
        cat.title.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query)
    );
  }, [categoriesList, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = useMemo(() => {
    if (filteredCategories.length <= ITEMS_PER_PAGE) {
      return filteredCategories;
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCategories, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-20">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-card via-card/70 to-background py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20">
                <Sparkles className="w-3 h-3 text-[#D99722]" />
                Service Categories
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-serif">
                What are you looking for?
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Explore our full spectrum of professional beauty, grooming, and wellness services.
                Select any category to view verified professionals, explore portfolios, and book appointments.
              </p>
            </div>

            {/* Quick action to browse all professionals */}
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/professionals"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card hover:bg-accent border border-border text-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group"
              >
                <Scissors className="w-4 h-4 text-[#D99722] group-hover:rotate-45 transition-transform" />
                <span>Browse All Professionals</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Search Bar & Counter */}
          <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search categories (e.g., Hair, Nails, Barber, Skincare)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D99722]/40 focus:border-[#D99722] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-muted-foreground font-medium">
              Showing{" "}
              <span className="font-bold text-foreground">
                {filteredCategories.length}
              </span>{" "}
              {filteredCategories.length === 1 ? "category" : "categories"}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section ref={gridTopRef} className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse flex flex-col"
              >
                <div className="h-52 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="pt-2 border-t border-border/40 flex justify-end">
                    <div className="h-3 bg-muted rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          /* Empty Search State */
          <div className="p-16 text-center bg-card border border-border rounded-2xl max-w-xl mx-auto space-y-4 my-8">
            <div className="w-14 h-14 rounded-full bg-[#D99722]/10 text-[#D99722] mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-foreground">
              No categories found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We couldn&apos;t find any service category matching &ldquo;{searchQuery}&rdquo;.
              Try checking for typos or clear your search to see all categories.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold cursor-pointer"
              >
                Reset Search
              </button>
              <Link
                href="/professionals"
                className="px-4 py-2 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold"
              >
                Browse All Professionals
              </Link>
            </div>
          </div>
        ) : (
          /* Categories Grid with Optional Pagination */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {paginatedCategories.map((cat: CategoryItem, idx: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-xl hover:border-[#D99722]/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Category Image Header */}
                  <Link
                    href={`/professionals?serviceCategory=${encodeURIComponent(cat.id)}`}
                    className="relative block h-52 sm:h-56 overflow-hidden group/img cursor-pointer"
                  >
                    <Image
                      src={cat.img}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover/img:scale-108"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Top-Right Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] bg-black/60 backdrop-blur-md text-white font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                        {cat.count}
                      </span>
                    </div>

                    {/* Bottom Header Info */}
                    <div className="absolute bottom-3 left-4 right-4 text-left z-10 space-y-0.5">
                      <h2 className="text-lg sm:text-xl font-bold text-white leading-tight font-serif group-hover/img:text-[#D99722] transition-colors">
                        {cat.title}
                      </h2>
                      <p className="text-[11px] text-white/80 font-normal line-clamp-1">
                        {cat.desc}
                      </p>
                    </div>
                  </Link>

                  {/* Category Body & Action */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-card">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="pt-3 border-t border-border/40">
                      <Link
                        href={`/professionals?serviceCategory=${encodeURIComponent(cat.id)}`}
                        className="w-full py-2.5 px-3 rounded-xl bg-accent hover:bg-[#D99722] text-foreground hover:text-white text-xs font-semibold flex items-center justify-between transition-all group/btn cursor-pointer shadow-2xs"
                      >
                        <span>Find Professionals</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D99722] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls - only rendered if more than 10 categories */}
            {filteredCategories.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
                <div className="text-xs text-muted-foreground font-medium">
                  Showing{" "}
                  <span className="font-bold text-foreground">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-foreground">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredCategories.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-foreground">
                    {filteredCategories.length}
                  </span>{" "}
                  categories
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-accent text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-[#D99722] text-white shadow-md ring-2 ring-[#D99722]/30 scale-105"
                            : "bg-card hover:bg-accent border border-border text-foreground hover:text-foreground"
                        }`}
                      >
                        {pageNum < 10 ? `0${pageNum}` : pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-accent text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
