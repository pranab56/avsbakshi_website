import { Calendar, CheckCircle2, XCircle } from "lucide-react";

interface AboutTabProps {
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

export default function AboutTab({ proData }: AboutTabProps) {
  const quote =
    proData?.quote ||
    "Precision fades and classic hot towel shaves crafted with care.";

  const bio =
    proData?.bio ||
    "Specializing in modern fades, traditional straight-razor shaves, and tailored beard sculpts with over 7 years in premium barbershops.";

  const experience = proData?.experienceYears ? `${proData.experienceYears} years` : "7 years";
  const reviewsCount = proData?.reviewsCount !== undefined ? proData.reviewsCount : 0;
  const avgRating = proData?.rating !== undefined ? `${proData.rating}★` : "5.0★";
  const specialtiesList: string[] =
    Array.isArray(proData?.specialties) && proData.specialties.length > 0
      ? proData.specialties
      : ["Skin Fades", "Beard Sculpting", "Hot Towel Shave", "Scissors Cut"];

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
    <div className="animate-in fade-in duration-150 space-y-8">
      {quote && (
        <blockquote className="font-light italic text-lg sm:text-xl text-foreground border-l-4 border-primary pl-6 py-2 leading-relaxed bg-accent/20 rounded-r-xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

      <div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
        <p className="whitespace-pre-line">{bio}</p>
      </div>

      {/* 4 Stat Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border space-y-1 shadow-xs">
          <h4 className="text-xl sm:text-2xl font-bold text-foreground">{experience}</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">Experience</p>
        </div>
        <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border space-y-1 shadow-xs">
          <h4 className="text-xl sm:text-2xl font-bold text-foreground">500+</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">Happy clients</p>
        </div>
        <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border space-y-1 shadow-xs">
          <h4 className="text-xl sm:text-2xl font-bold text-foreground">{reviewsCount}</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">Reviews</p>
        </div>
        <div className="bg-card p-4 sm:p-6 rounded-2xl text-center border border-border space-y-1 shadow-xs">
          <h4 className="text-xl sm:text-2xl font-bold text-foreground">{avgRating}</h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">Average rating</p>
        </div>
      </div>

      {/* Specialities Tags */}
      <div className="space-y-3 pt-6 border-t border-border">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em] block">
          SPECIALITIES & SKILLS
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {specialtiesList.map((tag, idx) => (
            <span
              key={idx}
              className="bg-accent text-foreground text-xs font-semibold px-4 py-2 rounded-xl border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Weekly Working Hours Schedule */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D99722]" />
              <span>Weekly Availability Schedule</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Working days & operating hours provided by specialist
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {scheduleList.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                item.isAvailable
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
