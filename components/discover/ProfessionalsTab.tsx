"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Star, MapPin, Building2, User, Calendar, X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { useGetAllProfessionalQuery } from "@/features/profesional/profesionalApi";
import ChairImage from "@/components/shared/ChairImage";

export default function ProfessionalsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || searchParams.get("q") || "";
  const latitude = searchParams.get("latitude") || "";
  const longitude = searchParams.get("longitude") || "";
  const locationName = searchParams.get("location") || searchParams.get("loc") || "";

  const queryParams: Record<string, string> = {};
  if (searchTerm) queryParams.searchTerm = searchTerm;
  if (latitude) queryParams.latitude = latitude;
  if (longitude) queryParams.longitude = longitude;

  const [sortOption, setSortOption] = useState("Highest Rated");
  const sortOptions = [
    { value: "Recommended", label: "Recommended" },
    { value: "Highest Rated", label: "Highest Rated" },
    { value: "Distance", label: "Distance" },
  ];

  const { data: professionalsRes, isLoading } = useGetAllProfessionalQuery(queryParams);

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.delete("q");
    params.delete("latitude");
    params.delete("longitude");
    params.delete("location");
    params.delete("loc");
    router.push(`/discover?${params.toString()}`, { scroll: false });
  };

  const rawData = Array.isArray(professionalsRes?.data) ? professionalsRes.data : [];

  const isValidImage = (url: any) =>
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.includes("example.com");

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Verified Beauty & Grooming Specialists</h3>
          <p className="text-xs text-muted-foreground">{rawData.length} specialists available</p>

          {(searchTerm || locationName) && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {searchTerm && (
                <span className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Term: "{searchTerm}"
                </span>
              )}
              {locationName && (
                <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Loc: {locationName}
                </span>
              )}
              <button
                type="button"
                onClick={clearSearch}
                className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-0.5 ml-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Sort:</span>
          <Combobox
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            triggerClassName="bg-card border border-border text-foreground hover:border-primary/60 hover:bg-accent/50 font-semibold rounded-full px-3.5 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-card rounded-2xl h-80 border border-border animate-pulse" />
          ))}
        </div>
      ) : rawData.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center border border-border space-y-3">
          <User className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-base font-bold text-foreground">No Professionals Found</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            No active professional specialists were returned from the server.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {rawData.map((item: any, idx: number) => {
            const pro = item.professional || {};
            const roleRef = pro.roleRef || {};
            const salon = item.salon || {};

            const proId = pro._id || item._id;
            const cardKey = item._id || `${proId}-${idx}`;
            const fullName =
              `${pro.firstName || ""} ${pro.lastName || ""}`.trim() ||
              "Professional Specialist";

            const salonMainImg =
              [salon.photos?.[0], salon.photos?.[1], salon.logo].find(isValidImage) ||
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";

            const proAvatarImg =
              [pro.image, roleRef.photos?.[0]].find(isValidImage) ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

            const locationText =
              salon.address?.city || pro.address?.city
                ? `${salon.address?.city || pro.address?.city}${salon.address?.state || pro.address?.state
                  ? ", " + (salon.address?.state || pro.address?.state)
                  : ""
                }`
                : "Dhaka, Bangladesh";

            const badgeText = pro.isSalonOwner
              ? "Salon Owner & Pro"
              : roleRef.isVerified
                ? "Verified Pro"
                : "Specialist";

            const startingPrice = roleRef.startingPriceInUSD || 35;
            const roleTitle = roleRef.title || pro.role || "Beauty & Grooming Specialist";
            const rating = roleRef.avgRating || salon.avgRating || 5.0;
            const reviewsCount = roleRef.totalReviews || salon.totalReviews || 0;

            const startDateStr = formatDate(item.startDate);
            const endDateStr = formatDate(item.endDate);
            const dateRangeText = startDateStr && endDateStr ? `${startDateStr} – ${endDateStr}` : null;

            return (
              <div
                key={cardKey}
                className="bg-card rounded-2xl overflow-hidden border border-border/70 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between text-card-foreground hover:-translate-y-1"
              >
                {/* Salon Cover Header */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-muted">
                  <Link href={`/salons/${salon._id || ''}`} className="block w-full h-full">
                    <ChairImage
                      src={salonMainImg}
                      alt={salon.name || "Salon cover"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
                  </Link>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {badgeText}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Pro Avatar + Info Column (Title -> Role -> Salon Name -> Price -> Location -> Rating) */}
                    <div className="flex items-start gap-3">
                      <Link href={`/professionals/${proId}`} className="shrink-0 block mt-0.5">
                        <div className="w-12 h-12 rounded-xl border-2 border-[#D99722]/60 overflow-hidden bg-muted shadow-sm">
                          <ChairImage
                            src={proAvatarImg}
                            alt={fullName}
                            className="w-full h-full object-cover"
                            size="sm"
                            fallbackIcon={<User className="w-4 h-4 text-[#D99722]" />}
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0 space-y-1">
                        {/* 1. Title (Name) */}
                        <Link
                          href={`/professionals/${proId}`}
                          className="text-sm sm:text-base font-bold text-foreground hover:text-[#D99722] transition-colors block truncate"
                        >
                          {fullName}
                        </Link>

                        {/* 3. Salon Name */}
                        {salon.name && (
                          <Link
                            href={`/salons/${salon._id || ''}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#D99722] hover:underline font-semibold max-w-full"
                          >
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{salon.name}</span>
                          </Link>
                        )}

                        {/* 4. Price start from */}
                        <div className="text-xs font-semibold text-foreground">
                          <span className="text-muted-foreground font-normal">Starting from </span>
                          <span className="text-[#D99722] font-bold">${startingPrice}</span>
                        </div>

                        {/* 5. Location */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                          <span className="truncate">{locationText}</span>
                        </div>

                        {/* 6. Rating */}
                        <div className="flex items-center gap-1 text-xs pt-0.5">
                          <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722] shrink-0" />
                          <span className="font-bold text-foreground">{rating}</span>
                          <span className="text-muted-foreground text-[11px]">({reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Full Width Available Date */}
                    {dateRangeText && (
                      <div className="w-full flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl font-medium">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate">Available: {dateRangeText}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                    <Link
                      href={`/professionals/${proId}`}
                      className="flex-1 text-center py-2 bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold rounded-xl border border-border/60 transition-colors block"
                    >
                      View Profile
                    </Link>

                    <Link
                      href={`/book/1?proId=${proId}`}
                      className="flex-1 text-center py-2 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 block"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
