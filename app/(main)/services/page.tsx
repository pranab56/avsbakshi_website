"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  UserPlus,
} from "lucide-react";
import { useGetAllCategoryQuery } from "@/features/category/category";

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  img: string;
  desc: string;
}

const ITEMS_PER_PAGE = 8;

export default function ServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryPill, setSelectedCategoryPill] = useState("all");
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
            : cat.count || "0 Services",
        img:
          cat.image ||
          cat.img ||
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        desc: cat.description || cat.desc || "",
      }));
    }
    return [];
  }, [apiCategories]);

  // Dynamic Category Pills from API Data
  const categoryPills = useMemo(() => {
    const list = [{ id: "all", name: "All" }];
    apiCategories.forEach((c: any) => {
      const name = c.name || c.title;
      const id = c._id || c.id;
      if (name && id && !list.some((item) => item.id === id)) {
        list.push({ id, name });
      }
    });
    return list;
  }, [apiCategories]);

  // Filter categories by search input and category pill
  const filteredCategories: CategoryItem[] = useMemo(() => {
    let result = categoriesList;

    if (selectedCategoryPill !== "all") {
      result = result.filter(
        (cat) =>
          cat.id === selectedCategoryPill ||
          cat.title.toLowerCase().includes(selectedCategoryPill.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (cat: CategoryItem) =>
          cat.title.toLowerCase().includes(query) ||
          cat.desc.toLowerCase().includes(query)
      );
    }

    return result;
  }, [categoriesList, searchQuery, selectedCategoryPill]);

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

  const handleCategoryPillSelect = (pillId: string) => {
    setSelectedCategoryPill(pillId);
    setCurrentPage(1);
  };

  const handleFindProfessionalsSubmit = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("searchTerm", searchQuery.trim());
    if (selectedCategoryPill && selectedCategoryPill !== "all") {
      params.set("serviceCategory", selectedCategoryPill);
    }

    const queryStr = params.toString();
    router.push(queryStr ? `/professionals?${queryStr}` : "/professionals");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-20 select-none">
      {/* =========================================================================
          FIGMA HERO SECTION (Matching Home Page Arched Frame & Client Reference)
      ========================================================================= */}
      <section className="w-full relative bg-white dark:bg-[#121214] border-b border-border/40 overflow-hidden transition-colors duration-200">
        {/* Subtle Animated Ambient Glow in Background */}
        <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* Desktop Golden Arc Frame Pinned to Viewport Right-0 */}
        <div className="hidden lg:flex absolute inset-y-0 -top-[6px] -bottom-[6px] right-0 w-[calc(48vw)] xl:w-[calc(50vw)] rounded-l-full border-l-[22px] xl:border-l-[26px] border-t-[3.5px] border-b-[3.5px] border-[#D99722] shadow-2xl overflow-hidden bg-[#121110] items-stretch z-0">
          <div className="w-full relative overflow-hidden h-full">
            <motion.div
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/hero/images.png"
                alt="The Cloud Salon Professionals & Styling"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Hero Left Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-14 lg:py-16 min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] xl:min-h-[500px] flex flex-col justify-center">
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

          <div className="max-w-2xl space-y-4">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              <span className="w-7 h-[2px] bg-[#D99722] inline-block" />
              <span>PROFESSIONALS AT THE CLOUD SALON</span>
            </div>

            {/* Headline matching client reference image */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-[#1C1C1E] dark:text-white">
              Find your professional. <br />
              <span className="text-[#D99722]">Love your look.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-normal max-w-xl leading-relaxed">
              Connect with local beauty professionals and explore their services.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-8 pt-2 max-w-3xl">
            <div className="bg-card border border-border shadow-xl rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Full Width Search Field */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-accent/40 rounded-xl border border-border/50 focus-within:border-[#D99722] focus-within:bg-background transition-all">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Service or specialty (e.g. Hair, Nails, Skincare, Barber)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFindProfessionalsSubmit();
                    }
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Action Button: Find Professionals */}
              <button
                type="button"
                onClick={handleFindProfessionalsSubmit}
                className="px-7 py-3 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <span>Find Professionals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXPLORE SERVICES & CATEGORY PILLS SECTION (Matching Reference Image)
      ========================================================================= */}
      <section ref={gridTopRef} className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 scroll-mt-24">
        {/* Section Header with Category Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8 pb-4 border-b border-border/50">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Explore Services
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Browse verified specialties, treatment menus, and qualified professionals.
            </p>
          </div>

          {/* Dynamic Filter Pills */}
          {categoryPills.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
              {categoryPills.map((pill) => {
                const isActive = selectedCategoryPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleCategoryPillSelect(pill.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                      isActive
                        ? "bg-[#D99722] text-white border-[#D99722] shadow-sm scale-102"
                        : "bg-card hover:bg-accent border-border text-foreground hover:text-foreground"
                    }`}
                  >
                    {pill.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Categories Grid Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse flex flex-col h-80"
              >
                <div className="h-52 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          /* Empty Search / No Categories State */
          <div className="p-16 text-center bg-card border border-border rounded-2xl max-w-xl mx-auto space-y-4 my-8">
            <div className="w-14 h-14 rounded-full bg-[#D99722]/10 text-[#D99722] mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {searchQuery ? "No categories found" : "No Categories Available"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {searchQuery
                ? `We couldn't find any service category matching "${searchQuery}". Try checking for typos or clear your search to see all categories.`
                : "There are currently no service categories listed in the system."}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              {(searchQuery || selectedCategoryPill !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    handleSearchChange("");
                    setSelectedCategoryPill("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
              <Link
                href="/professionals"
                className="px-4 py-2 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold"
              >
                Browse All Professionals
              </Link>
            </div>
          </div>
        ) : (
          /* Categories Grid with Pagination */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {paginatedCategories.map((cat: CategoryItem, idx: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-xl hover:border-[#D99722]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
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
                      <h2 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover/img:text-[#D99722] transition-colors">
                        {cat.title}
                      </h2>
                    </div>
                  </Link>

                  {/* Category Body & Action */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-card">
                    {cat.desc ? (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    ) : null}

                    <div className={cat.desc ? "pt-3 border-t border-border/40" : ""}>
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

            {/* Pagination Controls - only rendered if more than ITEMS_PER_PAGE categories */}
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

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION BANNER (Matching Client Reference Image)
        ========================================================================= */}
        <div className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121214] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D99722]/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 flex items-center gap-5 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#D99722]/20 text-[#D99722] flex items-center justify-center shrink-0 border border-[#D99722]/40 shadow-inner">
                <UserPlus className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                  Are you an independent beauty specialist?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
                  Showcase your portfolio, take direct client bookings, rent chairs at luxury salons, and keep 100% of your earnings.
                </p>
              </div>
            </div>

            <Link
              href="/for-professionals"
              className="relative z-10 px-8 py-3.5 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#D99722]/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Join as a Professional</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
