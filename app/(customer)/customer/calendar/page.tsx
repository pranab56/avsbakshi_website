"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalendarView = "Month" | "Week" | "Day";

export default function CustomerCalendarPage() {
  const [view, setView] = useState<CalendarView>("Month");
  const currentMonth = "August 2026";

  // Sample appointments matching the reference images
  const appointments = [
    {
      id: "1",
      stylist: "Sofia Martinez",
      shortName: "Sofia",
      service: "Balayage & Toner",
      date: "2026-08-19",
      dayNumber: 19,
      time: "2:30 PM",
      fullTime: "2:30 PM – 5:00 PM",
      price: "$175",
      color: "bg-[#A27933]",
    },
    {
      id: "2",
      stylist: "James Chen",
      shortName: "James",
      service: "Classic Cut & Beard",
      date: "2026-08-24",
      dayNumber: 24,
      time: "11:00 AM",
      fullTime: "11:00 AM – 12:30 PM",
      price: "$55",
      color: "bg-[#2C2E33]",
    },
  ];

  // Month grid days definition (August 2026: starts on Saturday, Aug 1)
  // Mon Tue Wed Thu Fri Sat Sun
  //               1   2   3   4
  // 5   6   7   8   9   10  11
  // 12  13  14  15  16  17  18
  // 19  20  21  22  23  24  25
  // 26  27  28  29  30  31
  const monthDays = [
    { day: null, isCurrentMonth: false },
    { day: null, isCurrentMonth: false },
    { day: null, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true, isHighlight: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: null, isCurrentMonth: false },
  ];

  // Week View Days (Mon Aug 19 to Sun Aug 25)
  const weekDays = [
    { dayName: "Mon", dateNum: 19, isHighlighted: true },
    { dayName: "Tue", dateNum: 20, isHighlighted: false },
    { dayName: "Wed", dateNum: 21, isHighlighted: false },
    { dayName: "Thu", dateNum: 22, isHighlighted: false },
    { dayName: "Fri", dateNum: 23, isHighlighted: false },
    { dayName: "Sat", dateNum: 24, isHighlighted: false },
    { dayName: "Sun", dateNum: 25, isHighlighted: false },
  ];

  const timeSlots = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Month / Year Title */}
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          {currentMonth}
        </h1>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-3">
          {/* Prev Button */}
          <Button
            variant="ghost"
            size="lg"
            className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-3 rounded-md flex items-center gap-1 cursor-pointer border-0"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Prev</span>
          </Button>

          {/* View Segmented Control */}
          <div className="bg-accent p-1 rounded-md flex items-center gap-1">
            {(["Month", "Week", "Day"] as CalendarView[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3.5 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  view === v
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="lg"
            className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-3 rounded-md flex items-center gap-1 cursor-pointer border-0"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW 1: MONTH VIEW */}
      {/* ------------------------------------------------------------- */}
      {view === "Month" && (
        <div className="overflow-x-auto rounded-lg border border-border shadow-xs">
          <div className="bg-card min-w-[640px] overflow-hidden">
            {/* Days of Week Header Row */}
            <div className="grid grid-cols-7 bg-accent/60 border-b border-border text-center text-xs font-semibold text-muted-foreground py-3">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Days Grid (5 Rows x 7 Cols) */}
            <div className="grid grid-cols-7 divide-x divide-y divide-border bg-card">
              {monthDays.map((item, index) => {
                const appt = appointments.find((a) => a.dayNumber === item.day);
                return (
                  <div
                    key={index}
                    className={`min-h-[90px] sm:min-h-[110px] p-2 flex flex-col justify-between transition-colors ${
                      item.isHighlight ? "bg-primary/10" : "hover:bg-accent/40"
                    }`}
                  >
                    <span
                      className={`text-xs font-medium ${
                        item.isHighlight
                          ? "text-primary font-bold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.day || ""}
                    </span>

                    {/* Appointment Event Pill */}
                    {appt && (
                      <div
                        className={`w-full text-white text-[11px] font-medium px-2 py-1.5 rounded-sm shadow-2xs leading-tight flex items-center justify-between ${
                          appt.color === "bg-[#2C2E33]" ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <span className="">
                          {appt.shortName} · {appt.time}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 2: WEEK VIEW */}
      {/* ------------------------------------------------------------- */}
      {view === "Week" && (
        <div className="overflow-x-auto rounded-2xl border border-border shadow-xs">
          <div className="bg-card min-w-[640px] overflow-hidden">
            {/* Week Header Row */}
            <div className="grid grid-cols-8 border-b border-border bg-accent/60 text-center py-3">
              <div className="text-xs text-muted-foreground font-medium self-center"></div>
              {weekDays.map((wd, i) => (
                <div key={i} className="space-y-0.5">
                  <span className="text-xs text-muted-foreground font-medium block">
                    {wd.dayName}
                  </span>
                  <span
                    className={`font-serif text-lg font-bold block ${
                      wd.isHighlighted ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {wd.dateNum}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Slots Table */}
            <div className="divide-y divide-border bg-card">
              {timeSlots.slice(1, 10).map((time, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-8 min-h-[90px] divide-x divide-border">
                  {/* Time Label */}
                  <div className="p-2 text-[11px] text-muted-foreground font-medium text-right pr-3 flex items-center justify-end">
                    {time}
                  </div>

                  {/* 7 Days Columns */}
                  {weekDays.map((wd, colIdx) => {
                    // Check if Sofia appt on Mon 19 at 2 PM
                    const isSofia = wd.dateNum === 19 && time === "2 PM";
                    // Check if James appt on Sat 24 at 11 AM
                    const isJames = wd.dateNum === 24 && time === "11 AM";

                    return (
                      <div
                        key={colIdx}
                        className="p-1 relative hover:bg-accent/40 transition-colors flex items-center"
                      >
                        {isSofia && (
                          <div className="w-full bg-primary text-primary-foreground h-[62px] flex justify-center items-center p-2 rounded-sm text-xs font-medium shadow-2xs">
                            Sofia 2:30
                          </div>
                        )}
                        {isJames && (
                          <div className="w-full bg-foreground text-background h-[62px] flex justify-center items-center p-2.5 rounded-sm text-xs font-medium shadow-2xs">
                            James 11:00
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* VIEW 3: DAY VIEW */}
      {/* ------------------------------------------------------------- */}
      {view === "Day" && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-xs space-y-6">
          {/* Day Title */}
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
            Monday 19 August
          </h2>

          {/* Timeline */}
          <div className="space-y-4 pt-2">
            {timeSlots.map((time, idx) => {
              const is2PM = time === "2 PM";
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Time label */}
                  <span className="w-14 text-xs font-medium text-muted-foreground text-right pt-0.5 shrink-0">
                    {time}
                  </span>

                  {/* Horizontal Guideline & Event Container */}
                  <div className="flex-1 border-t border-dashed border-border pt-2 min-h-[44px]">
                    {is2PM && (
                      <div className="bg-primary text-primary-foreground rounded-xl p-4 shadow-sm space-y-1 transition-all">
                        <div className="font-bold text-sm sm:text-base">
                          Sofia Martinez
                        </div>
                        <div className="text-xs sm:text-sm text-primary-foreground/90">
                          Balayage & Toner · 2:30 PM – 5:00 PM · £175
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}