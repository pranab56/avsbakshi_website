"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, ChevronDown } from "lucide-react";

export default function CustomerDiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [activePage, setActivePage] = useState("01");

  const professionals = [
    {
      id: "1",
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviewCount: 89,
      location: "Shoreditch, London",
      experience: "10 years experience",
      tags: ["Haircut", "Colour", "Blowout"],
      startingPrice: "from £40",
      nextAvailable: "Next: Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviewCount: 89,
      location: "Shoreditch, London",
      experience: "10 years experience",
      tags: ["Haircut", "Colour", "Blowout"],
      startingPrice: "from £40",
      nextAvailable: "Next: Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviewCount: 89,
      location: "Shoreditch, London",
      experience: "10 years experience",
      tags: ["Haircut", "Colour", "Blowout"],
      startingPrice: "from £40",
      nextAvailable: "Next: Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      name: "Emma Studio",
      category: "Hair & Beauty",
      rating: 4.8,
      reviewCount: 89,
      location: "Shoreditch, London",
      experience: "10 years experience",
      tags: ["Haircut", "Colour", "Blowout"],
      startingPrice: "from £40",
      nextAvailable: "Next: Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const pageNumbers = ["01", "02", "03", "04", "05", "...", "24"];

  return (
    <div className="space-y-8">
      {/* Header Title Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Discover
        </h1>
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          Find professionals and salons near you
        </p>
      </div>

      {/* Search & Location Bar Card */}
      <div className="bg-[#FDFDFD] border border-[#E3DDD3]/70 p-2 sm:p-3 rounded-lg max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Keyword Input */}
          <div className="relative flex-1 w-full bg-[#F3F0EA] rounded-sm flex items-center px-4 py-3">
            <Search className="w-4 h-4 text-[#8A857C] shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try 'balayage', 'facial'..."
              className="bg-transparent border-0 outline-none w-full text-sm text-[#2C2E33] placeholder-[#8A857C]"
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-1 w-full bg-[#F3F0EA] rounded-sm flex items-center px-4 py-3">
            <MapPin className="w-4 h-4 text-[#8A857C] shrink-0 mr-3" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="City, ZIP code, or location"
              className="bg-transparent border-0 outline-none w-full text-sm text-[#2C2E33] placeholder-[#8A857C]"
            />
          </div>

          {/* Find a Service Button */}
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
          >
            Find a Service
          </button>
        </div>
      </div>

      {/* Results Count & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-sm sm:text-base text-[#2C2E33]">
          <span className="font-bold">124</span> professionals found near{" "}
          <span className="font-bold">London</span>
        </p>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs sm:text-sm text-[#787570]">Sort:</span>
          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-2.5 pr-9 text-xs sm:text-sm font-semibold text-[#2C2E33] cursor-pointer appearance-none outline-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] hover:border-[#B78735]/60 transition-colors shadow-2xs"
            >
              <option value="Recommended">Recommended</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Price: Low to High">Price: Low to High</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#787570] absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Professional Cards List */}
      <div className="space-y-5">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-[#FDFDFD] border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row transition-all hover:border-[#D0C7B7]"
          >
            {/* Studio Image */}
            <div className="relative w-full md:w-64 lg:w-72 h-56 md:h-auto shrink-0 bg-[#E0D9CE]">
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
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33] leading-tight">
                      {pro.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#787570] mt-0.5">
                      {pro.category}
                    </p>
                  </div>

                  {/* Rating Line */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-0.5 text-[#A27933]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#A27933] text-[#A27933]"
                        />
                      ))}
                    </div>
                    <span className="text-[#2C2E33] font-medium">
                      {pro.rating} ({pro.reviewCount})
                    </span>
                  </div>

                  {/* Location & Experience Line */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#787570]">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#787570]" />
                    <span>
                      {pro.location} · {pro.experience}
                    </span>
                  </div>

                  {/* Service Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {pro.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#E2DDD3]/70 text-[#5C5954] px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="sm:text-right shrink-0">
                  <span className="font-serif italic font-bold text-xl sm:text-2xl text-[#A27933] block">
                    {pro.startingPrice}
                  </span>
                  <span className="text-xs text-[#787570] block">
                    per service
                  </span>
                </div>
              </div>

              {/* Bottom Availability & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E3DDD3]/50">
                <span className="text-xs sm:text-sm text-[#3F6B38] font-medium">
                  {pro.nextAvailable}
                </span>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Link
                    href={`/professionals/${pro.id}`}
                    className="px-5 py-2.5 rounded-sm bg-[#DFD9CE] hover:bg-[#D5CEBF] text-[#2C2E33] text-xs sm:text-sm font-medium transition-colors"
                  >
                    View profile
                  </Link>
                  <Link
                    href={`/book/${pro.id}`}
                    className="px-5 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors"
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
          className="text-xs sm:text-sm text-[#787570] font-medium hover:text-[#2C2E33] px-2 py-1 transition-colors cursor-pointer"
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
                    ? "bg-[#A27933] text-white shadow-xs"
                    : num === "..."
                    ? "bg-[#E2DDD3]/60 text-[#5C5954] cursor-default"
                    : "bg-[#E2DDD3] text-[#5C5954] hover:bg-[#D8D2C7] cursor-pointer"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="text-xs sm:text-sm text-[#A27933] font-medium hover:underline px-2 py-1 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}