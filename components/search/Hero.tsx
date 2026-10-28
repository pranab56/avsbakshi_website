"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { GooglePlacesInput, GooglePlaceResult } from "../ui/google-places-input";

interface HeroProps {
  q: string;
  loc: string;
  latitude?: string;
  longitude?: string;
}

export default function Hero({ q, loc, latitude: initialLat = "", longitude: initialLng = "" }: HeroProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(q);
  const [locationText, setLocationText] = useState(loc);
  const [latitude, setLatitude] = useState<number | string | null>(initialLat || null);
  const [longitude, setLongitude] = useState<number | string | null>(initialLng || null);

  const handlePlaceSelect = (place: GooglePlaceResult) => {
    setLocationText(place.address);
    setLatitude(place.lat);
    setLongitude(place.lng);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (locationText.trim()) params.set("loc", locationText.trim());
    if (latitude) params.set("latitude", String(latitude));
    if (longitude) params.set("longitude", String(longitude));

    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-[#1E1C1A] text-white py-12 sm:py-20 relative overflow-hidden">
      {/* Bottom-right warm amber color gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-cover bg-right pointer-events-none hidden md:block"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')` }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-10">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D99722]" />
            <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
              DISCOVER
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] sm:leading-[1.1] text-white tracking-tight">
            Find your perfect <br />
            <span className="text-[#D99722]">beauty experience</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-normal max-w-xl leading-relaxed">
            Search by service, location and date, then compare verified professionals and salons side by side.
          </p>
        </div>

        {/* Search Inputs Bar */}
        <div className="bg-white/10 p-2 rounded-xl border border-white/15 flex flex-col sm:flex-row items-center gap-2 max-w-3xl">
          <Input
            variant="dark"
            inputSize="md"
            leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Try 'balayage', 'facial'..."
            className="!h-11"
          />

          <div className="w-full sm:w-1/2 relative">
            <GooglePlacesInput
              variant="dark"
              placeholder="City, ZIP code, or location"
              value={locationText}
              onPlaceSelectAction={handlePlaceSelect}
              onTextChange={(val) => setLocationText(val)}
              onKeyDown={handleKeyDown}
              className="!h-11"
            />
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleSearch}
            className="w-full sm:w-auto shrink-0 !h-11 px-6 font-bold"
          >
            Find a Service
          </Button>
        </div>

        {/* Popular tags below search bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-zinc-400 font-normal mr-1">Popular:</span>
          {["Haircut", "Highlights", "Nail Art", "Facial", "Barber"].map((tag, idx) => (
            <Link
              key={idx}
              href={`/search?searchTerm=${encodeURIComponent(tag)}`}
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-md border border-white/15 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
