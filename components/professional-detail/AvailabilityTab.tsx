"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AvailabilityTab() {
  const [selectedDate, setSelectedDate] = useState("18");
  const [selectedTime, setSelectedTime] = useState("9:30 AM");

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Calendar Widget */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-card border border-border max-w-lg shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-accent hover:bg-accent/80 border border-border flex items-center justify-center text-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-title text-xl sm:text-2xl font-bold text-foreground">
            July 2025
          </h3>
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-accent hover:bg-accent/80 border border-border flex items-center justify-center text-foreground transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <span key={i} className="text-xs font-medium text-muted-foreground py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {[
              { day: "14", disabled: false },
              { day: "15", disabled: false },
              { day: "16", disabled: true },
              { day: "17", disabled: false },
              { day: "18", disabled: false },
              { day: "19", disabled: false },
              { day: "20", disabled: true },
            ].map((item, idx) => (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={() => setSelectedDate(item.day)}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all text-center ${
                  item.disabled
                    ? "text-muted-foreground/40 opacity-40 cursor-not-allowed font-light"
                    : selectedDate === item.day
                    ? "text-primary font-bold bg-accent/60"
                    : "text-foreground hover:text-primary cursor-pointer"
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slots 5-Column Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {[
          "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
          "11:30 AM", "12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM",
          "3:00 PM", "4:00 PM", "5:00 PM", "5:30 PM", "6:00 PM",
          "6:30 PM", "7:00 PM"
        ].map((t, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedTime(t)}
            className={`py-3.5 px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${
              selectedTime === t
                ? "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-primary shadow-xs"
                : "bg-card hover:bg-accent text-foreground font-medium border-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

