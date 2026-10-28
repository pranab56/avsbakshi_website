import { Search } from "lucide-react";
import Input from "../shared/Input";
import { GooglePlacesInput, GooglePlaceResult } from "../ui/google-places-input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationAddress: string;
  setLocationAddress: (address: string) => void;
  latitude: number | string | null;
  longitude: number | string | null;
  onPlaceSelect: (place: GooglePlaceResult) => void;
  onSearch: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  locationAddress,
  setLocationAddress,
  latitude,
  longitude,
  onPlaceSelect,
  onSearch,
  activeTab,
  setActiveTab,
}: HeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <section className="bg-[#1E1C1A] text-white pt-12 sm:pt-20 pb-0 relative overflow-hidden">
      {/* Bottom-right warm amber color gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D99722]" />
            <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
              DISCOVER
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] sm:leading-[1.1] text-white tracking-tight">
            Every service. Every <br />
            <span className="text-[#D99722]">professional. Every salon</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-normal max-w-xl leading-relaxed">
            Search by service, location and date, then compare verified professionals and salons side by side.
          </p>
        </div>

        {/* Dual Search Box: Location (Google Places Autocomplete) + Service Term + Search Button */}
        <div className="max-w-3xl relative pt-2">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-center gap-2.5 shadow-xl">
            {/* Location Autocomplete Search */}
            <div className="w-full sm:w-1/2 relative">
              <GooglePlacesInput
                variant="dark"
                placeholder="City, area or address..."
                value={locationAddress}
                onPlaceSelectAction={onPlaceSelect}
                onTextChange={(val) => {
                  setLocationAddress(val);
                }}
                onKeyDown={handleKeyDown}
                className="!h-11 !rounded-xl"
              />
            </div>

            {/* Service / Specialist Search Term */}
            <div className="w-full sm:w-1/2 relative">
              <Input
                variant="dark"
                inputSize="md"
                leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
                placeholder="Search services or specialists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="!h-11 !rounded-xl"
              />
            </div>

            {/* Search Action Button */}
            <button
              type="button"
              onClick={onSearch}
              className="w-full sm:w-auto px-6 h-11 bg-[#D99722] hover:bg-[#C2841B] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-white/10 pt-6 text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => setActiveTab("professionals")}
            className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${activeTab === "professionals"
              ? "text-white font-semibold"
              : "text-zinc-400 hover:text-white"
              }`}
          >
            Professionals
            {activeTab === "professionals" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D99722]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("salons")}
            className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${activeTab === "salons"
              ? "text-white font-semibold"
              : "text-zinc-400 hover:text-white"
              }`}
          >
            Salons
            {activeTab === "salons" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D99722]" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
