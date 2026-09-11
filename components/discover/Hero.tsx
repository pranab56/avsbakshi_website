import { Search } from "lucide-react";
import Input from "../shared/Input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}: HeroProps) {
  return (
    <section className="bg-[#1E1C1A] text-white pt-12 sm:pt-20 pb-0 relative overflow-hidden">
      {/* Bottom-right warm amber color gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/35 via-[#5A3819]/10 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#B78735]" />
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
              DISCOVER
            </span>
          </div>

          <h1 className="font-title text-2xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] sm:leading-[1.1] text-white">
            Every service. Every <br />
            <span className="font-light italic text-[#CAA054]">professional. Every salon</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl leading-relaxed">
            Search by service, location and date, then compare verified professionals and salons side by side.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-md relative pt-2">
          <Input
            variant="dark"
            inputSize="md"
            leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-white/10 pt-6 text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${
              activeTab === "services"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Services
            {activeTab === "services" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("professionals")}
            className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${
              activeTab === "professionals"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Professionals
            {activeTab === "professionals" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("salons")}
            className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${
              activeTab === "salons"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Salons
            {activeTab === "salons" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
