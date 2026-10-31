"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GooglePlacesInput, GooglePlaceResult } from "@/components/ui/google-places-input";
import { useGetAllProfessionalQuery } from "@/features/profesional/profesionalApi";
import { useGetAllCategoryQuery } from "@/features/category/category";
import {
  Search,
  X,
  User,
  Building2,
  Star,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
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
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground select-none transition-colors duration-200">
      {/* =========================================================================
          FIGMA HERO SECTION (Matching Home & Services Page Arched Frame)
      ========================================================================= */}
      <section className="w-full relative bg-white dark:bg-[#121214] border-b border-border/40 overflow-hidden transition-colors duration-200">
        {/* Subtle Animated Ambient Glow in Background */}
        <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* Desktop Golden Arc Frame Pinned to Viewport Right-0 */}
        <div className="hidden lg:flex absolute inset-y-0 -top-[6px] -bottom-[6px] right-0 w-[calc(48vw)] xl:w-[calc(50vw)] rounded-l-full border-l-[22px] xl:border-l-[26px] border-t-[3.5px] border-b-[3.5px] border-[#D99722] shadow-2xl overflow-hidden bg-[#121110] items-stretch z-0">
          <div className="w-full relative overflow-hidden h-full">
            <motion.div
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/cards/professionals.jpg"
                alt="The Cloud Salon Top Professionals & Specialists"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Hero Left Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-14 lg:py-16 min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] xl:min-h-[500px] flex flex-col justify-center">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Professionals</span>
          </div>

          <div className="max-w-2xl space-y-4">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              <span className="w-7 h-[2px] bg-[#D99722] inline-block" />
              <span>VERIFIED BEAUTY &amp; GROOMING SPECIALISTS</span>
            </div>

            {/* Headline */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-[#1C1C1E] dark:text-white">
              Discover top talent. <br />
              <span className="text-[#D99722]">Book your specialist.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-normal max-w-xl leading-relaxed">
              Connect with vetted hairstylists, estheticians, barbers, and nail artists with transparent starting rates and verified client portfolios.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-8 pt-2 max-w-3xl">
            <div className="bg-card border border-border shadow-xl rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Specialist / Keyword Search */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-accent/40 rounded-xl border border-border/50 focus-within:border-[#D99722] focus-within:bg-background transition-all">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Specialist name or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Location Input */}
              <div className="flex-1">
                <GooglePlacesInput
                  placeholder="City, area or address..."
                  value={locationAddress}
                  onPlaceSelectAction={handlePlaceSelect}
                  onTextChange={(val) => setLocationAddress(val)}
                  onKeyDown={handleKeyDown}
                  className="!h-11 !rounded-xl text-xs sm:text-sm"
                />
              </div>

              {/* Action Button: Find Specialists */}
              <button
                type="button"
                onClick={handleSearch}
                className="px-7 py-3 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <span>Find Specialists</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Category Carousel Pills Bar */}
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={handleScrollPrev}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 transition-all cursor-pointer shadow-xs"
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
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                !urlServiceCategory
                  ? "bg-[#D99722] text-white border-[#D99722] shadow-md shadow-[#D99722]/20 scale-102"
                  : "bg-card hover:bg-accent text-foreground border-border/80"
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
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? "bg-[#D99722] text-white border-[#D99722] shadow-md shadow-[#D99722]/20 scale-102"
                      : "bg-card hover:bg-accent text-foreground border-border/80"
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
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 transition-all cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 rounded-2xl border border-border shadow-xs">
          <div>
            <h3 className="text-base font-bold text-foreground">Verified Beauty &amp; Grooming Specialists</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{rawData.length} active professionals ready for booking</p>
            {(urlSearchTerm || urlServiceCategory || urlLocation) && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {urlSearchTerm && (
                  <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    Search: &ldquo;{urlSearchTerm}&rdquo;
                  </span>
                )}
                {urlServiceCategory && (
                  <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    Category: {categoryDisplayName}
                  </span>
                )}
                {urlLocation && (
                  <span className="bg-[#D99722]/10 text-[#D99722] border border-[#D99722]/20 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    Location: {urlLocation}
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1 ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-card rounded-2xl h-96 border border-border animate-pulse" />
            ))}
          </div>
        ) : rawData.length === 0 ? (
          <div className="bg-card rounded-3xl p-16 text-center border border-border space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#D99722]/15 text-[#D99722] flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-foreground">No Specialists Found</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We couldn&apos;t find any beauty professionals matching your criteria. Try adjusting your location or clearing filters.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="px-6 py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Clear All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rawData.map((item: any, idx: number) => {
              const pro = item.professional || {};
              const roleRef = pro.roleRef || {};
              const salon = item.salon || {};

              const proId = pro._id || item._id;
              const cardKey = item._id || `${proId}-${idx}`;
              const fullName =
                `${pro.firstName || ""} ${pro.lastName || ""}`.trim() ||
                "Beauty Specialist";

              const salonMainImg =
                [salon.photos?.[0], salon.photos?.[1], salon.logo].find(isValidImage) ||
                "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";

              const proAvatarImg =
                [pro.image, roleRef.photos?.[0]].find(isValidImage) ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

              const locationText =
                salon.address?.city || pro.address?.city
                  ? `${salon.address?.city || pro.address?.city}${
                      salon.address?.state || pro.address?.state
                        ? ", " + (salon.address?.state || pro.address?.state)
                        : ""
                    }`
                  : "New York, USA";

              const badgeText = pro.isSalonOwner
                ? "Salon Owner & Pro"
                : roleRef.isVerified
                ? "Verified Specialist"
                : "Professional";

              const startingPrice = roleRef.startingPriceInUSD || 35;
              const rating = roleRef.avgRating || salon.avgRating || 5.0;
              const reviewsCount = roleRef.totalReviews || salon.totalReviews || 0;

              const startDateStr = formatDate(item.startDate);
              const endDateStr = formatDate(item.endDate);
              const dateRangeText = startDateStr && endDateStr ? `${startDateStr} – ${endDateStr}` : null;

              return (
                <div
                  key={cardKey}
                  className="bg-card rounded-2xl overflow-hidden border border-border/80 shadow-xs hover:shadow-2xl hover:border-[#D99722]/40 transition-all duration-300 group flex flex-col justify-between text-card-foreground hover:-translate-y-1.5"
                >
                  {/* Salon Cover Header */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Link href={`/salons/${salon._id || ''}`} className="block w-full h-full">
                      <ChairImage
                        src={salonMainImg}
                        alt={salon.name || "Salon Workspace"}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
                    </Link>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="bg-black/70 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-[#D99722]" />
                        <span>{badgeText}</span>
                      </span>

                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        <Star className="w-3 h-3 fill-[#D99722] text-[#D99722]" />
                        <span>{rating}</span>
                        {reviewsCount > 0 && <span className="text-zinc-400 font-normal">({reviewsCount})</span>}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Pro Avatar + Info */}
                      <div className="flex items-start gap-3">
                        <Link href={`/professionals/${proId}`} className="shrink-0 block mt-0.5">
                          <div className="w-12 h-12 rounded-2xl border-2 border-[#D99722] overflow-hidden bg-muted shadow-sm transition-transform group-hover:scale-105">
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
                          <Link
                            href={`/professionals/${proId}`}
                            className="text-base font-bold text-foreground hover:text-[#D99722] transition-colors block truncate"
                          >
                            {fullName}
                          </Link>

                          {salon.name && (
                            <Link
                              href={`/salons/${salon._id || ''}`}
                              className="inline-flex items-center gap-1.5 text-xs text-[#D99722] hover:underline font-semibold max-w-full"
                            >
                              <Building2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{salon.name}</span>
                            </Link>
                          )}

                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate">{locationText}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div className="flex items-center justify-between text-xs pt-1 px-3 py-2 rounded-xl bg-accent/40 border border-border/50">
                        <span className="text-muted-foreground font-medium">Starting Rate</span>
                        <span className="text-sm font-extrabold text-[#D99722]">
                          ${startingPrice}
                        </span>
                      </div>

                      {/* Full Width Available Date */}
                      {dateRangeText && (
                        <div className="w-full flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl font-medium">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Available: {dateRangeText}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2.5">
                      <Link
                        href={`/professionals/${proId}`}
                        className="flex-1 text-center py-2.5 bg-accent hover:bg-accent/80 text-foreground text-xs font-bold rounded-xl border border-border transition-colors block"
                      >
                        View Profile
                      </Link>

                      <Link
                        href={`/book/1?proId=${proId}`}
                        className="flex-1 text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 block"
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
    <Suspense fallback={<div className="text-center py-20 text-muted-foreground">Loading verified professionals...</div>}>
      <ProfessionalsContent />
    </Suspense>
  );
}
