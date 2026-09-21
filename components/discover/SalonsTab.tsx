"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Building2 } from "lucide-react";
import { SALON_TYPES, getSalonsData } from "@/lib/data/marketplaceData";

export default function SalonsTab() {
  const [selectedTypeSlug, setSelectedTypeSlug] = useState<string>("all");

  const filteredSalons = getSalonsData(selectedTypeSlug);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Salon Categories Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-xl border border-border">
        <div>
          <h3 className="text-sm font-bold text-foreground">Discover Salons by Type / Category</h3>
          <p className="text-xs text-muted-foreground">{filteredSalons.length} featured salons available</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          {SALON_TYPES.map((typeObj) => (
            <button
              key={typeObj.id}
              type="button"
              onClick={() => setSelectedTypeSlug(typeObj.slug)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-semibold transition-all cursor-pointer border shrink-0 ${
                selectedTypeSlug === typeObj.slug
                  ? "bg-[#D99722] text-white border-[#D99722] shadow-sm"
                  : "bg-accent/70 text-foreground hover:bg-muted border-border/50"
              }`}
            >
              {typeObj.name}
            </button>
          ))}
        </div>
      </div>

      {/* Salons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSalons.map((salon) => (
          <div
            key={salon.id}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${salon.img}')` }}
              />
              
              {/* Category/Type Badge */}
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
                  <span className="text-muted-foreground/70">({salon.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-muted-foreground/70" />
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
                className="w-full text-center py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors block mt-2"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
