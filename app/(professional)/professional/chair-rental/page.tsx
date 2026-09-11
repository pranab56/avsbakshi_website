"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, MapPin, X, Calendar, CheckCircle2 } from "lucide-react";

interface ChairListing {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  rating: number;
  reviewCount: number;
  location: string;
  tags: string[];
  openBadge: string;
  image: string;
  isFavorite?: boolean;
}

interface BookingRecord {
  id: string;
  salonName: string;
  image: string;
  dateRange: string;
  duration: string;
  price: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const CHAIR_LISTINGS: ChairListing[] = [
  {
    id: "1",
    name: "Noir Studio",
    category: "Hair & Beauty",
    price: "from $55",
    priceNum: 55,
    rating: 4.8,
    reviewCount: 89,
    location: "Soho, New York",
    tags: ["Haircut", "Colour", "Blowout"],
    openBadge: "Open until 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    isFavorite: false,
  },
  {
    id: "2",
    name: "The Ritual",
    category: "Skincare & Wellness",
    price: "from $90",
    priceNum: 90,
    rating: 4.8,
    reviewCount: 89,
    location: "Beverly Hills, Los Angeles",
    tags: ["Haircut", "Colour", "Blowout"],
    openBadge: "Open until 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Golden Ratio",
    category: "Barbershop",
    price: "from $40",
    priceNum: 40,
    rating: 4.8,
    reviewCount: 89,
    location: "West Loop, Chicago",
    tags: ["Haircut", "Colour", "Blowout"],
    openBadge: "Open until 9:30 PM",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    isFavorite: false,
  },
];

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "b1",
    salonName: "Noir Studio",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80",
    dateRange: "26 Aug – 2 Sep",
    duration: "8 days",
    price: "$360",
    status: "Confirmed",
  },
  {
    id: "b2",
    salonName: "The Ritual",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    dateRange: "14–15 Sep",
    duration: "2 days",
    price: "$120",
    status: "Pending",
  },
];

export default function ProfessionalChairRentalPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "bookings">("browse");
  const [listings, setListings] = useState<ChairListing[]>(CHAIR_LISTINGS);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);

  // Modal State for Booking a Chair
  const [selectedChair, setSelectedChair] = useState<ChairListing | null>(null);
  const [startDate, setStartDate] = useState("2026-09-10");
  const [endDate, setEndDate] = useState("2026-09-12");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const toggleFavorite = (id: string) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleBookChairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChair) return;

    const newBooking: BookingRecord = {
      id: `b-${Date.now()}`,
      salonName: selectedChair.name,
      image: selectedChair.image,
      dateRange: "10–12 Sep",
      duration: "3 days",
      price: `$${selectedChair.priceNum * 3}`,
      status: "Pending",
    };

    setBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(true);

    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedChair(null);
      setActiveTab("bookings");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Chair Rental
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Find a workspace when you need it
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("browse")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "browse"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Browse Chairs
          {activeTab === "browse" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "bookings"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          My Bookings
          {activeTab === "bookings" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Browse Chairs */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-primary/50"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 bg-accent">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Open Status Badge */}
                {item.openBadge && (
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-xs text-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-xs border border-border">
                    {item.openBadge}
                  </span>
                )}

                {/* Heart Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Save chair to favorites"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-xs flex items-center justify-center text-primary hover:bg-background transition-all cursor-pointer shadow-xs border border-border"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      item.isFavorite
                        ? "fill-primary text-primary"
                        : "text-primary"
                    }`}
                  />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Title & Price Row */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-serif italic font-bold text-lg sm:text-xl text-primary shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.category}
                  </p>

                  {/* Star Rating Row */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <div className="flex items-center gap-0.5 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="text-foreground font-medium ml-1">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    <span>{item.location}</span>
                  </div>

                  {/* Amenity Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-accent text-muted-foreground px-3 py-1 border border-border rounded-sm text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Chair Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedChair(item)}
                    className="w-full text-center bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground py-2.5 rounded-sm font-medium text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Book Chair
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: My Bookings */}
      {activeTab === "bookings" && (
        <div className="space-y-4 pt-2 max-w-5xl">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card border border-border rounded-lg p-4 sm:p-5 flex items-center justify-between shadow-xs hover:border-primary/50 transition-all"
              >
                {/* Left Side: Thumbnail & Title */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-accent shrink-0 border border-border">
                    <Image
                      src={booking.image}
                      alt={booking.salonName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-foreground leading-tight">
                      {booking.salonName}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                      {booking.dateRange} · {booking.duration}
                    </p>
                  </div>
                </div>

                {/* Right Side: Status Badge & Total Price */}
                <div className="text-right space-y-1 sm:space-y-2">
                  <div>
                    <span
                      className={`inline-block text-xs font-medium px-3 py-0.5 rounded-full border ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : booking.status === "Pending"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="font-serif font-bold text-lg sm:text-xl text-foreground">
                    {booking.price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-accent/60 border border-border rounded-lg p-12 text-center text-muted-foreground space-y-2">
              <p className="font-serif text-lg text-foreground">No active chair bookings found.</p>
              <p className="text-xs">Browse chairs and select dates to book a station.</p>
            </div>
          )}
        </div>
      )}

      {/* Book Chair Dialog Modal */}
      {selectedChair && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 space-y-5 text-foreground">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="space-y-0.5">
                <h3 className="font-serif font-bold text-xl text-foreground">
                  Book a Chair at {selectedChair.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {selectedChair.location} · {selectedChair.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChair(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-serif font-bold text-lg text-foreground">
                  Booking Request Sent!
                </h4>
                <p className="text-xs text-muted-foreground">
                  Redirecting to your bookings...
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookChairSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                    <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                    <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-accent/70 border border-border rounded-lg p-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Daily Rate</span>
                    <span className="font-medium text-foreground">
                      ${selectedChair.priceNum} / day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration</span>
                    <span className="font-medium text-foreground">3 Days</span>
                  </div>
                  <div className="border-t border-border pt-1 mt-1 flex justify-between font-semibold text-foreground text-sm">
                    <span>Total</span>
                    <span className="font-serif text-primary">
                      ${selectedChair.priceNum * 3}
                    </span>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedChair(null)}
                    className="flex-1 bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80 py-2.5 rounded-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-sm font-medium transition-colors cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
