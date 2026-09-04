"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Search, Star, MapPin, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [userTab, setUserTab] = useState<string | null>(null);
  const activeTab = userTab ?? tabParam ?? "services";
  const setActiveTab = (tab: string) => setUserTab(tab);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortOptions = ["Recommended", "Highest Rated", "Distance", "Price: Low to High"];

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

  const professionals = [
    { id: 1, name: "Emma Studio", category: "Hair & Beauty", rating: 4.8, reviews: 89, location: "Soho, London", price: "from £40", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Maya Chen", category: "Colorist", rating: 4.9, reviews: 124, location: "Soho, London", price: "from £50", badge: "Top Rated", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Amara Studio", category: "Nails", rating: 4.8, reviews: 95, location: "Soho, London", price: "from £35", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "The Fold Barbers", category: "Skin Fade & Beard", rating: 4.9, reviews: 210, location: "Soho, London", price: "from £40", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Lune Nail Studio", category: "Hair & Beauty", rating: 4.7, reviews: 78, location: "Soho, London", price: "from £45", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "North Lane Collective", category: "Full-service salon", rating: 4.9, reviews: 156, location: "Soho, London", price: "from £60", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80" },
  ];

  const salons = [
    { id: 101, name: "Noir Studio", category: "Hair & Beauty", rating: 4.8, reviews: 89, location: "Soho, London", price: "from £55", badge: "Open until 9:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80" },
    { id: 102, name: "The Ritual", category: "Skincare & Wellness", rating: 4.9, reviews: 142, location: "Marylebone, London", price: "from £90", badge: "Open until 10:00 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" },
    { id: 103, name: "Golden Ratio", category: "Barbershop", rating: 4.8, reviews: 99, location: "Hackney, London", price: "from £40", badge: "Open until 9:30 PM", tags: ["Haircut", "Colour", "Blowout"], img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Hero Header */}
      <section className="bg-[#1E1C1A] text-white pt-16 sm:pt-20 pb-0 relative overflow-hidden">
        {/* Bottom-right warm amber color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B78735]" />
              <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
                DISCOVER
              </span>
            </div>

            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
              Every service. Every <br />
              <span className="font-light italic text-[#CAA054]">professional. Every salon</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
              Search by service, location and date, then compare verified professionals and salons side by side.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md relative pt-2">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2C2A26] border border-white/15 rounded-lg pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#B78735] transition-colors"
            />
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-white/10 pt-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`pb-3.5 transition-colors cursor-pointer relative ${activeTab === "services"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              Services
              {activeTab === "services" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("professionals")}
              className={`pb-3.5 transition-colors cursor-pointer relative ${activeTab === "professionals"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              Professionals
              {activeTab === "professionals" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("salons")}
              className={`pb-3.5 transition-colors cursor-pointer relative ${activeTab === "salons"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              Salons
              {activeTab === "salons" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 1. SERVICES TAB */}
        {activeTab === "services" && (
          <div className="animate-in fade-in duration-200">
            <div className="mb-12">
              <p className="text-xs sm:text-sm font-normal text-[#666159] mb-6">
                {serviceCategories.length} service categories
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCategories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={`/search?category=${encodeURIComponent(cat.title)}`}
                    className="relative rounded-lg overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group h-80 border border-black/5 flex flex-col justify-end p-6"
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
                      <span className="bg-white/90 text-[#1A1A1A] font-semibold text-xs px-3 py-1 rounded-full shrink-0 shadow-xs ml-2">
                        {cat.count}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Right Now */}
            <div className="pt-8 border-t border-[#D5CBB9]">
              <h4 className="text-xs font-semibold text-[#666159] uppercase tracking-[0.15em] mb-4">
                POPULAR RIGHT NOW
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {popularTags.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="bg-[#F4EBE0] hover:bg-[#F4EBE0] text-[#B78735] text-xs font-medium px-4 py-2 rounded-sm transition-colors border border-[#F4EBE0] cursor-pointer"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFESSIONALS TAB */}
        {activeTab === "professionals" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[#666159]">{professionals.length} professionals near you</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#666159]">Sort:</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2.5 bg-white hover:bg-[#FDFBF7] border border-[#DCD5C9] rounded-xl px-4 py-2 text-xs font-semibold text-[#1A1A1A] shadow-xs transition-all cursor-pointer"
                  >
                    <span>{sortOption}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#B78735] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DCD5C9] rounded-xl shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSortOption(opt);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${sortOption === opt
                                ? "bg-[#F4EBE0] text-[#B78735] font-semibold"
                                : "text-[#2C2E33] hover:bg-[#F9F7F2] font-medium"
                              }`}
                          >
                            <span>{opt}</span>
                            {sortOption === opt && <span className="w-1.5 h-1.5 rounded-full bg-[#B78735]" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-[#EAE5DC] rounded-lg overflow-hidden border border-[#DCD5C9] shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${pro.img}')` }}
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#1A1A1A]">
                      {pro.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-title text-base font-bold text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                            {pro.name}
                          </h3>
                          <p className="text-xs text-[#666159]">{pro.category}</p>
                        </div>
                        <span className="font-title text-xs font-bold text-[#B78735]">{pro.price}</span>
                      </div>

                      <div className="flex items-center gap-1 mt-2 text-xs text-zinc-600">
                        <Star className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]" />
                        <span className="font-bold text-[#1A1A1A]">{pro.rating}</span>
                        <span className="text-zinc-400">({pro.reviews})</span>
                        <span className="mx-1">•</span>
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span className="text-zinc-500">{pro.location}</span>
                      </div>
                    </div>

                    <Link
                      href="/professionals/1"
                      className="w-full text-center py-3 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-sm shadow-sm transition-colors block mt-2"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SALONS TAB */}
        {activeTab === "salons" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#666159]">{salons.length} salons near you</p>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-2 bg-[#F4EBE0] text-[#B78735] text-xs rounded-sm font-medium cursor-pointer">
                  Open Now
                </button>
                <button className="px-4 py-2 bg-[#F4EBE0] text-[#B78735] text-xs rounded-sm font-medium cursor-pointer">
                  Hair
                </button>
                <button className="px-4 py-2 bg-[#F4EBE0] text-[#B78735] text-xs rounded-sm font-medium cursor-pointer">
                  Skincare
                </button>
                <button className="px-4 py-2 bg-[#F4EBE0] text-[#B78735] text-xs rounded-sm font-medium cursor-pointer">
                  Barber
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {salons.map((salon) => (
                <div
                  key={salon.id}
                  className="bg-[#EAE5DC] rounded-lg overflow-hidden border border-[#DCD5C9] shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${salon.img}')` }}
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#1A1A1A]">
                      {salon.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-title text-base font-bold text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                            {salon.name}
                          </h3>
                          <p className="text-xs text-[#666159]">{salon.category}</p>
                        </div>
                        <span className="font-title text-xs font-bold text-[#B78735]">{salon.price}</span>
                      </div>

                      <div className="flex items-center gap-1 mt-2 text-xs text-zinc-600">
                        <Star className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]" />
                        <span className="font-bold text-[#1A1A1A]">{salon.rating}</span>
                        <span className="text-zinc-400">({salon.reviews})</span>
                        <span className="mx-1">•</span>
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span className="text-zinc-500">{salon.location}</span>
                      </div>
                    </div>

                    <Link
                      href="/professionals/1"
                      className="w-full text-center py-3 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-sm shadow-sm transition-colors block mt-2"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading discover page...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
