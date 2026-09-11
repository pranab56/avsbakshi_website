"use client";

import { useState } from "react";
import Image from "next/image";

export default function CustomerBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingBookings = [
    {
      id: "1",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from $40",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from $74",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const pastBookings = [
    {
      id: "3",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from $40",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "4",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from $74",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const currentBookings =
    activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          My Bookings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Find your bookings lists
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "upcoming"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming
          {activeTab === "upcoming" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${
            activeTab === "past"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Past
          {activeTab === "past" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Bookings List */}
      <div className="max-w-3xl space-y-4 pt-2">
        {currentBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-card border border-border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail Image */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-sm overflow-hidden shrink-0 bg-accent">
                <Image
                  src={booking.image}
                  alt={booking.stylistName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Booking Info */}
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground leading-tight">
                  {booking.stylistName}
                </h3>
                <p className="text-primary font-medium text-xs sm:text-sm">
                  {booking.service}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <span>{booking.dateTime}</span>
                  <span className="font-serif italic font-bold text-primary text-sm sm:text-base ml-1">
                    {booking.price}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="sm:self-center">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer"
              >
                {activeTab === "upcoming" ? "Reschedule" : "Re-Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}