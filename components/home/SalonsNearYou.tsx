"use client";

import Link from "next/link";
import { ArrowRight, Star, MapPin, Building2 } from "lucide-react";
import { useGetAllSalonsQuery } from "@/features/salon/salonApi";
import ChairImage from "@/components/shared/ChairImage";

export default function SalonsNearYou() {
  const { data: salonsRes, isLoading } = useGetAllSalonsQuery({});

  const isValidImage = (url: any) =>
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.includes("example.com");

  const rawApiSalons = Array.isArray(salonsRes?.data) ? salonsRes.data : [];
  const mappedSalons = rawApiSalons.map((item: any) => {
    const coverImg =
      [item.photos?.[0], item.photos?.[1], item.logo].find(isValidImage) || "";

    const logoImg =
      [item.logo, item.createdBy?.image].find(isValidImage) || "";

    const locationStr = item.address
      ? `${item.address.city || ""}${item.address.state ? ", " + item.address.state : ""}`.trim() || item.address.line1 || "Dhaka, Bangladesh"
      : "Dhaka, Bangladesh";

    return {
      id: item._id,
      name: item.name || "Beauty Salon",
      salonType: item.businessType || "Hair & Beauty Salon",
      category: item.businessType || "Beauty & Spa",
      rating: item.avgRating || 5.0,
      reviews: item.totalReviews || 0,
      location: locationStr,
      badge: item.status === "active" ? "Open Today" : "Verified",
      coverImg,
      logoImg,
    };
  });

  const displaySalons = mappedSalons.slice(0, 6);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-widest block mb-1">
            DISCOVER SALONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
            Discover Great Salons Near You
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Explore top rated salons, boutique studios, and beauty centers.
          </p>
        </div>
        <Link
          href="/salons"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-md border border-border bg-card text-xs font-semibold text-foreground hover:bg-accent hover:border-[#D99722] transition-all w-full sm:w-auto"
        >
          <span>Browse all salons</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D99722]" />
        </Link>
      </div>

      {/* Salons Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3,4].map((n) => (
            <div key={n} className="bg-card rounded-2xl h-80 border border-border animate-pulse" />
          ))}
        </div>
      ) : displaySalons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displaySalons.map((salon: any) => (
            <div
              key={salon.id}
              className="bg-card rounded-2xl overflow-hidden border border-border/70 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between text-card-foreground hover:-translate-y-1"
            >
              {/* Salon Cover Header */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-muted">
                <Link href={`/salons/${salon.id}`} className="block w-full h-full relative">
                  <ChairImage
                    src={salon.coverImg}
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    size="lg"
                    showLabel
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />
                </Link>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#D99722]" />
                    <span>{salon.salonType}</span>
                  </span>

                  <span className="bg-[#D99722] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {salon.badge}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Salon Logo + Info Column (Name -> Location -> Rating) */}
                  <div className="flex items-start gap-3">
                    <Link href={`/salons/${salon.id}`} className="shrink-0 block mt-0.5">
                      <div className="w-12 h-12 rounded-xl border-2 border-[#D99722]/60 overflow-hidden bg-muted shadow-sm">
                        <ChairImage
                          src={salon.logoImg}
                          alt={salon.name}
                          className="w-full h-full object-cover"
                          size="sm"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      {/* 1. Name */}
                      <Link
                        href={`/salons/${salon.id}`}
                        className="text-sm sm:text-base font-bold text-foreground hover:text-[#D99722] transition-colors block truncate"
                      >
                        {salon.name}
                      </Link>
                      {/* 2. Location */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                        <span className="truncate">{salon.location}</span>
                      </div>

                      {/* 3. Rating (after location) */}
                      <div className="flex items-center gap-1 text-xs pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722] shrink-0" />
                        <span className="font-bold text-foreground">{salon.rating}</span>
                        <span className="text-muted-foreground text-[11px]">({salon.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-border/50">
                  <Link
                    href={`/salons/${salon.id}`}
                    className="w-full text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 block"
                  >
                    Explore Salon & Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-2xl border border-border space-y-2">
          <p className="text-sm font-bold text-foreground">
            No Salons Available
          </p>
          <p className="text-xs text-muted-foreground">No active salons were found at the moment.</p>
        </div>
      )}
    </section>
  );
}
