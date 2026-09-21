"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, MapPin, Building2 } from "lucide-react";
import { SALON_TYPES, getSalonsData } from "@/lib/data/marketplaceData";

export default function SalonsNearYou() {
  const [selectedTypeSlug, setSelectedTypeSlug] = useState<string>("all");

  const filteredSalons = getSalonsData(selectedTypeSlug);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#D99722] uppercase tracking-widest block mb-1">
            DISCOVER SALONS BY TYPE
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
            Discover Great Salons Near You
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Explore salons by specialty: Hair Salons, Nail Salons, Barber Shops, Spa & MedSpa studios
          </p>
        </div>
        <Link
          href="/discover?tab=salons"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-md border border-border bg-card text-xs font-semibold text-foreground hover:bg-accent hover:border-[#D99722] transition-all w-full sm:w-auto"
        >
          <span>Browse all salons</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D99722]" />
        </Link>
      </div>

      {/* Salon Categories / Types Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 max-w-full scrollbar-none">
        {SALON_TYPES.map((typeObj) => (
          <button
            key={typeObj.id}
            type="button"
            onClick={() => setSelectedTypeSlug(typeObj.slug)}
            className={`px-4 py-2 text-xs rounded-lg font-semibold transition-all cursor-pointer border shrink-0 ${
              selectedTypeSlug === typeObj.slug
                ? "bg-[#D99722] text-white border-[#D99722] shadow-sm"
                : "bg-accent/60 text-foreground hover:bg-muted border-border/60"
            }`}
          >
            {typeObj.name}
          </button>
        ))}
      </div>

      {/* Salons Grid */}
      {filteredSalons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {filteredSalons.map((salon) => (
            <div
              key={salon.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${salon.img}')` }}
                />
                
                {/* Salon Category/Type Badge */}
                <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-md text-foreground border border-border/50 shadow-sm flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#D99722]" />
                  <span>{salon.salonType}</span>
                </span>

                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[10px] font-medium px-2.5 py-1 rounded-full text-white border border-white/20">
                  {salon.badge}
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-[#D99722] transition-colors">
                        {salon.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{salon.category}</p>
                    </div>
                    <span className="text-xs font-bold text-[#D99722] shrink-0 ml-2">{salon.price}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722]" />
                    <span className="font-bold text-foreground">{salon.rating}</span>
                    <span className="text-muted-foreground">({salon.reviews})</span>
                    <span className="mx-1">•</span>
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{salon.location}</span>
                  </div>

                  {/* Salon Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {salon.tags.map((tag, idx) => (
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
                  href="/professionals/1"
                  className="w-full text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors block mt-2"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-sm font-medium text-muted-foreground">
            No salons found under this type filter. Showing all available salons soon.
          </p>
          <button
            type="button"
            onClick={() => setSelectedTypeSlug("all")}
            className="mt-3 px-4 py-2 bg-[#D99722] text-white text-xs font-semibold rounded-md"
          >
            View All Salons
          </button>
        </div>
      )}
    </section>
  );
}
