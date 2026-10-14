"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, Search, MapPin, Star, X } from "lucide-react";
import Image from "next/image";
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
      {/* Top Hero Section */}
      <section className="bg-[#1E1C1A] text-white pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D99722]" />
              <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
                VERIFIED SALONS & BOUTIQUES
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
              Discover Top-Rated <br />
              <span className="font-light italic text-[#CAA054]">Beauty Salons & Studios</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
              Explore luxury salons, hair studios, and grooming spaces near you with instant booking and verified reviews.
            </p>
          </div>

          {/* Search Box (Full Width Location + Search Button) */}
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
                {filteredSalons.map((salon: any) => (
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
