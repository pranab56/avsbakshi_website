"use client";

import { useState } from "react";
import Image from "next/image";
import { TrendingUp, Star, Armchair, CreditCard, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export default function ProfessionalDashboardPage() {
  const [revenueFilter, setRevenueFilter] = useState("This Week");

  const recentBookings = [
    {
      id: "1",
      stylistName: "Sofia Martinez",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from £145",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      stylistName: "James Chen",
      service: "Classic Haircut & Blowout",
      dateTime: "Mon 19 Aug · 4:15 PM",
      price: "from £65",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const recentActivities = [
    {
      id: "a1",
      title: "Jade Wilson booked Full Colour",
      time: "5 min ago",
      icon: TrendingUp,
    },
    {
      id: "a2",
      title: "New 5★ review from Rachel Thompson",
      time: "2h ago",
      icon: Star,
    },
    {
      id: "a3",
      title: "Chair A reserved for 11 days",
      time: "3h ago",
      icon: Armchair,
    },
    {
      id: "a4",
      title: "Payout £1,840 to Barclays • • 8822",
      time: "Yesterday",
      icon: CreditCard,
    },
  ];

  // Recharts Data Setup
  const chartData = [
    { day: "Mon", revenue: 280, label: "£280", isCurrent: true },
    { day: "Tue", revenue: 350, label: "£350", isCurrent: false },
    { day: "Wed", revenue: 190, label: "£190", isCurrent: false },
    { day: "Thu", revenue: 420, label: "£420", isCurrent: false },
    { day: "Fri", revenue: 310, label: "£310", isCurrent: false },
    { day: "Sat", revenue: 500, label: "£500", isCurrent: false },
    { day: "Sun", revenue: 0, label: "£0", isCurrent: false },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          Monday, 19 August 2026
        </p>
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Good morning, James.
        </h1>
      </div>

      {/* Top 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            4
          </div>
          <p className="text-xs text-[#787570] font-normal">Today&apos;s Bookings</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            £280
          </div>
          <p className="text-xs text-[#787570] font-normal">Today&apos;s Revenue</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            6.5 hrs
          </div>
          <p className="text-xs text-[#787570] font-normal">Hours Worked</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs hover:border-[#B78735]/40 transition-colors">
          <div className="font-serif italic text-3xl font-normal text-[#B78735] mb-1">
            4.9
          </div>
          <p className="text-xs text-[#787570] font-normal">Average Rating</p>
        </div>
      </div>

      {/* Two Column Layout (Left: Chart & Bookings, Right: Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Revenue Overview Card with Recharts */}
          <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h2 className="font-serif italic font-normal text-xl sm:text-2xl text-[#2C2E33]">
                  Earnings Overview
                </h2>
                <p className="text-xs text-[#787570] font-normal">
                  Week of 19–25 Aug · £2,050 total
                </p>
              </div>

              <div className="relative inline-flex items-center">
                <select
                  value={revenueFilter}
                  onChange={(e) => setRevenueFilter(e.target.value)}
                  className="bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-3.5 py-2 pr-9 text-xs font-semibold text-[#2C2E33] outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] hover:border-[#B78735]/60 transition-colors shadow-2xs"
                >
                  <option value="This Week">This Week</option>
                  <option value="Last Week">Last Week</option>
                  <option value="This Month">This Month</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#787570] absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Recharts Responsive BarChart */}
            <div className="h-56 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 25, right: 10, left: 10, bottom: 0 }}
                >
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={({ x, y, payload }: { x?: number | string; y?: number | string; payload?: { value: string } }) => (
                      <text
                        x={x}
                        y={Number(y || 0) + 14}
                        textAnchor="middle"
                        fill={payload?.value === "Mon" ? "#B78735" : "#787570"}
                        fontSize={12}
                        fontWeight={payload?.value === "Mon" ? "bold" : "normal"}
                      >
                        {payload?.value}
                      </text>
                    )}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(227, 221, 211, 0.25)" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1C1C1E] text-white text-xs px-3 py-1.5 rounded-md shadow-md">
                            <span className="font-semibold">{data.day}: </span>
                            <span className="text-[#B78735] font-bold">
                              {data.label}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={48}>
                    <LabelList
                      dataKey="label"
                      position="top"
                      style={{
                        fill: "#2C2E33",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    />
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? "#B78735" : "#DCD5C9"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="space-y-4">
            <h2 className="font-serif italic font-normal text-xl sm:text-2xl text-[#2C2E33]">
              Recent Bookings
            </h2>

            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#B78735]/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[#E0D9CE] shrink-0 border border-[#E3DDD3]/70">
                      <Image
                        src={b.image}
                        alt={b.stylistName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg text-[#2C2E33]">
                        {b.stylistName}
                      </h3>
                      <p className="text-xs font-semibold text-[#B78735]">
                        {b.service}
                      </p>
                      <p className="text-xs text-[#787570] font-normal flex items-center gap-1.5 flex-wrap">
                        <span>{b.dateTime}</span>
                        <span className="font-serif italic text-[#B78735] font-bold text-sm">
                          {b.price}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-6 space-y-5 shadow-xs">
            <h3 className="font-serif italic font-normal text-xl text-[#2C2E33]">
              Recent Activity
            </h3>

            <div className="divide-y divide-[#E3DDD3]/60 space-y-3">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className="pt-3 first:pt-0 flex items-start gap-3 pb-5"
                  >
                    <div className="w-10 h-10 rounded-md bg-[#FAF8F4] border border-[#E3DDD3]/70 flex items-center justify-center text-[#B78735] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#B78735]" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-xs sm:text-sm text-[#2C2E33] leading-snug">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-[#787570] font-normal">
                        {act.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
