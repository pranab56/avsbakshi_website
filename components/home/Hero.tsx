"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, Scissors } from "lucide-react";
import CategoriesSection from "./CategoriesSection";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(locationQuery)}`);
  };

  // 5 Orbiting Salon Photo Bubbles
  const photoBubbles = [
    {
      label: "Hair & Color",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80",
      rating: "★ 4.9",
      top: "0%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    {
      label: "Nails & Spa",
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80",
      rating: "Top Rated",
      top: "28%",
      left: "95%",
      transform: "translate(-50%, -50%)",
    },
    {
      label: "Skincare",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80",
      rating: "Verified",
      top: "78%",
      left: "80%",
      transform: "translate(-50%, -50%)",
    },
    {
      label: "Makeup",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
      rating: "Popular",
      top: "78%",
      left: "20%",
      transform: "translate(-50%, -50%)",
    },
    {
      label: "Barber",
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80",
      rating: "Instant",
      top: "28%",
      left: "5%",
      transform: "translate(-50%, -50%)",
    },
  ];

  return (
    <div className="w-full relative bg-[#FAF8F5] dark:bg-[#0E0D0C] text-foreground overflow-hidden border-b border-border/40 select-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[#B78735]/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#D4AF37]/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">

          {/* Left Column: Headline & Search */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left z-10">

            {/* Top Sub-tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#B78735]/15 border border-[#B78735]/35 shadow-xs max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#B78735] animate-pulse shrink-0" />
              <span className="text-[10px] min-[380px]:text-[11px] sm:text-xs font-bold text-[#B78735] uppercase tracking-[0.14em] min-[380px]:tracking-[0.18em] sm:tracking-[0.22em] truncate">
                SALON. YOUR WAY. ANYWHERE.
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-title text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] sm:leading-[1.08] tracking-tight text-foreground">
                Salon Services, <br className="hidden min-[380px]:inline" />
                <span className="bg-gradient-to-r from-[#F3E0B5] via-[#D4AF37] to-[#B78735] bg-clip-text text-transparent drop-shadow-xs inline-block">
                  Your Choice.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-normal max-w-lg leading-relaxed">
                Discover top-rated beauty professionals and salons, explore custom packages, and book your next appointment seamlessly — anytime, anywhere.
              </p>
            </div>

            {/* Floating Glass Search Bar Widget */}
            <form
              onSubmit={handleSearch}
              className="bg-card/90 backdrop-blur-xl border border-border p-2 sm:p-2.5 rounded-2xl shadow-xl sm:shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl"
            >
              {/* Service Input */}
              <div className="relative flex-1 w-full flex items-center gap-2.5 px-3 sm:px-3.5 py-2.5 rounded-xl bg-accent/40 border border-border/50 focus-within:border-[#B78735] focus-within:bg-background transition-all">
                <Search className="w-4 h-4 text-[#B78735] shrink-0" />
                <input
                  type="text"
                  placeholder="Search services, specialists, or salons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/80 outline-none font-medium truncate"
                />
              </div>

              {/* Location Input */}
              <div className="relative w-full sm:w-48 flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl bg-accent/40 border border-border/50 focus-within:border-[#B78735] focus-within:bg-background transition-all">
                <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                  <MapPin className="w-4 h-4 text-[#B78735] shrink-0" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-foreground outline-none font-medium truncate"
                    placeholder="Location"
                  />
                </div>
                {/* <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 pointer-events-none" /> */}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#B78735] hover:bg-[#A0732A] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Search</span>
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Action CTAs */}
            {/* <div className="flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-2.5 sm:gap-3 pt-1">
              <Link
                href="/discover"
                className="w-full min-[420px]:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#B78735] hover:bg-[#A0732A] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-[#B78735]/25 flex items-center justify-center gap-2 group text-center"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
              <Link
                href="/for-professionals"
                className="w-full min-[420px]:w-auto px-5 sm:px-6 py-3 rounded-xl bg-card border border-border hover:bg-accent active:scale-[0.98] text-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center text-center"
              >
                Join as a Professional
              </Link>
            </div> */}

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground pt-1">
              <span className="font-semibold text-[#B78735] text-[11px] sm:text-xs shrink-0">Popular:</span>
              {["Haircut", "Highlights", "Nails", "Facial", "Barber", "Massage"].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 sm:px-3 py-1 rounded-lg bg-accent/70 hover:bg-accent border border-border/50 text-foreground text-[11px] sm:text-xs font-medium transition-all active:scale-95 shrink-0"
                >
                  {tag}
                </Link>
              ))}
            </div>

          </div>

          {/* Right Column: ReactBits Style Orbiting Photo Bubbles */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[310px] min-[380px]:min-h-[350px] sm:min-h-[460px] lg:min-h-[500px] py-4 sm:py-0">

            {/* Outer Rotating Orbit Ring Container */}
            <div className="relative w-[250px] min-[380px]:w-[290px] sm:w-[380px] lg:w-[420px] h-[250px] min-[380px]:h-[290px] sm:h-[380px] lg:h-[420px] rounded-full border border-[#B78735]/25 flex items-center justify-center animate-[spin_35s_linear_infinite]">

              {/* 5 Orbiting Salon Photo Bubbles */}
              {photoBubbles.map((bubble, idx) => (
                <div
                  key={idx}
                  style={{ top: bubble.top, left: bubble.left, transform: bubble.transform }}
                  className="absolute z-30 transition-transform duration-300 hover:scale-125"
                >
                  {/* Counter-rotating wrapper to keep inner image & text upright while orbiting */}
                  <div className="animate-[spin_35s_linear_infinite_reverse]">
                    <div className="relative group cursor-pointer">
                      {/* Photo Bubble Circle */}
                      <div className="w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-[#B78735] via-[#D4AF37] to-white shadow-2xl overflow-hidden border-2 border-background">
                        <div
                          className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${bubble.img}')` }}
                        />
                      </div>

                      {/* Top Label Pill */}
                      <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-md px-1.5 min-[380px]:px-2 sm:px-2.5 py-0.5 rounded-full border border-[#B78735]/40 shadow-lg text-[9px] min-[380px]:text-[10px] font-bold text-foreground whitespace-nowrap">
                        {bubble.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Central Brand Hub Badge */}
            <div className="absolute z-20 w-28 h-28 min-[380px]:w-32 min-[380px]:h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full bg-card/95 backdrop-blur-2xl border-2 border-[#B78735] shadow-2xl shadow-[#B78735]/30 flex flex-col items-center justify-center text-center p-2 sm:p-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#B78735] text-white flex items-center justify-center mb-1 sm:mb-1.5 shadow-md shadow-[#B78735]/30 shrink-0">
                <Scissors className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <h3 className="font-title font-bold text-[10px] min-[380px]:text-xs sm:text-sm text-foreground tracking-tight leading-tight">
                THE CLOUD SALON
              </h3>
              <p className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] text-[#B78735] font-semibold mt-0.5">
                Beauty Marketplace
              </p>

              {/* Pulsing Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border border-[#B78735]/60 animate-ping opacity-25 pointer-events-none" />
            </div>

            {/* Bottom Floating Live Activity Pill */}
            <div className="absolute -bottom-1 sm:-bottom-2 z-30 bg-card/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/80 shadow-xl flex items-center gap-1.5 sm:gap-2 max-w-[92%] sm:max-w-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] min-[380px]:text-[11px] sm:text-xs font-semibold text-foreground truncate">
                ⚡ 150+ Appointments Booked Today
              </span>
            </div>

          </div>

        </div>
      </section>

      <CategoriesSection />
    </div>
  );
}
