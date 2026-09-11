"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";

export interface SearchResultItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  nextSlot: string;
  tags: string[];
  img: string;
}

interface SearchResultsListProps {
  results: SearchResultItem[];
  loc: string;
}

export default function SearchResultsList({ results, loc }: SearchResultsListProps) {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("Highest Rated");
  const sortOptions = [
    { value: "Recommended", label: "Recommended" },
    { value: "Highest Rated", label: "Highest Rated" },
    { value: "Distance", label: "Distance" },
    { value: "Price: Low to High", label: "Price: Low to High" },
  ];

  return (
    <div className="lg:col-span-9 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-xs sm:text-sm font-medium text-foreground">
          <span className="font-bold">124</span> professionals found near <span className="font-bold">{loc}</span>
        </p>

        <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
          <span className="text-muted-foreground font-medium">Sort:</span>
          <Combobox
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            triggerClassName="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full px-4 py-1.5 text-xs shadow-xs"
          />
        </div>
      </div>

      {/* Horizontal Professional Result Cards */}
      <div className="space-y-6">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 sm:grid-cols-12 gap-0 group text-card-foreground"
          >
            {/* Left Image */}
            <div className="sm:col-span-4 relative h-48 sm:h-auto overflow-hidden min-h-[180px] sm:min-h-[220px]">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${item.img}')` }}
              />
            </div>

            {/* Right Content */}
            <div className="sm:col-span-8 p-5 sm:p-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-title text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">{item.category}</p>

                    <div className="flex items-center gap-1 text-xs text-foreground">
                      <div className="flex items-center text-primary text-sm">
                        ★★★★★
                      </div>
                      <span className="font-bold ml-1">{item.rating}</span>
                      <span className="text-muted-foreground">({item.reviews})</span>
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{item.location}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-title text-lg sm:text-xl font-bold text-primary block">
                      {item.price}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">per service</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-accent text-accent-foreground text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Next: {item.nextSlot}
                </span>

                <div className="flex flex-row items-center gap-2.5 w-full sm:w-auto">
                  <Link
                    href="/professionals/1"
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border text-xs font-semibold rounded-xl transition-colors"
                  >
                    View profile
                  </Link>
                  <Link
                    href="/book/1"
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap"
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
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-8 sm:pt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="text-xs font-semibold text-foreground hover:text-primary px-2.5 py-1.5 disabled:opacity-40 cursor-pointer"
        >
          Prev
        </button>

        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              page === num
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
            }`}
          >
            0{num}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="text-xs font-semibold text-primary hover:text-primary/80 px-2.5 py-1.5 cursor-pointer ml-1"
        >
          Next
        </button>
      </div>
    </div>
  );
}
