"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";

export default function ProfessionalsTab() {
  const [sortOption, setSortOption] = useState("Highest Rated");
  const sortOptions = [
    { value: "Recommended", label: "Recommended" },
    { value: "Highest Rated", label: "Highest Rated" },
    { value: "Distance", label: "Distance" },
    { value: "Price: Low to High", label: "Price: Low to High" },
  ];

  const professionals = [
    { id: 1, name: "Noir Salon & Suites", category: "Hair & Styling", rating: 4.9, reviews: 142, location: "Soho, New York", price: "from $65", badge: "Open until 9:00 PM", tags: ["Haircut", "Balayage", "Blowout"], img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Maya Chen Color Studio", category: "Master Colorist", rating: 4.9, reviews: 184, location: "Beverly Hills, Los Angeles", price: "from $95", badge: "Top Rated", tags: ["Balayage", "Toning", "Highlights"], img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Luxe Nail Bar", category: "Nail Care & Gel Art", rating: 4.8, reviews: 115, location: "West Village, New York", price: "from $45", badge: "Open until 9:00 PM", tags: ["Manicure", "Pedicure", "Nail Art"], img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "The Fold Grooming Co.", category: "Barbershop & Fade", rating: 4.9, reviews: 260, location: "Tribeca, New York", price: "from $55", badge: "Open until 9:00 PM", tags: ["Beard Trim", "Hot Towel", "Fade"], img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Glow MedSpa & Lash Lounge", category: "Skincare & Lashes", rating: 4.8, reviews: 98, location: "Miami Beach, Florida", price: "from $75", badge: "Open until 8:00 PM", tags: ["Facials", "Lash Lift", "Brow Art"], img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Avenue Hair Collective", category: "Full-Service Salon", rating: 4.9, reviews: 196, location: "Downtown Chicago, Illinois", price: "from $80", badge: "Verified Salon", tags: ["Haircut", "Highlights", "Treatments"], img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted-foreground">{professionals.length} professionals near you</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Sort:</span>
          <Combobox
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            triggerClassName="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full px-4 py-1.5 text-xs shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between text-card-foreground"
          >
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${pro.img}')` }}
              />
              <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-foreground border border-border/50">
                {pro.badge}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {pro.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{pro.category}</p>
                  </div>
                  <span className="font-title text-xs font-bold text-primary">{pro.price}</span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="font-bold text-foreground">{pro.rating}</span>
                  <span className="text-muted-foreground">({pro.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{pro.location}</span>
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl shadow-xs transition-colors block mt-2"
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
