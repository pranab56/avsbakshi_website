"use client";

import { useState } from "react";
import Image from "next/image";

type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
type TabType = "All" | "Pending" | "Confirmed" | "Cancelled";

interface Booking {
  id: string;
  clientName: string;
  clientAvatar: string;
  service: string;
  dateTime: string;
  duration: string;
  price: string;
  status: BookingStatus;
}

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: "1",
    clientName: "Rachel Thompson",
    clientAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    service: "Balayage & Toner",
    dateTime: "Today · 10:00 AM",
    duration: "150min",
    price: "$175",
    status: "Confirmed",
  },
  {
    id: "2",
    clientName: "Marcus Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    service: "Skin Fade & Beard Trim",
    dateTime: "Today · 11:30 AM",
    duration: "60min",
    price: "$65",
    status: "Confirmed",
  },
  {
    id: "3",
    clientName: "Ashley Morgan",
    clientAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    service: "Cut & Blowout",
    dateTime: "Today · 1:00 PM",
    duration: "75min",
    price: "$95",
    status: "Pending",
  },
  {
    id: "4",
    clientName: "James Holloway",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    service: "Classic Haircut",
    dateTime: "Today · 2:30 PM",
    duration: "45min",
    price: "$55",
    status: "Confirmed",
  },
  {
    id: "5",
    clientName: "Priya Daniels",
    clientAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80",
    service: "Gel Manicure",
    dateTime: "Today · 3:15 PM",
    duration: "60min",
    price: "$55",
    status: "Confirmed",
  },
  {
    id: "6",
    clientName: "Tyler Brooks",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    service: "Highlights & Gloss",
    dateTime: "Tomorrow · 9:00 AM",
    duration: "120min",
    price: "$145",
    status: "Cancelled",
  },
  {
    id: "7",
    clientName: "Samantha Reed",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    service: "Full Color",
    dateTime: "Tomorrow · 11:00 AM",
    duration: "150min",
    price: "$185",
    status: "Confirmed",
  },
  {
    id: "8",
    clientName: "Kevin Martinez",
    clientAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    service: "Beard Sculpting",
    dateTime: "Tomorrow · 2:00 PM",
    duration: "45min",
    price: "$45",
    status: "Confirmed",
  },
  {
    id: "9",
    clientName: "Olivia Grant",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    service: "LED Facial Treatment",
    dateTime: "Aug 20 · 10:30 AM",
    duration: "90min",
    price: "$120",
    status: "Cancelled",
  },
];


export default function ProfessionalBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter bookings based on activeTab
  const filteredBookings = SAMPLE_BOOKINGS.filter((booking) => {
    if (activeTab === "All") return true;
    return booking.status === activeTab;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Bookings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Monday, 19 August 2026
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border flex items-center gap-8 text-sm overflow-x-auto">
        {(["All", "Pending", "Confirmed", "Cancelled"] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-2.5 font-medium transition-all cursor-pointer whitespace-nowrap relative ${
                isActive
                  ? tab === "Cancelled"
                    ? "text-destructive"
                    : "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {isActive && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    tab === "Cancelled" ? "bg-destructive" : "bg-primary"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bookings Table Card Container */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xs">
        {/* Table Header (Desktop) */}
        <div className="bg-accent px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border hidden md:grid grid-cols-12 items-center">
          <div className="col-span-3">CLIENT</div>
          <div className="col-span-3">SERVICE</div>
          <div className="col-span-2">DATE & TIME</div>
          <div className="col-span-2">DURATION</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-1 text-right">STATUS</div>
        </div>

        {/* Table Rows List */}
        <div className="divide-y divide-border">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-0 text-sm hover:bg-accent/50 transition-colors"
              >
                {/* Client Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-md overflow-hidden bg-accent shrink-0 border border-border">
                    <Image
                      src={booking.clientAvatar}
                      alt={booking.clientName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    {booking.clientName}
                  </span>
                </div>

                {/* Service */}
                <div className="col-span-3 text-foreground font-medium text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-muted-foreground block font-normal">
                    Service:
                  </span>
                  {booking.service}
                </div>

                {/* Date & Time */}
                <div className="col-span-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-muted-foreground block font-normal">
                    Date & Time:
                  </span>
                  {booking.dateTime}
                </div>

                {/* Duration */}
                <div className="col-span-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-muted-foreground block font-normal">
                    Duration:
                  </span>
                  {booking.duration}
                </div>

                {/* Price */}
                <div className="col-span-1 font-serif italic font-bold text-foreground text-sm sm:text-base">
                  <span className="md:hidden text-xs text-muted-foreground block font-sans font-normal">
                    Price:
                  </span>
                  {booking.price}
                </div>

                {/* Status Badge */}
                <div className="col-span-1 md:text-right flex md:justify-end items-center pt-1 md:pt-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-2xs ${
                      booking.status === "Confirmed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : booking.status === "Pending"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground text-sm italic">
              No {activeTab.toLowerCase()} bookings found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1.5 text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer mr-2"
        >
          Prev
        </button>

        {/* Page Circles */}
        {[
          { num: 1, label: "01" },
          { num: 2, label: "02" },
          { num: 3, label: "03" },
          { num: 4, label: "04" },
          { num: 5, label: "05" },
        ].map((p) => (
          <button
            key={p.num}
            type="button"
            onClick={() => setCurrentPage(p.num)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
              currentPage === p.num
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}

        <span className="w-9 h-9 rounded-full bg-accent text-muted-foreground flex items-center justify-center text-xs font-medium">
          ...
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage(24)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
            currentPage === 24
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground"
          }`}
        >
          24
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, 24))}
          className="px-3 py-1.5 text-primary hover:underline font-medium transition-colors cursor-pointer ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
