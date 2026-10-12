"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/components/discover/Hero";
import ProfessionalsTab from "@/components/discover/ProfessionalsTab";
import SalonsTab from "@/components/discover/SalonsTab";
import { GooglePlaceResult } from "@/components/ui/google-places-input";

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const rawTab = searchParams.get("tab") || "professionals";
  const activeTab = rawTab === "salons" ? "salons" : "professionals";

  const urlSearchTerm = searchParams.get("searchTerm") || searchParams.get("q") || "";
  const urlLatitude = searchParams.get("latitude") || "";
  const urlLongitude = searchParams.get("longitude") || "";
  const urlLocation = searchParams.get("location") || searchParams.get("loc") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearchTerm);
  const [locationAddress, setLocationAddress] = useState(urlLocation);
  const [latitude, setLatitude] = useState<number | string | null>(urlLatitude || null);
  const [longitude, setLongitude] = useState<number | string | null>(urlLongitude || null);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchQuery(urlSearchTerm);
    setLocationAddress(urlLocation);
    setLatitude(urlLatitude || null);
    setLongitude(urlLongitude || null);
  }, [urlSearchTerm, urlLocation, urlLatitude, urlLongitude]);

  const handlePlaceSelect = (place: GooglePlaceResult) => {
    setLocationAddress(place.address);
    setLatitude(place.lat);
    setLongitude(place.lng);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("searchTerm", searchQuery.trim());
    }
    if (locationAddress.trim()) {
      params.set("loc", locationAddress.trim());
    }
    if (latitude) {
      params.set("latitude", String(latitude));
    }
    if (longitude) {
      params.set("longitude", String(longitude));
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`/discover?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background text-foreground select-none">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationAddress={locationAddress}
        setLocationAddress={setLocationAddress}
        latitude={latitude}
        longitude={longitude}
        onPlaceSelect={handlePlaceSelect}
        onSearch={handleSearch}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16">
        {activeTab === "salons" ? <SalonsTab /> : <ProfessionalsTab />}
      </section>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading discover page...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
