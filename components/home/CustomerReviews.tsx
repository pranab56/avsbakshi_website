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
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Marcus Vance",
      service: "Skin Fade & Beard Trim at The Fold",
      quote:
        "“The best barbershop experience I've had in NYC. Hot towel, skin fade, and beard sculpting executed to absolute perfection.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Ashley Morgan",
      service: "LED Facial at Noir Studio",
      quote:
        "“Booking through Cloud Salon was completely effortless. Transparent pricing and an incredible luxury facial service!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "James Holloway",
      service: "Balayage at Maya Chen Color Studio",
      quote:
        "“Incredible results and a seamless experience from start to finish. The app made booking so simple. 10/10 would recommend!”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Priya Daniels",
      service: "Gel Manicure at Luxe Nail Bar",
      quote:
        "“Love how easy it is to find top-rated nail artists nearby. The gel manicure lasted weeks and looked flawless every day.”",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <section className="bg-card text-card-foreground border-y border-border py-14 sm:py-28 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block mb-2 sm:mb-3">
            REVIEWS
          </span>
          <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-normal text-foreground">
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
              <div className="bg-accent/50 rounded-[20px] sm:rounded-[28px] p-5 sm:p-12 border border-border shadow-xl max-w-3xl mx-auto">
                {/* Avatar */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary p-0.5 mx-auto mb-3 sm:mb-4 overflow-hidden shadow-lg">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1.5 mb-4 sm:mb-5 text-primary">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-title font-light italic text-base sm:text-xl lg:text-2xl text-foreground/90 leading-relaxed max-w-xl mx-auto text-center mb-5 sm:mb-6">
                  {review.quote}
                </blockquote>

                {/* Customer Details */}
                <div>
                  <h4 className="font-bold text-base text-foreground">{review.name}</h4>
                  <p className="text-xs text-primary mt-0.5">{review.service}</p>
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
