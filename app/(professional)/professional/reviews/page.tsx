"use client";

import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  verified: boolean;
  date: string;
  service: string;
  rating: number;
  comment: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: "1",
    clientName: "Sofia Martinez",
    clientAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: true,
    date: "12 Jul 2025",
    service: "Full Colour & Style",
    rating: 5,
    comment:
      "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment.",
  },
  {
    id: "2",
    clientName: "Sofia Martinez",
    clientAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: true,
    date: "12 Jul 2025",
    service: "Full Colour & Style",
    rating: 5,
    comment:
      "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment.",
  },
  {
    id: "3",
    clientName: "Sofia Martinez",
    clientAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: true,
    date: "12 Jul 2025",
    service: "Full Colour & Style",
    rating: 5,
    comment:
      "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment.",
  },
  {
    id: "4",
    clientName: "Sofia Martinez",
    clientAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    verified: true,
    date: "12 Jul 2025",
    service: "Full Colour & Style",
    rating: 5,
    comment:
      "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment.",
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export default function ProfessionalReviewsPage() {
  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Reviews
        </h1>
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          5 reviews · 4.8 average
        </p>
      </div>

      {/* Main Overall Rating Card */}
      <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Rating Overview */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start space-y-2 border-b md:border-b-0 md:border-r border-[#E3DDD3]/60 pb-6 md:pb-0 md:pr-8">
            <div className="font-serif italic font-normal text-5xl sm:text-6xl text-[#2C2E33] leading-none">
              4.9
            </div>
            <div className="flex items-center gap-1 text-[#B78735]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#B78735] text-[#B78735]"
                />
              ))}
            </div>
            <p className="text-xs text-[#787570] font-normal pt-1">
              312 reviews
            </p>
          </div>

          {/* Right Progress Bars */}
          <div className="md:col-span-8 space-y-2.5">
            {RATING_BREAKDOWN.map((item) => (
              <div
                key={item.stars}
                className="flex items-center gap-3 text-xs sm:text-sm text-[#787570]"
              >
                <div className="flex items-center gap-1 w-8 shrink-0 font-medium">
                  <span>{item.stars}</span>
                  <Star className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]" />
                </div>

                <div className="flex-1 h-2 bg-[#E8E4DD] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#B78735] rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <span className="w-10 text-right font-medium text-[#2C2E33] shrink-0">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            4.9
          </div>
          <p className="text-xs text-[#787570] font-normal">Communication</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            5.0
          </div>
          <p className="text-xs text-[#787570] font-normal">Skill</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            4.7
          </div>
          <p className="text-xs text-[#787570] font-normal">Value</p>
        </div>
      </div>

      {/* Reviews Stacked List */}
      <div className="space-y-4 pt-2">
        {REVIEWS_DATA.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-[#E3DDD3]/70 rounded-lg p-6 space-y-3.5 shadow-xs hover:border-[#B78735]/40 transition-colors"
          >
            {/* Header: User & Rating & Date */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#E0D9CE] shrink-0 border border-[#E3DDD3]/70">
                  <Image
                    src={review.clientAvatar}
                    alt={review.clientName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#2C2E33]">
                      {review.clientName}
                    </h3>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#E8F3EA] text-[#2E6B38] border border-[#C5E1CA] text-[10px] font-bold rounded-full uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-[#2E6B38]" />
                        VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-[#B78735]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Date & Service */}
              <div className="text-right shrink-0">
                <span className="text-xs text-[#787570] block font-normal">
                  {review.date}
                </span>
                <span className="text-xs font-semibold text-[#B78735] block mt-0.5">
                  {review.service}
                </span>
              </div>
            </div>

            {/* Review Comment Text */}
            <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed pt-1">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
