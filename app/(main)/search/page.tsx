"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/search/Hero";
import FiltersSidebar from "@/components/search/FiltersSidebar";
import SearchResultsList, { SearchResultItem } from "@/components/search/SearchResultsList";

function SearchResultContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const loc = searchParams.get("loc") || "New York, NY";

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [providerFilter, setProviderFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>(["today"]);
  const [distanceFilter, setDistanceFilter] = useState("5");

  const toggleAvailability = (val: string) => {
    setAvailabilityFilter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const clearAll = () => {
    setProviderFilter("all");
    setAvailabilityFilter(["today"]);
    setDistanceFilter("5");
  };

  const results: SearchResultItem[] = [
    {
      id: 1,
      name: "Noir Salon & Suites",
      category: "Hair & Luxury Beauty",
      rating: 4.9,
      reviews: 142,
      location: "Soho, New York · 10 years experience",
      price: "from $65",
      nextSlot: "Today, 2:30 PM",
      tags: ["Haircut", "Balayage", "Blowout"],
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Maya Chen Color Studio",
      category: "Master Hair Colorist",
      rating: 4.9,
      reviews: 184,
      location: "Beverly Hills, Los Angeles · 12 years experience",
      price: "from $95",
      nextSlot: "Today, 3:15 PM",
      tags: ["Balayage", "Toning", "Highlights"],
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "The Fold Barbering Co.",
      category: "Barbershop & Beard Studio",
      rating: 4.9,
      reviews: 260,
      location: "Tribeca, New York · 8 years experience",
      price: "from $55",
      nextSlot: "Today, 4:00 PM",
      tags: ["Skin Fade", "Beard Trim", "Hot Towel"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Luxe Gel Nail Bar",
      category: "Nail Care & Gel Art",
      rating: 4.8,
      reviews: 115,
      location: "West Village, New York · 6 years experience",
      price: "from $45",
      nextSlot: "Today, 5:00 PM",
      tags: ["Manicure", "Pedicure", "Nail Art"],
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Hero q={q} loc={loc} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full py-3 px-4 bg-accent hover:bg-muted border border-border rounded-xl text-xs font-semibold text-foreground flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>{showMobileFilters ? "Hide Filters ▲" : "Show Filters & Search Options ▼"}</span>
            <span className="text-[10px] text-primary uppercase font-bold">Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FiltersSidebar
            showMobileFilters={showMobileFilters}
            providerFilter={providerFilter}
            setProviderFilter={setProviderFilter}
            availabilityFilter={availabilityFilter}
            toggleAvailability={toggleAvailability}
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            clearAll={clearAll}
          />
          <SearchResultsList results={results} loc={loc} />
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
