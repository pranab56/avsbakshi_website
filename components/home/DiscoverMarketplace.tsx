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
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviews: 89,
      location: "Soho, London",
      price: "from £40",
      badge: "Open until 9:00 PM",
      tags: ["Haircut", "Colour", "Blowout"],
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Maya Chen",
      category: "Colorist",
      rating: 4.9,
      reviews: 124,
      location: "Soho, London",
      price: "from £50",
      badge: "Top Rated",
      tags: ["Balayage", "Toning", "Highlights"],
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Amara Studio",
      category: "Nails & Spa",
      rating: 4.8,
      reviews: 95,
      location: "Soho, London",
      price: "from £35",
      badge: "Open Today",
      tags: ["Manicure", "Pedicure", "Nail Art"],
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "The Fold Barbers",
      category: "Skin Fade & Beard",
      rating: 4.9,
      reviews: 210,
      location: "Soho, London",
      price: "from £40",
      badge: "Popular",
      tags: ["Beard Trim", "Hot Towel", "Fade"],
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Lune Nail Studio",
      category: "Nail Care & Extensions",
      rating: 4.7,
      reviews: 78,
      location: "Soho, London",
      price: "from £45",
      badge: "Open until 9:00 PM",
      tags: ["Gel Nails", "Acrylics", "Art"],
      img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "North Lane Collective",
      category: "Full-service salon",
      rating: 4.9,
      reviews: 156,
      location: "Soho, London",
      price: "from £60",
      badge: "Verified Salon",
      tags: ["Haircut", "Facials", "Massages"],
      img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block mb-1">
            DISCOVER
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Find your perfect beauty experience
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-light">
            A preview of the marketplace. Example profiles shown for illustration.
          </p>
        </div>
        <Link
          href="/discover?tab=professionals"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[#E5E0D6] bg-white text-xs font-semibold text-[#2C2E33] hover:bg-[#F5F3EF] hover:border-[#B78735] transition-all self-start md:self-auto"
        >
          Browse all services
          <ArrowRight className="w-3.5 h-3.5 text-[#B78735]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-white rounded-lg overflow-hidden border border-[#E5E0D6] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Card Image */}
            <div className="relative h-52 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${pro.img}')` }}
              />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#1A1A1A] shadow-sm">
                {pro.badge}
              </span>

              {/* Like Button */}
              <button
                type="button"
                onClick={() => toggleLike(pro.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-zinc-700 flex items-center justify-center shadow hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${likedCards[pro.id] ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            {/* Card Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title text-base font-bold text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                      {pro.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{pro.category}</p>
                  </div>
                  <span className="font-title text-xs font-bold text-[#B78735]">
                    {pro.price}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-zinc-600">
                  <Star className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]" />
                  <span className="font-bold text-[#1A1A1A]">{pro.rating}</span>
                  <span className="text-zinc-400">({pro.reviews})</span>
                  <span className="mx-1">•</span>
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span className="text-zinc-500 truncate">{pro.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {pro.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#F5F3EF] text-zinc-600 text-[10px] px-2 py-0.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/professionals/1"
                className="w-full text-center py-3 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-lg shadow transition-colors block mt-2"
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
