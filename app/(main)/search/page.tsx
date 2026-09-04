"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";

function SearchResultContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const loc = searchParams.get("loc") || "London";

  const [providerFilter, setProviderFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>(["today"]);
  const [distanceFilter, setDistanceFilter] = useState("5");
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortOptions = ["Recommended", "Highest Rated", "Distance", "Price: Low to High"];

  const toggleAvailability = (val: string) => {
    setAvailabilityFilter(prev =>
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const results = [
    {
      id: 1,
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Shoreditch, London · 10 years experience",
      price: "from £40",
      nextSlot: "Today, 2:30 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Shoreditch, London · 10 years experience",
      price: "from £40",
      nextSlot: "Today, 2:30 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Shoreditch, London · 10 years experience",
      price: "from £40",
      nextSlot: "Today, 2:30 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Shoreditch, London · 10 years experience",
      price: "from £40",
      nextSlot: "Today, 2:30 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Search Header */}
      <section className="bg-[#1E1C1A] text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Bottom-right warm amber color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

        {/* Right Barber Image Backdrop */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-cover bg-right pointer-events-none hidden md:block"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80')` }}
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B78735]" />
              <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
                DISCOVER
              </span>
            </div>

            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
              Find your perfect <br />
              <span className="font-light italic text-[#CAA054]">beauty experience</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
              Search by service, location and date, then compare verified professionals and salons side by side.
            </p>
          </div>

          {/* Search Inputs Bar */}
          <div className="bg-white/10 p-2 rounded-xl border border-white/15 flex flex-col sm:flex-row items-center gap-2 max-w-3xl">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-[#2C2A26] rounded-lg w-full">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                defaultValue={q}
                placeholder="Try 'balayage', 'facial'..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-[#2C2A26] rounded-lg w-full">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                defaultValue={loc}
                placeholder="City, ZIP code, or location"
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
            >
              Find a Service
            </button>
          </div>

          {/* Popular tags below search bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-zinc-400 font-normal mr-1">Popular:</span>
            {["Haircut", "Highlights", "Nail Art", "Facial", "Barber"].map((tag, idx) => (
              <Link
                key={idx}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-md border border-white/15 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Layout Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-xs">
              <h3 className="font-title font-bold text-base text-[#1A1A1A]">
                Filters
              </h3>

              {/* Provider Radio Filter */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#666159] uppercase tracking-wider block">
                  PROVIDER
                </label>
                <div className="space-y-2 text-xs text-[#2C2E33]">
                  {["All", "Professional", "Salon"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="provider"
                        checked={providerFilter === type.toLowerCase()}
                        onChange={() => setProviderFilter(type.toLowerCase())}
                        className="accent-[#B78735]"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <label className="text-[10px] font-bold text-[#666159] uppercase tracking-wider block">
                  AVAILABILITY
                </label>
                <div className="space-y-2 text-xs text-[#2C2E33]">
                  {[
                    { id: "today", label: "Today" },
                    { id: "tomorrow", label: "Tomorrow" },
                    { id: "this-week", label: "This Week" },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availabilityFilter.includes(item.id)}
                        onChange={() => toggleAvailability(item.id)}
                        className="accent-[#B78735] rounded"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <label className="text-[10px] font-bold text-[#666159] uppercase tracking-wider block">
                  DISTANCE
                </label>
                <div className="space-y-2 text-xs text-[#2C2E33]">
                  {["1 mile", "5 miles", "10 miles", "25 miles"].map((dist, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="distance"
                        checked={distanceFilter === dist.split(" ")[0]}
                        onChange={() => setDistanceFilter(dist.split(" ")[0])}
                        className="accent-[#B78735]"
                      />
                      <span>{dist}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProviderFilter("all");
                  setAvailabilityFilter(["today"]);
                  setDistanceFilter("5");
                }}
                className="w-full py-3 bg-[#E2DACD] hover:bg-[#D6C9B7] text-[#2C2E33] font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-[#DCD5C9]"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Right Results List */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm font-medium text-[#1A1A1A]">
                <span className="font-bold">124</span> professionals found near <span className="font-bold">{loc}</span>
              </p>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#666159]">Sort:</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2.5 bg-white hover:bg-[#FDFBF7] border border-[#DCD5C9] rounded-sm px-4 py-2 text-xs font-semibold text-[#1A1A1A] shadow-xs transition-all cursor-pointer"
                  >
                    <span>{sortOption}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#B78735] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                      <div className="absolute right-0 border  w-48 bg-white  z-30 animate-in fade-in zoom-in-95 duration-150">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSortOption(opt);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              sortOption === opt
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

            {/* Horizontal Professional Result Cards */}
            <div className="space-y-6">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 sm:grid-cols-12 gap-0 group"
                >
                  {/* Left Image */}
                  <div className="sm:col-span-4 relative h-56 sm:h-auto overflow-hidden min-h-[220px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${item.img}')` }}
                    />
                  </div>

                  {/* Right Content */}
                  <div className="sm:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-title text-xl font-bold text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#666159] mb-2">{item.category}</p>

                          <div className="flex items-center gap-1 text-xs text-[#1A1A1A]">
                            <div className="flex items-center text-[#B78735] text-sm">
                              ★★★★★
                            </div>
                            <span className="font-bold ml-1">{item.rating}</span>
                            <span className="text-[#666159]">({item.reviews})</span>
                          </div>

                          <p className="text-xs text-[#666159] flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-[#666159] shrink-0" />
                            <span>{item.location}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-title text-xl font-bold text-[#C59B4C] block">
                            {item.price}
                          </span>
                          <span className="text-[10px] text-[#666159] block">per service</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#E2DACD] text-[#2C2E33] text-[11px] font-medium px-3 py-1 rounded-md border border-[#D5CBB9]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCD5C9]">
                      <span className="text-xs font-semibold text-[#2E7D32]">
                        Next: {item.nextSlot}
                      </span>

                      <div className="flex items-center gap-3">
                        <Link
                          href="/professionals/1"
                          className="px-5 py-2.5 bg-[#E2DACD] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs font-semibold rounded-sm transition-colors"
                        >
                          View profile
                        </Link>
                        <Link
                          href="/book/1"
                          className="px-5 py-2.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-sm shadow-xs transition-colors"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2.5 pt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="text-xs font-semibold text-[#1A1A1A] hover:text-[#B78735] px-3 py-2 disabled:opacity-40 cursor-pointer"
              >
                Prev
              </button>

              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${page === num
                      ? "bg-[#B78735] text-white shadow-xs"
                      : "bg-[#E2DACD] hover:bg-[#D6C9B7] text-[#2C2E33] border border-[#DCD5C9]"
                    }`}
                >
                  0{num}
                </button>
              ))}

              <span className="w-9 h-9 rounded-full bg-[#E2DACD] text-[#2C2E33] text-xs flex items-center justify-center border border-[#DCD5C9]">
                ...
              </span>

              <button className="w-9 h-9 rounded-full bg-[#E2DACD] text-[#2C2E33] text-xs font-semibold border border-[#DCD5C9] cursor-pointer">
                24
              </button>

              <button
                onClick={() => setPage(prev => prev + 1)}
                className="text-xs font-semibold text-[#B78735] hover:text-[#B78735] px-3 py-2 cursor-pointer"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading search results...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}
