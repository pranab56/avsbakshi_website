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
      price: "from $40",
      rating: 4.8,
      reviewCount: 89,
      location: "Soho, New York",
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
      price: "from $40",
      rating: 4.8,
      reviewCount: 89,
      location: "Beverly Hills, Los Angeles",
      tags: ["Haircut", "Colour", "Blowout"],
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
      type: "professional",
    },
    {
      id: "3",
      name: "Amara Studio",
      category: "Nails",
      price: "from $40",
      rating: 4.8,
      reviewCount: 89,
      location: "West Village, New York",
      tags: ["Haircut", "Colour", "Blowout"],
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
      type: "professional",
    },
    {
      id: "4",
      name: "Lune Nail Studio",
      category: "Hair & Beauty",
      price: "from $40",
      rating: 4.8,
      reviewCount: 89,
      location: "Tribeca, New York",
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
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Favorites
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Professionals and salons you have saved
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("professionals")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "professionals"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Professionals
          {activeTab === "professionals" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("salons")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "salons"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Salons
          {activeTab === "salons" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Favorites Grid */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-primary/50"
            >
              {/* Media Thumbnail Container */}
              <div className="relative w-full h-52 sm:h-56 bg-accent">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Open Status Badge */}
                {item.openBadge && (
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-xs text-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-xs border border-border">
                    {item.openBadge}
                  </span>
                )}

                {/* Heart Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Remove from favorites"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-xs flex items-center justify-center text-primary hover:bg-background transition-all cursor-pointer shadow-xs border border-border"
                >
                  <Heart className="w-4 h-4 fill-primary text-primary" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Name & Price Row */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-serif italic font-bold text-lg sm:text-xl text-primary shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.category}
                  </p>

                  {/* Rating Row */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <div className="flex items-center gap-0.5 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="text-foreground font-medium ml-1">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    <span>{item.location}</span>
                  </div>

                  {/* Tag Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-accent text-muted-foreground px-3 py-1 border border-border rounded-sm text-xs font-medium"
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
                    className="w-full block text-center bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-sm font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-accent/60 border border-border rounded-2xl p-12 text-center text-muted-foreground space-y-2">
          <p className="font-serif text-lg text-foreground">No saved {activeTab} yet.</p>
          <p className="text-xs">Browse professionals and click the heart icon to save them to your favorites.</p>
        </div>
      )}
    </div>
  );
}