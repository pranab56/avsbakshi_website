"use client";

import { useState } from "react";
import { Clock, Calendar, CheckCircle2, XCircle } from "lucide-react";

interface AvailabilityTabProps {
  proData?: any;
}

function formatTimeWithAMPM(timeStr?: string): string {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase().includes("am") || trimmed.toLowerCase().includes("pm")) {
    return trimmed;
  }
  const parts = trimmed.split(":");
  if (parts.length < 2) return trimmed;

  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];

  if (isNaN(hours)) return trimmed;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${formattedHours}:${minutes} ${ampm}`;
}

export default function AvailabilityTab({ proData }: AvailabilityTabProps) {
  const [selectedTime, setSelectedTime] = useState("09:30 AM");

  const rawAvailability = Array.isArray(proData?.availability) ? proData.availability : [];

  const defaultSchedule = [
    { day: "Monday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Tuesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Wednesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Thursday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Friday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Saturday", openTime: "09:00", closeTime: "18:00", isAvailable: true },
    { day: "Sunday", openTime: "00:00", closeTime: "00:00", isAvailable: false },
  ];

  const scheduleList = rawAvailability.length > 0 ? rawAvailability : defaultSchedule;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Weekly Working Hours Schedule (From API) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Weekly Availability Schedule</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Working days & operating hours provided by API
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {scheduleList.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${item.isAvailable
                ? "bg-accent/30 border-border"
                : "bg-muted/40 border-border/40 opacity-60"
                }`}
            >
              <div className="flex items-center gap-2.5">
                {item.isAvailable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <span className="text-xs font-bold text-foreground">{item.day}</span>
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                {item.isAvailable
                  ? `${formatTimeWithAMPM(item.openTime || "09:00")} - ${formatTimeWithAMPM(item.closeTime || "19:00")}`
                  : "Closed / Off"}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
