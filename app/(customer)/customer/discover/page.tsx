"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";

export default function CustomerDiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("Highest Rated");
  const [activePage, setActivePage] = useState("01");

  const sortOptions = [
    { value: "Recommended", label: "Recommended" },
    { value: "Highest Rated", label: "Highest Rated" },
    { value: "Most Popular", label: "Most Popular" },
    { value: "Price: Low to High", label: "Price: Low to High" },
  ];

  const professionals = [
    {
      id: "1",
      name: "Noir Studio Suites",
      category: "Hair & Luxury Beauty",
      rating: 4.9,
      reviewCount: 142,
      location: "Soho, New York",
      experience: "10 years experience",
      tags: ["Haircut", "Balayage", "Blowout"],
      startingPrice: "from $65",
      nextAvailable: "Next: Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      name: "The Ritual MedSpa",
      category: "Skincare & Wellness",
      rating: 4.9,
      reviewCount: 242,
      location: "Beverly Hills, Los Angeles",
      experience: "8 years experience",
      tags: ["Facial", "LED Therapy", "Peels"],
      startingPrice: "from $120",
      nextAvailable: "Next: Today, 4:00 PM",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      name: "Golden Ratio Barbering",
      category: "Barbershop & Grooming",
      rating: 4.9,
      reviewCount: 199,
      location: "West Loop, Chicago",
      experience: "12 years experience",
      tags: ["Haircut", "Beard Trim", "Hot Towel"],
      startingPrice: "from $50",
      nextAvailable: "Next: Tomorrow, 11:00 AM",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      name: "Lune Nail & Lash Studio",
      category: "Nails & Eyelashes",
      rating: 4.8,
      reviewCount: 115,
      location: "Tribeca, New York",
      experience: "6 years experience",
      tags: ["Manicure", "Nail Art", "Lash Lift"],
      startingPrice: "from $45",
      nextAvailable: "Next: Today, 3:15 PM",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const pageNumbers = ["01", "02", "03", "04", "05", "...", "24"];

  return (
    <div className="space-y-8">
      {/* Header Title Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Discover
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Find professionals and salons near you
        </p>
      </div>

      {/* Search & Location Bar Card */}
      <div className="bg-card border border-border p-2 sm:p-3 rounded-lg max-w-4xl shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Keyword Input */}
          <div className="relative flex-1 w-full bg-accent rounded-sm flex items-center px-4 py-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try 'balayage', 'facial'..."
              className="bg-transparent border-0 outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-1 w-full bg-accent rounded-sm flex items-center px-4 py-3">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="City, ZIP code, or location"
              className="bg-transparent border-0 outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Find a Service Button */}
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer shrink-0"
          >
            Find a Service
          </button>
        </div>
      </div>

      {/* Results Count & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-sm sm:text-base text-foreground">
          <span className="font-bold">124</span> professionals found near{" "}
          <span className="font-bold">New York</span>
        </p>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">Sort:</span>
          <Combobox
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            triggerClassName="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full px-4 py-1.5 text-xs shadow-xs"
          />
        </div>
      </div>

      {/* Professional Cards List */}
      <div className="space-y-5">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-card border border-border rounded-lg overflow-hidden flex flex-col md:flex-row transition-all hover:border-primary/50 shadow-xs"
          >
            {/* Studio Image */}
            <div className="relative w-full md:w-64 lg:w-72 h-56 md:h-auto shrink-0 bg-accent">
              <Image
                src={pro.image}
                alt={pro.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Studio Info & Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-6">
              {/* Top Details Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground leading-tight">
                      {pro.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {pro.category}
                    </p>
                  </div>

                  {/* Rating Line */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-0.5 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="text-foreground font-medium">
                      {pro.rating} ({pro.reviewCount})
                    </span>
                  </div>

                  {/* Location & Experience Line */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    <span>
                      {pro.location} · {pro.experience}
                    </span>
                  </div>

                  {/* Service Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {pro.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="sm:text-right shrink-0">
                  <span className="font-serif italic font-bold text-xl sm:text-2xl text-primary block">
                    {pro.startingPrice}
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    per service
                  </span>
                </div>
              </div>

              {/* Bottom Availability & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border">
                <span className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  {pro.nextAvailable}
                </span>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Link
                    href={`/professionals/${pro.id}`}
                    className="px-5 py-2.5 rounded-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs sm:text-sm font-medium transition-colors"
                  >
                    View profile
                  </Link>
                  <Link
                    href={`/book/${pro.id}`}
                    className="px-5 py-2.5 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium transition-colors"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 pt-6 flex-wrap">
        <button
          type="button"
          className="text-xs sm:text-sm text-muted-foreground font-medium hover:text-foreground px-2 py-1 transition-colors cursor-pointer"
        >
          Prev
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {pageNumbers.map((num, i) => {
            const isActive = num === activePage;
            return (
              <button
                key={i}
                type="button"
                onClick={() => num !== "..." && setActivePage(num)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : num === "..."
                    ? "bg-accent/50 text-muted-foreground cursor-default"
                    : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground cursor-pointer"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="text-xs sm:text-sm text-primary font-medium hover:underline px-2 py-1 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}