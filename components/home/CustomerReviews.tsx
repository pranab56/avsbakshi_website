"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star, Sparkles, CheckCircle2, User } from "lucide-react";
import { useGetAllReviewsQuery } from "@/features/review/reviewApi";

import "swiper/css";
import "swiper/css/pagination";

export default function CustomerReviews() {
  const { data: reviewsRes, isLoading } = useGetAllReviewsQuery({});

  const apiReviews = Array.isArray(reviewsRes?.data) ? reviewsRes.data : [];

  const isValidImage = (url: any) =>
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.includes("example.com");

  const displayReviews = apiReviews.map((rev: any, idx: number) => {
    const user = rev.user || {};
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Verified Client";

    const entity = rev.entity || {};
    let serviceText = "Verified Beauty Service";
    if (rev.entityType === "salon" && entity.name) {
      serviceText = entity.businessType
        ? `${entity.name} • ${entity.businessType}`
        : entity.name;
    } else if (rev.entityType === "user" && (entity.firstName || entity.lastName)) {
      serviceText = `Service by ${entity.firstName || ""} ${entity.lastName || ""}`.trim();
    }

    const rawQuote = rev.comment || "Exceptional service! Highly recommended.";
    const formattedQuote = rawQuote.startsWith("“") ? rawQuote : `“${rawQuote}”`;

    const avatarImg = isValidImage(user.image) ? user.image : "";

    const numericRating = typeof rev.rating === "number" ? rev.rating : 5;

    return {
      id: rev._id || `api-rev-${idx}`,
      name: fullName,
      service: serviceText,
      quote: formattedQuote,
      rating: numericRating,
      avatar: avatarImg,
    };
  });

  if (!isLoading && displayReviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-card text-card-foreground border-y border-border/70 py-14 sm:py-24 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99722]/10 border border-[#D99722]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D99722]" />
            <span className="text-[11px] font-bold text-[#D99722] uppercase tracking-[0.2em]">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Real reviews from verified beauty customers.
          </p>
        </div>

        {/* Swiper Carousel */}
        {isLoading ? (
          <div className="bg-accent/30 rounded-xl p-8 sm:p-14 border border-border/60 animate-pulse max-w-3xl mx-auto h-72 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted/60" />
            <div className="w-32 h-4 rounded bg-muted/60" />
            <div className="w-64 h-3 rounded bg-muted/50" />
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={displayReviews.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            className="pb-4"
          >
            {displayReviews.map((review: any) => (
              <SwiperSlide key={review.id}>
                <div className="bg-accent/40 rounded-xl p-6 sm:p-12 border border-border/80 shadow-xl max-w-6xl mx-auto relative">

                  {/* Verified Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99722]/15 border border-[#D99722]/30 mb-6">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D99722]" />
                    <span className="text-[10px] font-bold text-[#D99722] uppercase tracking-wider">
                      Verified Customer
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D99722] p-1 mx-auto mb-4 overflow-hidden shadow-xl bg-card flex items-center justify-center">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#D99722]/15 text-[#D99722] rounded-full font-bold text-lg sm:text-xl">
                        {review.name ? review.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                      </div>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-[#D99722]">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((starIdx) => {
                        const isFull = review.rating >= starIdx;
                        const isHalf = !isFull && review.rating >= starIdx - 0.5;
                        return (
                          <div key={starIdx} className="relative">
                            <Star
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                isFull
                                  ? "fill-[#D99722] text-[#D99722]"
                                  : isHalf
                                  ? "fill-[#D99722]/50 text-[#D99722]"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-[#D99722] ml-1">
                      {Number(review.rating).toFixed(1)}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base sm:text-xl lg:text-2xl text-foreground font-normal leading-relaxed max-w-xl mx-auto text-center mb-6">
                    {review.quote}
                  </blockquote>

                  {/* Customer Details */}
                  <div>
                    <h4 className="font-bold text-base text-foreground">{review.name}</h4>
                    <p className="text-xs text-[#D99722] font-semibold mt-0.5">{review.service}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Custom Swiper Pagination Indicator */}
        <div className="custom-swiper-pagination flex justify-center items-center gap-2 mt-6 cursor-pointer" />
      </div>

      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(183, 135, 53, 0.3);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 !important;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 28px;
          background: #b78735;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
