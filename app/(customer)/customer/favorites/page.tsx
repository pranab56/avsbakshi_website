"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyWishListQuery,
  useAddAndRemoveWishListMutation,
} from "@/features/wishlist/wishlistApi";

export default function CustomerFavoritesPage() {
  const [activeTab, setActiveTab] = useState<"professionals" | "salons">("professionals");

  const { data: wishlistRes, isLoading } = useGetMyWishListQuery({});
  const [addAndRemoveWishList] = useAddAndRemoveWishListMutation();

  const rawList = Array.isArray(wishlistRes?.data) ? wishlistRes.data : [];

  const wishlistItems = rawList.map((wItem: any) => {
    const entity = wItem.entity || {};
    const roleRef = entity.roleRef || {};
    const firstName = entity.firstName || "";
    const lastName = entity.lastName || "";
    const name = `${firstName} ${lastName}`.trim() || entity.name || "Specialist";

    const isSalon = wItem.entityType === "salon" || entity.role === "business";
    const itemType: "professional" | "salon" = isSalon ? "salon" : "professional";

    const image =
      typeof entity.image === "string" && entity.image.trim().length > 0
        ? entity.image
        : Array.isArray(roleRef.photos) && roleRef.photos.length > 0 && roleRef.photos[0]
        ? roleRef.photos[0]
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

    const category =
      roleRef.title ||
      entity.businessType ||
      entity.role ||
      (isSalon ? "Beauty Salon" : "Beauty Specialist");

    const price = roleRef.startingPriceInUSD
      ? `from $${roleRef.startingPriceInUSD}`
      : "Verified";

    const rating = roleRef.avgRating !== undefined ? roleRef.avgRating : (entity.avgRating || 5.0);
    const reviewCount = roleRef.totalReviews !== undefined ? roleRef.totalReviews : (entity.totalReviews || 0);

    const location = entity.address?.city
      ? `${entity.address.city}${entity.address.state ? ", " + entity.address.state : ""}`
      : "Location N/A";

    const tags = Array.isArray(roleRef.specialties) && roleRef.specialties.length > 0
      ? roleRef.specialties
      : [isSalon ? "Salon" : "Specialist"];

    return {
      raw: wItem,
      id: wItem._id,
      entityId: entity._id || entity.id,
      entityType: wItem.entityType || "user",
      name,
      category,
      price,
      rating,
      reviewCount,
      location,
      tags,
      image,
      type: itemType,
    };
  });

  const toggleFavorite = async (item: any) => {
    try {
      await addAndRemoveWishList({
        entityType: item.entityType,
        entity: item.entityId,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update favorites");
    }
  };

  const displayedItems = wishlistItems.filter((item: any) =>
    activeTab === "professionals" ? item.type === "professional" : item.type === "salon"
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
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
          Professionals ({wishlistItems.filter((i: any) => i.type === "professional").length})
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
          Salons ({wishlistItems.filter((i: any) => i.type === "salon").length})
          {activeTab === "salons" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Favorites Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-card border border-border rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {displayedItems.map((item: any) => (
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

                {/* Heart Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(item)}
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
                    <h3 className="font-bold text-lg sm:text-xl text-foreground leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-bold text-lg sm:text-xl text-primary shrink-0">
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
                    {item.tags.map((tag: string, tIdx: number) => (
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
                    href={item.type === "salon" ? `/salons/${item.entityId}` : `/professionals/${item.entityId}`}
                    className="w-full block text-center bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-sm font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    View & Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-accent/60 border border-border rounded-2xl p-12 text-center text-muted-foreground space-y-2">
          <p className="text-lg font-bold text-foreground">No saved {activeTab} yet.</p>
          <p className="text-xs">Browse professionals and click the heart icon to save them to your favorites.</p>
        </div>
      )}
    </div>
  );
}