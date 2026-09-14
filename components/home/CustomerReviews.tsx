"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star, Sparkles, CheckCircle2 } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Rachel Thompson",
      service: "Full Hair Color & Styling",
      quote:
        "“Sofia completely transformed my hair. The colour is exactly what I imagined, and her attention to detail is unmatched. Already booked my next appointment!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Marcus Vance",
      service: "Skin Fade & Beard Trim",
      quote:
        "“The best barbershop experience I've had in NYC. Hot towel, skin fade, and beard sculpting executed to absolute perfection.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Ashley Morgan",
      service: "LED Luxury Facial Spa",
      quote:
        "“Booking through Cloud Salon was completely effortless. Transparent pricing, live calendar booking, and an incredible luxury facial service!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "James Holloway",
      service: "Balayage Highlight",
      quote:
        "“Incredible results and a seamless experience from start to finish. The app made booking so simple. 10/10 would recommend!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Priya Daniels",
      service: "Gel Manicure & Nail Art",
      quote:
        "“Love how easy it is to find top-rated nail artists nearby. The gel manicure lasted weeks and looked flawless every single day.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    },
  ];

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
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Real reviews from verified beauty customers.
          </p>
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
              <div className="bg-accent/40 rounded-[28px] p-6 sm:p-12 border border-border/80 shadow-2xl max-w-3xl mx-auto relative">
                
                {/* Verified Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99722]/15 border border-[#D99722]/30 mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D99722]" />
                  <span className="text-[10px] font-bold text-[#D99722] uppercase tracking-wider">
                    Verified Customer
                  </span>
                </div>

                {/* Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D99722] p-1 mx-auto mb-4 overflow-hidden shadow-xl">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-4 text-[#D99722]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D99722] text-[#D99722]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-title font-light italic text-base sm:text-xl lg:text-2xl text-foreground leading-relaxed max-w-xl mx-auto text-center mb-6">
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
