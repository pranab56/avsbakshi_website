"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Building2,
  Armchair,
  Calendar,
  DollarSign,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { SALON_TYPES } from "@/lib/data/marketplaceData";
import { useGetAllSalonsQuery } from "@/features/salon/salonApi";
import { useGetAllChairRentalsQuery } from "@/features/chairRental/chairRentalApi";

export default function SalonsTab() {
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

  const [selectedTypeSlug, setSelectedTypeSlug] = useState<string>("all");
  const [viewTab, setViewTab] = useState<"salons" | "chairs">("salons");

  // API Queries
  const { data: salonsRes, isLoading: isSalonsLoading } = useGetAllSalonsQuery(queryParams);
  const { data: chairRentalsRes, isLoading: isChairsLoading } = useGetAllChairRentalsQuery({ page: 1 });

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

  // Map Salons Data
  const rawApiSalons = Array.isArray(salonsRes?.data) ? salonsRes.data : [];
  const mappedSalons = rawApiSalons.map((item: any) => ({
    id: item._id,
    name: item.name,
    salonType: item.businessType || "Hair & Beauty Salon",
    category: item.businessType || "Beauty & Spa",
    rating: item.avgRating || 5.0,
    reviews: item.totalReviews || 0,
    location: item.address
      ? `${item.address.line1 ? item.address.line1 + ", " : ""}${item.address.city || ""}`
      : "Dhaka, Bangladesh",
    city: item.address?.city || "Dhaka",
    price: "from $50",
    badge: item.status === "active" ? "Open Today" : "Verified",
    tags: [item.businessType || "Beauty", item.address?.city || "Salon"],
    img:
      item.photos?.[0] ||
      item.photos?.[1] ||
      item.logo ||
      "",
    description: item.description,
    phone: item.phone,
    email: item.email,
  }));

  const filteredSalons =
    selectedTypeSlug === "all"
      ? mappedSalons
      : mappedSalons.filter(
        (s: any) =>
          s.salonType?.toLowerCase().includes(selectedTypeSlug.toLowerCase()) ||
          selectedTypeSlug === "all"
      );

  // Map Chair Rentals Data
  const rawChairRentals = Array.isArray(chairRentalsRes?.data) ? chairRentalsRes.data : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Tab Switcher: Salons vs Chair Rentals */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewTab("salons")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${viewTab === "salons"
                ? "bg-[#D99722] text-white shadow-sm"
                : "bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Salons ({mappedSalons.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab("chairs")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${viewTab === "chairs"
                ? "bg-[#D99722] text-white shadow-sm"
                : "bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              <Armchair className="w-4 h-4" />
              <span>Work Space ({rawChairRentals.length})</span>
            </button>
          </div>

          {(searchTerm || locationName) && (
            <div className="flex flex-wrap items-center gap-2">
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

        {viewTab === "salons" && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full">
            {SALON_TYPES.map((typeObj) => (
              <button
                key={typeObj.id}
                type="button"
                onClick={() => setSelectedTypeSlug(typeObj.slug)}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all cursor-pointer border shrink-0 ${selectedTypeSlug === typeObj.slug
                  ? "bg-[#D99722] text-white border-[#D99722]"
                  : "bg-accent/40 text-muted-foreground hover:text-foreground border-border/50"
                  }`}
              >
                {typeObj.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: SALONS LIST */}
      {viewTab === "salons" && (
        <div className="space-y-4">
          {isSalonsLoading ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-card rounded-2xl h-80 border border-border animate-pulse"
                />
              ))}
            </div>
          ) : filteredSalons.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center border border-border space-y-3">
              <Building2 className="w-10 h-10 text-muted-foreground mx-auto" />
              <h4 className="text-base font-bold text-foreground">No Salons Found</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No salons are currently listed under this category. Please check back soon or try selecting "All".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
              {filteredSalons.map((salon: any) => (
                <div
                  key={salon.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <ChairImage
                      src={salon.img}
                      alt={salon.name}
                      size="lg"
                      showLabel
                      className="group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Type Badge */}
                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-md text-foreground border border-border/50 shadow-sm flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#D99722]" />
                      <span>{salon.salonType}</span>
                    </span>

                    <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-white border border-white/20">
                      {salon.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/salons/${salon.id}`}
                            className="text-base font-bold text-foreground hover:text-[#D99722] transition-colors block"
                          >
                            {salon.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">{salon.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722]" />
                        <span className="font-bold text-foreground">{salon.rating}</span>
                        <span className="text-muted-foreground/70">({salon.reviews})</span>
                        <span className="mx-1">•</span>
                        <MapPin className="w-3 h-3 text-muted-foreground/70" />
                        <span className="text-muted-foreground truncate">{salon.location}</span>
                      </div>

                      {/* Salon Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {salon.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-accent/80 text-foreground text-[10px] px-2 py-0.5 rounded-md border border-border/40 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/salons/${salon.id}`}
                      className="w-full text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors block mt-2"
                    >
                      Explore Salon & Team
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CHAIR RENTALS LIST */}
      {viewTab === "chairs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Armchair className="w-4 h-4 text-[#D99722]" />
              <span>Available Work Spaces & Booths</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              Direct API integration (`useGetAllChairRentalsQuery`)
            </span>
          </div>

          {isChairsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-card rounded-2xl h-72 border border-border animate-pulse"
                />
              ))}
            </div>
          ) : rawChairRentals.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center border border-border space-y-3">
              <Armchair className="w-10 h-10 text-muted-foreground mx-auto" />
              <h4 className="text-base font-bold text-foreground">No Work Spaces Listed</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No active workspace rental offers were found in the database.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rawChairRentals.map((rental: any) => {
                const chair = rental.chair || {};
                const salon = rental.salon || {};
                const professional = rental.professional || {};
                const price = chair.pricePerDayInUSD || rental.pricing?.total || 0;
                const chairPhoto =
                  chair.photo ||
                  salon.logo ||
                  "";

                return (
                  <div
                    key={rental._id}
                    className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    {/* Chair Photo */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <ChairImage
                        src={chairPhoto}
                        alt={chair.name || "Salon Chair"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        showLabel
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-md text-foreground border border-border/50 flex items-center gap-1">
                        <Armchair className="w-3 h-3 text-[#D99722]" />
                        <span>{chair.uid || rental.uid || "CHAIR"}</span>
                      </span>

                      <span className="absolute top-3 right-3 bg-emerald-500/90 text-white backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {rental.status || chair.status || "Active"}
                      </span>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-[#D99722] uppercase tracking-wider block">
                          {salon.name || "Salon Station"}
                        </span>
                        <h4 className="text-base font-bold truncate">
                          {chair.name || "Salon Styling Station"}
                        </h4>
                      </div>
                    </div>

                    {/* Chair Content */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D99722]" />
                            <span className="truncate max-w-[170px]">
                              {chair.location || "Ground Floor Main Station"}
                            </span>
                          </span>
                          <span className="text-base font-extrabold text-[#D99722]">
                            ${price}
                            <span className="text-[10px] font-normal text-muted-foreground">/day</span>
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {chair.description ||
                            "Comfortable and fully-equipped salon station with mirror, lighting, and shared facilities."}
                        </p>

                        {/* Rented / Booked By Info if present */}
                        {professional.firstName && (
                          <div className="p-2.5 rounded-xl bg-accent/50 border border-border/50 flex items-center gap-2 text-xs">
                            <User className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="text-muted-foreground text-[11px]">
                              Booked by:{" "}
                              <strong className="text-foreground font-semibold">
                                {professional.firstName} {professional.lastName || ""}
                              </strong>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="pt-3 border-t border-border/50 flex items-center gap-2">
                        {salon._id && (
                          <Link
                            href={`/salons/${salon._id}`}
                            className="flex-1 text-center py-2.5 bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold rounded-xl border border-border transition-colors block"
                          >
                            Salon Details
                          </Link>
                        )}
                        <Link
                          href={`/salons/${salon._id || "1"}`}
                          className="flex-1 text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors block"
                        >
                          Rent Station
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
