"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Star, MapPin } from "lucide-react";

export default function DiscoverMarketplace() {
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const professionals = [
    {
      id: 1,
      name: "Noir Salon & Suites",
      category: "Hair & Styling",
      rating: 4.9,
      reviews: 142,
      location: "Soho, New York",
      price: "from $65",
      badge: "Open until 9:00 PM",
      tags: ["Haircut", "Balayage", "Blowout"],
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Maya Chen Color Studio",
      category: "Master Colorist",
      rating: 4.9,
      reviews: 184,
      location: "Beverly Hills, Los Angeles",
      price: "from $95",
      badge: "Top Rated",
      tags: ["Balayage", "Toning", "Highlights"],
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Luxe Nail Bar",
      category: "Nails & Gel Art",
      rating: 4.8,
      reviews: 115,
      location: "West Village, New York",
      price: "from $45",
      badge: "Open Today",
      tags: ["Manicure", "Pedicure", "Nail Art"],
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "The Fold Grooming Co.",
      category: "Barbershop & Fade",
      rating: 4.9,
      reviews: 260,
      location: "Tribeca, New York",
      price: "from $55",
      badge: "Popular",
      tags: ["Beard Trim", "Hot Towel", "Fade"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Glow MedSpa & Lash Lounge",
      category: "Skincare & Lashes",
      rating: 4.8,
      reviews: 98,
      location: "Miami Beach, Florida",
      price: "from $75",
      badge: "Open until 8:00 PM",
      tags: ["Facials", "Lash Lift", "Brow Art"],
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Avenue Hair Collective",
      category: "Full-Service Salon",
      rating: 4.9,
      reviews: 196,
      location: "Downtown Chicago, Illinois",
      price: "from $80",
      badge: "Verified Salon",
      tags: ["Haircut", "Highlights", "Treatments"],
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block mb-1">
            DISCOVER
          </span>
          <h2 className="font-title text-2xl sm:text-4xl font-medium">
            Find your perfect beauty experience
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-light">
            A preview of the marketplace. Example profiles shown for illustration.
          </p>
        </div>
        <Link
          href="/discover?tab=professionals"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-accent text-xs font-semibold text-foreground hover:bg-muted hover:border-primary transition-all w-full sm:w-auto"
        >
          Browse all services
          <ArrowRight className="w-3.5 h-3.5 text-primary" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Card Image */}
            <div className="relative h-52 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${pro.img}')` }}
              />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-foreground border border-border/50 shadow-sm">
                {pro.badge}
              </span>

              {/* Like Button */}
              <button
                type="button"
                onClick={() => toggleLike(pro.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-background/90 backdrop-blur-md text-foreground flex items-center justify-center border border-border/50 shadow hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${likedCards[pro.id] ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            {/* Card Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {pro.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{pro.category}</p>
                  </div>
                  <span className="font-title text-xs font-bold text-primary">
                    {pro.price}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="font-bold text-foreground">{pro.rating}</span>
                  <span className="text-muted-foreground">({pro.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{pro.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {pro.tags.map((tag, idx) => (
                    <span key={idx} className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-lg border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl shadow transition-colors block mt-2"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
