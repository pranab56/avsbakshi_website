"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin } from "lucide-react";

interface FavoriteItem {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  location: string;
  tags: string[];
  image: string;
  openBadge?: string;
  type: "professional" | "salon";
}

export default function CustomerFavoritesPage() {
  const [activeTab, setActiveTab] = useState<"professionals" | "salons">(
    "professionals"
  );
  const [favoritesList, setFavoritesList] = useState<FavoriteItem[]>([
    {
      id: "1",
      name: "Emma Studio",
      category: "Hair & Beauty",
      price: "from £40",
      rating: 4.8,
      reviewCount: 89,
      location: "Soho, London",
      tags: ["Haircut", "Colour", "Blowout"],
      openBadge: "Open until 9:00 PM",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
      type: "professional",
    },
    {
      id: "2",
      name: "Maya Chen",
      category: "Colorist",
      price: "from £40",
      rating: 4.8,
      reviewCount: 89,
      location: "Soho, London",
      tags: ["Haircut", "Colour", "Blowout"],
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
      type: "professional",
    },
    {
      id: "3",
      name: "Amara Studio",
      category: "Nails",
      price: "from £40",
      rating: 4.8,
      reviewCount: 89,
      location: "Soho, London",
      tags: ["Haircut", "Colour", "Blowout"],
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
      type: "professional",
    },
    {
      id: "4",
      name: "Lune Nail Studio",
      category: "Hair & Beauty",
      price: "from £40",
      rating: 4.8,
      reviewCount: 89,
      location: "Soho, London",
      tags: ["Haircut", "Colour", "Blowout"],
      openBadge: "Open until 9:00 PM",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
      type: "salon",
    },
  ]);

  const toggleFavorite = (id: string) => {
    setFavoritesList((prev) => prev.filter((item) => item.id !== id));
  };

  const displayedItems = favoritesList.filter((item) =>
    activeTab === "professionals" ? item.type === "professional" : item.type === "salon"
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Favorites
        </h1>
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          Professionals and salons you have saved
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-[#E3DDD3] flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("professionals")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "professionals"
              ? "text-[#A27933]"
              : "text-[#787570] hover:text-[#2C2E33]"
          }`}
        >
          Professionals
          {activeTab === "professionals" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A27933] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("salons")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "salons"
              ? "text-[#A27933]"
              : "text-[#787570] hover:text-[#2C2E33]"
          }`}
        >
          Salons
          {activeTab === "salons" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A27933] rounded-full" />
          )}
        </button>
      </div>

      {/* Favorites Grid */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E3DDD3]/70 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-[#D0C7B7]"
            >
              {/* Media Thumbnail Container */}
              <div className="relative w-full h-52 sm:h-56 bg-[#E0D9CE]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Open Status Badge */}
                {item.openBadge && (
                  <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs text-[#2C2E33] text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
                    {item.openBadge}
                  </span>
                )}

                {/* Heart Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Remove from favorites"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#A27933] hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  <Heart className="w-4 h-4 fill-[#A27933] text-[#A27933]" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Name & Price Row */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2C2E33] leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-serif italic font-bold text-lg sm:text-xl text-[#A27933] shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-xs sm:text-sm text-[#787570]">
                    {item.category}
                  </p>

                  {/* Rating Row */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <div className="flex items-center gap-0.5 text-[#A27933]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#A27933] text-[#A27933]"
                        />
                      ))}
                    </div>
                    <span className="text-[#2C2E33] font-medium ml-1">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#787570]">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#787570]" />
                    <span>{item.location}</span>
                  </div>

                  {/* Tag Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-white text-[#5C5954] px-3 py-1 border border-[#E3DDD3]/70 rounded-sm text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Appointment Action */}
                <div className="pt-2">
                  <Link
                    href={`/book/${item.id}`}
                    className="w-full block text-center bg-[#B78735] hover:bg-[#8F6929] text-white py-2.5 rounded-sm font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#EBE7DF]/80 border border-[#E3DDD3]/70 rounded-2xl p-12 text-center text-[#787570] space-y-2">
          <p className="font-serif text-lg">No saved {activeTab} yet.</p>
          <p className="text-xs">Browse professionals and click the heart icon to save them to your favorites.</p>
        </div>
      )}
    </div>
  );
}