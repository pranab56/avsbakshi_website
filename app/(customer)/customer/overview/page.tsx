"use client";

import { useGetCustomerOverviewQuery } from "@/features/analytics/analyticsApi";
import { Calendar, CheckCircle2, Star, Heart, Clock, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function CustomerOverviewPage() {
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);
  const { data: overviewRes, isLoading } = useGetCustomerOverviewQuery(undefined);
  const overview = overviewRes?.data || {};

  const customerName = user?.firstName || user?.name || "Customer";

  const stats = [
    {
      label: "Total Appointments",
      value: overview.totalAppointments ?? 0,
      icon: Calendar,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Upcoming Appointments",
      value: overview.totalUpcomingAppointments ?? 0,
      icon: Clock,
      color: "text-[#D99722] bg-[#D99722]/10 border-[#D99722]/20",
    },
    {
      label: "Completed Appointments",
      value: overview.totalCompletedAppointments ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Total Reviews",
      value: overview.totalReviews ?? 0,
      icon: Star,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Saved Wishlists",
      value: overview.totalWishlists ?? 0,
      icon: Heart,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="font-serif italic font-normal text-2xl sm:text-4xl text-foreground">
          Welcome back, <span className="notranslate" translate="no">{customerName}</span>.
        </h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-32 bg-card border border-border/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border/70 rounded-2xl p-5 transition-all shadow-2xs hover:border-[#D99722]/50 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="font-serif italic text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
