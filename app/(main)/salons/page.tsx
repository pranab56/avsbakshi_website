"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, Search, MapPin, Star, X, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import ChairImage from "@/components/shared/ChairImage";
import Link from "next/link";
import { GooglePlacesInput, GooglePlaceResult } from "@/components/ui/google-places-input";
import { useGetAllSalonsQuery } from "@/features/salon/salonApi";

function SalonsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearchTerm = searchParams.get("searchTerm") || searchParams.get("q") || "";
  const urlLatitude = searchParams.get("latitude") || "";
  const urlLongitude = searchParams.get("longitude") || "";
  const urlLocation = searchParams.get("location") || searchParams.get("loc") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [locationAddress, setLocationAddress] = useState(urlLocation);
  const [latitude, setLatitude] = useState<number | string | null>(urlLatitude || null);
  const [longitude, setLongitude] = useState<number | string | null>(urlLongitude || null);

  useEffect(() => {
    setSearchTerm(urlSearchTerm);
    setLocationAddress(urlLocation);
    setLatitude(urlLatitude || null);
    setLongitude(urlLongitude || null);
  }, [urlSearchTerm, urlLocation, urlLatitude, urlLongitude]);

  const queryParams: Record<string, string> = {};
  if (urlSearchTerm) queryParams.searchTerm = urlSearchTerm;
  if (urlLatitude) queryParams.latitude = urlLatitude;
  if (urlLongitude) queryParams.longitude = urlLongitude;

  // API Queries
  const { data: salonsRes, isLoading: isSalonsLoading } = useGetAllSalonsQuery(queryParams);

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

    router.push(`/salons?${params.toString()}`);
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
    router.push("/salons");
  };

  const isValidImage = (url: any) =>
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.includes("example.com");

  // Map Salons Data
  const rawApiSalons = Array.isArray(salonsRes?.data) ? salonsRes.data : [];
  const mappedSalons = rawApiSalons.map((item: any) => {
    const coverImg =
      [item.photos?.[0], item.photos?.[1], item.logo].find(isValidImage) || "";

    const logoImg =
      [item.logo, item.createdBy?.image].find(isValidImage) || "";

    const ownerName = item.createdBy
      ? `${item.createdBy.firstName || ""} ${item.createdBy.lastName || ""}`.trim()
      : null;

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
      ownerName,
      description: item.description || "Full-service salon providing premium beauty, grooming, and styling services.",
      tags: [item.businessType || "Beauty", item.address?.city || "Salon"],
    };
  });

  const filteredSalons = mappedSalons;

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
                src="/images/cards/businesses.jpg"
                alt="The Cloud Salon Luxury Salons & Studios"
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
            <span className="text-foreground font-semibold">Salons</span>
          </div>

          <div className="max-w-2xl space-y-4">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              <span className="w-7 h-[2px] bg-[#D99722] inline-block" />
              <span>VERIFIED SALONS &amp; BOUTIQUES</span>
            </div>

            {/* Headline */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-[#1C1C1E] dark:text-white">
              Discover top salons. <br />
              <span className="text-[#D99722]">Elevate your experience.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-normal max-w-xl leading-relaxed">
              Explore luxury salons, hair studios, and grooming spaces near you with instant booking and verified reviews.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-8 pt-2 max-w-3xl">
            <div className="bg-card border border-border shadow-xl rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Salon Name / Keyword Search */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-accent/40 rounded-xl border border-border/50 focus-within:border-[#D99722] focus-within:bg-background transition-all">
                <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Salon name or business..."
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

              {/* Action Button: Find Salons */}
              <button
                type="button"
                onClick={handleSearch}
                className="px-7 py-3 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <span>Find Salons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D99722] text-white shadow-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Salons ({mappedSalons.length})</span>
              </div>
            </div>

            {(urlSearchTerm || urlLocation) && (
              <div className="flex flex-wrap items-center gap-2">
                {urlSearchTerm && (
                  <span className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Term: "{urlSearchTerm}"
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

        {/* SALONS LIST VIEW */}
        <div className="space-y-4">
          {isSalonsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-card rounded-2xl h-80 border border-border animate-pulse" />
              ))}
            </div>
          ) : filteredSalons.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center border border-border space-y-3">
              <Building2 className="w-10 h-10 text-muted-foreground mx-auto" />
              <h4 className="text-base font-bold text-foreground">No Salons Found</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No active salons were found matching your query. Try clearing your search parameters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSalons?.reverse()?.map((salon: any) => (
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
          )}
        </div>
      </section>
    </div>
  );
}

export default function SalonsPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Salons...</div>}>
      <SalonsContent />
    </Suspense>
  );
}
