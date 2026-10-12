"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";
import { useAddAndRemoveWishListMutation } from "@/features/wishlist/wishlistApi";

export interface SearchResultItem {
  id: string | number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  nextSlot: string;
  tags: string[];
  img: string;
  description?: string;
  type?: "professional" | "salon";
}

interface SearchResultsListProps {
  results: SearchResultItem[];
  loc: string;
  isLoading?: boolean;
}

export default function SearchResultsList({ results, loc, isLoading }: SearchResultsListProps) {
  const [page, setPage] = useState(1);
  const [likedCards, setLikedCards] = useState<Record<string | number, boolean>>({});
  const token = useSelector((state: { auth?: { token?: string | null } }) => state.auth?.token);
  const [addAndRemoveWishList] = useAddAndRemoveWishListMutation();

  const toggleWishlist = async (id: string | number, type: "professional" | "salon" = "professional") => {
    if (!token) {
      toast.error("Please log in to add to wishlist");
      return;
    }
    try {
      const res = await addAndRemoveWishList({
        entityType: type,
        entity: String(id),
      }).unwrap();
      setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
      toast.success(res?.message || "Wishlist updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update wishlist");
    }
  };
  const [sortOption, setSortOption] = useState("Highest Rated");
  const sortOptions = [
    { value: "Recommended", label: "Recommended" },
    { value: "Highest Rated", label: "Highest Rated" },
    { value: "Distance", label: "Distance" },
    { value: "Price: Low to High", label: "Price: Low to High" },
  ];

  if (isLoading) {
    return (
      <div className="lg:col-span-9 space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-card rounded-xl h-52 border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="lg:col-span-9 bg-card p-12 text-center rounded-xl border border-border space-y-3">
        <Search className="w-10 h-10 text-muted-foreground mx-auto" />
        <h4 className="text-base font-bold text-foreground">No Search Results Found</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          No services or professionals were found matching your query in {loc}. Try searching for a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-xs sm:text-sm font-medium text-foreground">
          <span className="font-bold">{results.length}</span> professionals found near <span className="font-bold">{loc}</span>
        </p>

        <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
          <span className="text-muted-foreground font-medium">Sort:</span>
          <Combobox
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            triggerClassName="bg-card border border-border text-foreground hover:border-primary/60 hover:bg-accent/50 font-semibold rounded-full px-3.5 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
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
              <button
                type="button"
                onClick={() => toggleWishlist(item.id, item.type || "professional")}
                className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-background/90 backdrop-blur-md text-foreground flex items-center justify-center border border-border/50 shadow hover:scale-110 transition-transform cursor-pointer z-10"
              >
                <Heart className={`w-4 h-4 ${likedCards[item.id] ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            {/* Right Content */}
            <div className="sm:col-span-8 p-5 sm:p-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
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
                    <span className="text-lg sm:text-xl font-bold text-primary block">
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
                    href={item.type === "salon" ? `/salons/${item.id}` : `/professionals/${item.id}`}
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border text-xs font-semibold rounded-xl transition-colors"
                  >
                    {item.type === "salon" ? "Salon Details" : "View Profile"}
                  </Link>
                  <Link
                    href={item.type === "salon" ? `/salons/${item.id}` : `/book/1?proId=${item.id}`}
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
                  >
                    {item.type === "salon" ? "Explore Salon" : "Book Appointment"}
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
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${page === num
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
