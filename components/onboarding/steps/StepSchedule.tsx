"use client";

interface DayAvailability {
  day: string;
  openTime: string;
  closeTime: string;
  isAvailable: boolean;
}

interface StepScheduleProps {
  formData: {
    availability: DayAvailability[];
  };
  handleAvailabilityToggle: (index: number) => void;
  handleAvailabilityTimeChange: (
    index: number,
    field: "openTime" | "closeTime",
    value: string
  ) => void;
}

export default function StepSchedule({
  formData,
  handleAvailabilityToggle,
  handleAvailabilityTimeChange,
}: StepScheduleProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200 pt-2">
      <div className="space-y-3">
        <label className="text-xs font-semibold text-foreground block">
          Weekly Opening Hours Schedule
        </label>

        <div className="space-y-2">
          {formData.availability.map((dayItem, idx) => (
            <div
              key={dayItem.day}
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-card/60 gap-3"
            >
              <div className="flex items-center gap-3 w-32 shrink-0">
                <input
                  type="checkbox"
                  checked={dayItem.isAvailable}
                  onChange={() => handleAvailabilityToggle(idx)}
                  className="w-4 h-4 accent-primary rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-foreground">
                  {dayItem.day}
                </span>
              </div>

              {dayItem.isAvailable ? (
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <input
                    type="time"
                    value={dayItem.openTime}
                    onChange={(e) =>
                      handleAvailabilityTimeChange(idx, "openTime", e.target.value)
                    }
                    className="bg-accent/50 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-xs text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={dayItem.closeTime}
                    onChange={(e) =>
                      handleAvailabilityTimeChange(idx, "closeTime", e.target.value)
                    }
                    className="bg-accent/50 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic text-right flex-1">
                  Closed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
