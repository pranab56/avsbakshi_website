"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GooglePlacesInput, GooglePlaceResult } from "@/components/ui/google-places-input";
import { useGetAllProfessionalQuery } from "@/features/profesional/profesionalApi";
import { useGetAllCategoryQuery } from "@/features/category/category";
import { Search, X, User, Building2, Star, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import ChairImage from "@/components/shared/ChairImage";

function ProfessionalsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const urlSearchTerm = searchParams.get("searchTerm") || searchParams.get("q") || "";
  const urlServiceCategory = searchParams.get("serviceCategory") || searchParams.get("category") || searchParams.get("categoryId") || "";
  const urlLatitude = searchParams.get("latitude") || "";
  const urlLongitude = searchParams.get("longitude") || "";
  const urlLocation = searchParams.get("location") || searchParams.get("loc") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [locationAddress, setLocationAddress] = useState(urlLocation);
  const [latitude, setLatitude] = useState<number | string | null>(urlLatitude || null);
  const [longitude, setLongitude] = useState<number | string | null>(urlLongitude || null);

  const { data: categoriesRes } = useGetAllCategoryQuery({});
  const categoriesList = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const selectedCatObj = categoriesList.find((c: any) => String(c._id || c.id) === String(urlServiceCategory));
  const categoryDisplayName = selectedCatObj?.name || selectedCatObj?.title || urlServiceCategory;

  useEffect(() => {
    setSearchTerm(urlSearchTerm);
    setLocationAddress(urlLocation);
    setLatitude(urlLatitude || null);
    setLongitude(urlLongitude || null);
  }, [urlSearchTerm, urlLocation, urlLatitude, urlLongitude]);

  const queryParams: Record<string, string> = {};
  if (urlSearchTerm) queryParams.searchTerm = urlSearchTerm;
  if (urlServiceCategory) queryParams.serviceCategory = urlServiceCategory;
  if (urlLatitude) queryParams.latitude = urlLatitude;
  if (urlLongitude) queryParams.longitude = urlLongitude;

  // API Query
  const { data: professionalsRes, isLoading } = useGetAllProfessionalQuery(queryParams);

  const handlePlaceSelect = (place: GooglePlaceResult) => {
    setLocationAddress(place.address);
    setLatitude(place.lat);
    setLongitude(place.lng);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (locationAddress.trim()) params.set("location", locationAddress.trim());
    if (latitude) params.set("latitude", String(latitude));
    if (longitude) params.set("longitude", String(longitude));
    if (urlServiceCategory) params.set("serviceCategory", urlServiceCategory);

    router.push(`/professionals?${params.toString()}`);
  };

  const handleSelectCategory = (catId: string) => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (locationAddress.trim()) params.set("location", locationAddress.trim());
    if (latitude) params.set("latitude", String(latitude));
    if (longitude) params.set("longitude", String(longitude));
    if (catId) params.set("serviceCategory", catId);

    const queryStr = params.toString();
    router.push(queryStr ? `/professionals?${queryStr}` : "/professionals", { scroll: false });
  };

  const handleScrollNext = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        categoryScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        categoryScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  const handleScrollPrev = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setLocationAddress("");
    setLatitude(null);
    setLongitude(null);
    router.push("/professionals");
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
    <div className="min-h-screen bg-background text-foreground select-none transition-colors duration-200">
      {/* Top Hero Section */}
      <section className="bg-[#1E1C1A] text-white pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D99722]" />
              <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
                VERIFIED BEAUTY SPECIALISTS
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
              Find Verified Beauty & <br />
              <span className="font-light italic text-[#CAA054]">Grooming Professionals</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
              Book top hairstylists, estheticians, barbers, and nail artists near you with transparent pricing and real portfolio work.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl relative pt-2">
            <div className="bg-white/5 p-2 rounded-2xl border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-center gap-2.5 shadow-xl">
              <div className="w-full flex-1 relative">
                <GooglePlacesInput
                  variant="dark"
                  placeholder="City, area or address..."
                  value={locationAddress}
                  onPlaceSelectAction={handlePlaceSelect}
                  onTextChange={(val) => setLocationAddress(val)}
                  onKeyDown={handleKeyDown}
                  className="!h-11 !rounded-xl"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 h-11 bg-[#D99722] hover:bg-[#C2841B] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Category Carousel Pills Bar */}
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={handleScrollPrev}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 transition-all cursor-pointer shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex-1 flex items-center gap-2.5 overflow-x-auto scrollbar-none scroll-smooth py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              onClick={() => handleSelectCategory("")}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${!urlServiceCategory
                ? "bg-[#D99722] text-white border-[#D99722] shadow-sm"
                : "bg-card hover:bg-accent text-foreground border-border/60"
                }`}
            >
              All Categories
            </button>

            {categoriesList.map((cat: any) => {
              const catId = String(cat._id || cat.id);
              const catName = cat.name || cat.title || "Category";
              const isActive = String(urlServiceCategory) === catId;

              return (
                <button
                  key={catId}
                  type="button"
                  onClick={() => handleSelectCategory(catId)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${isActive
                    ? "bg-[#D99722] text-white border-[#D99722] shadow-sm"
                    : "bg-card hover:bg-accent text-foreground border-border/60"
                    }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleScrollNext}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 transition-all cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-foreground">Verified Beauty & Grooming Specialists</h3>
            <p className="text-xs text-muted-foreground">{rawData.length} specialists available</p>
            {(urlSearchTerm || urlServiceCategory || urlLocation) && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {urlSearchTerm && (
                  <span className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Term: "{urlSearchTerm}"

                  </span>
                )}
                {urlServiceCategory && (
                  <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Category: {categoryDisplayName}
                  </span>
                )}
                {urlLocation && (
                  <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Loc: {urlLocation}
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

        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3,4].map((n) => (
              <div key={n} className="bg-card rounded-2xl h-80 border border-border animate-pulse" />
            ))}
          </div>
        ) : rawData.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center border border-border space-y-3">
            <User className="w-10 h-10 text-muted-foreground mx-auto" />
            <h4 className="text-base font-bold text-foreground">No Professionals Found</h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              No active professional specialists were returned from the server. Try clearing your search parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              const specialtiesList = Array.isArray(roleRef.specialties) ? roleRef.specialties : [];

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
                          <div className="w-12 h-12 rounded-full border-2 border-[#D99722]/60 overflow-hidden bg-muted shadow-sm">
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

                          {/* 2. Role */}
                          <p className="text-xs font-medium text-muted-foreground truncate capitalize">
                            {roleTitle}
                          </p>

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
      </section>
    </div>
  );
}

export default function ProfessionalsPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Professionals...</div>}>
      <ProfessionalsContent />
    </Suspense>
  );
}
