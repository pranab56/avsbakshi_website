"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import TrustBadges from "./TrustBadges";
import Input from "../shared/Input";
import Button from "../shared/Button";

export default function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(locationQuery)}`);
    };

    return (
        <div className="w-full">
            <section className="relative min-h-[500px] xs:min-h-[560px] sm:min-h-[680px] lg:min-h-[740px] bg-[#1E1C1A] text-white overflow-hidden flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 transform scale-105 transition-all duration-700"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80')` }}
                />
                {/* Left dark text-reading shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
                {/* Bottom-right warm golden amber color gradient overlay matching reference design */}
                <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/55 via-[#5A3819]/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D250F]/45 via-transparent to-transparent pointer-events-none" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 w-full">
                    <div className="max-w-2xl space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#B78735]" />
                            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-widest">
                                BEAUTY, YOUR WAY
                            </span>
                        </div>

                        <h1 className="font-title text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.1] text-white drop-shadow-md">
                            Find your people. <br />
                            <span className="font-light italic text-[#CAA054]">Feel like yourself.</span>
                        </h1>

                        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light drop-shadow-sm max-w-xl">
                            Discover trusted beauty professionals and salons, and book your next appointment with confidence. Find the right service, the right professional, and the right time — all in one place.
                        </p>

                        {/* Search Bar Widget */}
                        <form onSubmit={handleSearch} className="bg-card/95 backdrop-blur-md p-2.5 rounded-xl shadow-2xl border border-border/40 flex flex-col sm:flex-row items-center gap-2 max-w-2xl">
                            <Input
                                variant="default"
                                inputSize="md"
                                leftIcon={<Search className="w-4 h-4 text-primary" />}
                                placeholder="Try 'balayage', 'facial'..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <Input
                                variant="default"
                                inputSize="md"
                                leftIcon={<MapPin className="w-4 h-4 text-primary" />}
                                placeholder="City, ZIP code, or location"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                className="w-full sm:w-auto shrink-0"
                            >
                                Find a Service
                            </Button>
                        </form>

                        {/* Popular Tags */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-200">
                            <span className="font-semibold text-[#B78735]">Popular:</span>
                            {["Haircut", "Highlights", "Nail Art", "Facial", "Barber"].map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/search?q=${encodeURIComponent(tag)}`}
                                    className="bg-white/15 hover:bg-white/30 border border-white/20 text-white/90 px-3.5 py-1 rounded-sm text-xs transition-all backdrop-blur-sm shadow-xs"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadges />
        </div>
    );
}
