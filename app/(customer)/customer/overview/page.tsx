"use client";

import Image from "next/image";
import { Activity } from "lucide-react";

export default function CustomerOverviewPage() {
  const stats = [
    { label: "Upcoming appointments", value: "2", isHighlighted: false },
    { label: "Completed this year", value: "18", isHighlighted: false },
    { label: "Reviews given", value: "14", isHighlighted: false },
    { label: "Saved professionals", value: "7", isHighlighted: true },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from £40",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from £74",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      title: "Appointment confirmed with Sofia Martinez",
      subtitle: "19 Aug · Balayage & Toner",
    },
    {
      id: "2",
      title: "Payment of £55 processed",
      subtitle: "Classic Cut & Beard · James Chen",
    },
    {
      id: "3",
      title: "You left a review for Aisha Williams",
      subtitle: "5 stars · Bridal Makeup",
    },
    {
      id: "4",
      title: "Saved Priya Sharma to favourites",
      subtitle: "Nail Artist · Notting Hill",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          Monday, 19 August 2026
        </p>
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Good morning, Rasel.
        </h1>
      </div>

      {/* Top Metric Cards (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#FDFDFD] border border-gray-200 rounded-lg p-5 sm:p-6 transition-all"
          >
            <div
              className={`font-serif italic text-3xl sm:text-4xl font-normal mb-2.5 ${stat.isHighlighted ? "text-[#A27933]" : "text-[#2C2E33]"
                }`}
            >
              {stat.value}
            </div>
            <p className="text-xs sm:text-sm text-[#787570] font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid: Left Column (Appointments) & Right Column (Activity & Callout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column - Upcoming Appointments */}
        <div className="lg:col-span-8 space-y-4">
          {upcomingAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-[#FDFDFD] border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail Avatar */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-[#E0D9CE]">
                  <Image
                    src={appt.image}
                    alt={appt.stylistName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info Text */}
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2C2E33] leading-tight">
                    {appt.stylistName}
                  </h3>
                  <p className="text-[#A27933] font-medium text-xs sm:text-sm">
                    {appt.service}
                  </p>
                  <p className="text-xs sm:text-sm text-[#787570] flex items-center gap-2">
                    <span>{appt.dateTime}</span>
                    <span className="font-serif italic font-bold text-[#A27933] text-sm sm:text-base ml-1">
                      {appt.price}
                    </span>
                  </p>
                </div>
              </div>

              {/* Reschedule Action Button */}
              <div className="sm:self-center">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Recent Activity & Unreviewed Visits */}
        <div className="lg:col-span-4 space-y-5">
          {/* Recent Activity Card */}
          <div className="bg-[#FDFDFD] border border-gray-200 rounded-md p-5 sm:p-6 space-y-4">
            <h2 className="font-serif italic font-normal text-lg sm:text-xl text-[#2C2E33]">
              Recent Activity
            </h2>

            <div className="divide-y divide-gray-200">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3"
                >
                  {/* Icon Badge */}
                  <div className="w-11 h-11 rounded-sm bg-[#F3F0EA] flex items-center justify-center text-[#787570] shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-[#787570]" />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-0.5 text-left">
                    <p className="text-xs sm:text-sm font-medium text-[#2C2E33] leading-snug">
                      {act.title}
                    </p>
                    <p className="text-xs text-[#787570]">{act.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unreviewed Visits Callout Card */}
          <div className="bg-[#F4EBE0] border border-[#F4EBE0] rounded-lg p-5 sm:p-6 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2C2E33] leading-tight">
              You have 2 unreviewed visits
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
              Share your experience and help others discover great
              professionals.
            </p>
            <div className="pt-1">
              <button
                type="button"
                className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
