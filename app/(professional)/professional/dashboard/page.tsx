"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  Building2,
  Sparkles,
  BarChart2,
} from "lucide-react";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import { useGetProfessionalOverviewQuery } from "@/features/analytics/analyticsApi";
import { getUser } from "@/utils/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DEFAULT_CHART_DATA = MONTHS.map((month) => ({
  month,
  count: 0,
}));

import { StatsSkeletonGrid, Skeleton } from "@/components/ui/skeleton";

export default function ProfessionalDashboardPage() {
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined);
  const { data: overviewRes, isLoading: isOverviewLoading } = useGetProfessionalOverviewQuery(undefined);

  const profileData = profileResponse?.data || profileResponse;
  const storedUser = typeof window !== "undefined" ? getUser() : null;
  const currentUser = profileData || user || storedUser;
  const storedDisplayName =
    typeof window !== "undefined"
      ? localStorage.getItem("userDisplayName") ||
        (currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim() : null)
      : null;

  const isSalonOwnerFromApi =
    profileData?.isSalonOwner ??
    profileData?.user?.isSalonOwner ??
    profileResponse?.data?.isSalonOwner ??
    profileResponse?.isSalonOwner;
  const isSalonOwnerFromUser = currentUser?.isSalonOwner ?? currentUser?.user?.isSalonOwner;
  const storedIsSalonOwner = typeof window !== "undefined" ? localStorage.getItem("isSalonOwner") : null;
  const isSalonOwner = Boolean(
    isSalonOwnerFromApi !== undefined
      ? isSalonOwnerFromApi
      : isSalonOwnerFromUser !== undefined
        ? isSalonOwnerFromUser
        : storedIsSalonOwner !== null
          ? storedIsSalonOwner === "true"
          : false
  );

  const overview = overviewRes?.data || {};

  useEffect(() => {
    if (profileData && typeof window !== "undefined") {
      const fullName = profileData.firstName
        ? `${profileData.firstName} ${profileData.lastName || ""}`.trim()
        : profileData.name;
      if (fullName) {
        localStorage.setItem("userDisplayName", fullName);
      }
    }
  }, [profileData]);

  const proName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
    : storedDisplayName || currentUser?.name || user?.name || "Business Professional";

  const statCards = [
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
  ];

  const chartData = Array.isArray(overview.monthlyAppointmentsGrowth) && overview.monthlyAppointmentsGrowth.length > 0
    ? overview.monthlyAppointmentsGrowth.map((item: any) => ({
      month: item.month,
      count: item.count || 0,
    }))
    : DEFAULT_CHART_DATA;

  return (
    <div className="space-y-6 pb-16">
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
        <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
          Good day, <span className="notranslate" translate="no">{proName}</span>.
        </h1>
      </div>

      {/* Create Business Banner CTA (only shown if not already a salon owner, without blank placeholder box) */}
      {!isSalonOwner && !isProfileLoading && (
        <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-card border border-primary/30 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">Create &amp; Manage Your Salon Business</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Setup your salon page, list services, configure chair spaces, and start accepting client bookings directly.
            </p>
          </div>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Business</span>
          </Link>
        </div>
      )}

      {/* Top 4 Stat Cards Grid */}
      {isOverviewLoading ? (
        <StatsSkeletonGrid count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border/70 rounded-2xl p-5 shadow-2xs hover:border-[#D99722]/50 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
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

      {/* Monthly Appointments Growth Chart */}
      <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#D99722]" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Monthly Appointments Growth
              </h2>
            </div>
            <p className="text-xs text-muted-foreground font-normal">
              Overview of your appointment trends throughout the year
            </p>
          </div>
        </div>

        {isOverviewLoading ? (
          <div className="h-64 w-full pt-4">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : (
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 28, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A1A1AA", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A1A1AA", fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#27272A] text-white border border-zinc-700 text-xs px-3 py-2 rounded-xl shadow-xl space-y-0.5 z-50">
                        <p className="font-bold text-white">{data.month}</p>
                        <p className="text-[#D99722] font-semibold">
                          {data.count} {data.count === 1 ? "appointment" : "appointments"}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
                <LabelList
                  dataKey="count"
                  position="top"
                  formatter={(val: any) => (Number(val) > 0 ? val : "")}
                  style={{
                    fill: "#F4F4F5",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
                {chartData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count > 0 ? "#D99722" : "rgba(255, 255, 255, 0.08)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      </div>
    </div>
  );
}
