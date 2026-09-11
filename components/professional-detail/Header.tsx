"use client";

import Link from "next/link";
import { MapPin, CheckCircle2, Heart } from "lucide-react";

export type DetailTabType = "about" | "services" | "portfolio" | "reviews" | "availability";

interface HeaderProps {
  activeTab: DetailTabType;
  setActiveTab: (tab: DetailTabType) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isLiked,
  setIsLiked,
}: HeaderProps) {
  return (
    <>
      {/* Cover Image Header Banner */}
      <div className="relative h-64 sm:h-80 bg-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-start pt-6 relative z-10">
          <div className="text-white text-xs flex items-center gap-2 font-normal">
            <Link href="/" className="hover:underline text-white/80">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/discover" className="hover:underline text-white/80">Discover</Link>
            <span className="text-white/40">/</span>
            <Link href="/discover?tab=services" className="hover:underline text-white/80">Hair</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Sofia Martinez</span>
          </div>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-card rounded-t-xl sm:rounded-t-2xl pt-8 pb-0 px-6 sm:px-10 border-x border-t border-border text-card-foreground shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
            <div className="flex flex-col xs:flex-row xs:items-center gap-4 sm:gap-7">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-card shadow-md shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                  alt="Sofia Martinez"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="font-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground">
                    Sofia Martinez
                  </h1>
                  <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    VERIFIED
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Hair Stylist · 10 years
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-1 text-foreground">
                    <div className="flex items-center text-primary text-sm">
                      ★★★★★
                    </div>
                    <span className="font-bold ml-1">4.8</span>
                    <span className="text-muted-foreground">(312 reviews)</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Soho, New York</span>
                  </div>
                  <span>·</span>
                  <span className="text-muted-foreground">from $65</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/book/1"
                className="flex-1 md:flex-none px-7 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors text-center cursor-pointer"
              >
                Book Appointment
              </Link>
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="w-11 h-11 bg-secondary hover:bg-secondary/80 border border-border rounded-xl flex items-center justify-center text-foreground transition-colors cursor-pointer shrink-0"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-border pt-4 text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
            {[
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "reviews", label: "Reviews" },
              { id: "availability", label: "Availability" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DetailTabType)}
                className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${
                  activeTab === tab.id
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
