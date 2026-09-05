"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Rachel Thompson",
      service: "Full Colour with Sofia Martinez",
      quote:
        "“Sofia completely transformed my hair. The colour is exactly what I imagined, and her attention to detail is unmatched. Already booked my next appointment.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Marcus Vance",
      service: "Skin Fade & Beard Trim at The Fold",
      quote:
        "“The best barbershop experience I've had in London. Hot towel, skin fade, and beard sculpting executed to perfection.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Elena Rostova",
      service: "LED Facial at Noir Studio",
      quote:
        "“Booking through Cloud Salon was completely effortless. Transparent pricing and incredible luxury facial service!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <section className="bg-[#1E1C1A] text-white py-14 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            REVIEWS
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-normal text-white">
            What our customers say
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          className="pb-4"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-[#242428] rounded-[20px] sm:rounded-[28px] p-5 sm:p-12 border border-white/10 shadow-2xl max-w-3xl mx-auto">
                {/* Avatar */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#B78735] p-0.5 mx-auto mb-3 sm:mb-4 overflow-hidden shadow-lg">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1.5 mb-4 sm:mb-5 text-[#B78735]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B78735] text-[#B78735]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-title font-light italic text-base sm:text-xl lg:text-2xl text-zinc-200 leading-relaxed max-w-xl mx-auto text-center mb-5 sm:mb-6">
                  {review.quote}
                </blockquote>

                {/* Customer Details */}
                <div>
                  <h4 className="font-bold text-base text-white">{review.name}</h4>
                  <p className="text-xs text-[#B78735] mt-0.5">{review.service}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Pagination Indicator */}
        <div className="custom-swiper-pagination flex justify-center items-center gap-2 mt-6 cursor-pointer" />
      </div>

      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 !important;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #b78735;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
