"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { toast } from "sonner";

interface DaySchedule {
  day: string;
  isOpen: boolean;
  start: string;
  end: string;
}

const TIME_OPTIONS = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
];

const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: "Monday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Tuesday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Wednesday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Thursday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Friday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Saturday", isOpen: true, start: "09:00 AM", end: "06:00 PM" },
  { day: "Sunday", isOpen: false, start: "09:00 AM", end: "06:00 PM" },
];

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [isSaving, setIsSaving] = useState(false);

  const toggleDayOpen = (index: number) => {
    setSchedule((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const updateStartTime = (index: number, newTime: string) => {
    setSchedule((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, start: newTime } : item
      )
    );
  };

  const updateEndTime = (index: number, newTime: string) => {
    setSchedule((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, end: newTime } : item
      )
    );
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Availability settings saved successfully!");
    }, 400);
  };

  // Dynamic stats calculated from schedule
  const openDaysCount = schedule.filter((s) => s.isOpen).length;
  const sundaySchedule = schedule.find((s) => s.day === "Sunday");
  const sundayStatus = sundaySchedule?.isOpen ? "Open" : "Closed";
  const totalWeeklyHours = openDaysCount * 9; // average 9 hrs per open day

  return (
    <div className="space-y-6 pb-16 font-sans text-[#1A1A1A]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
            Availability
          </h1>
          <p className="text-xs sm:text-sm text-[#787570] font-normal">
            Manage your working hours, breaks, and daily schedule
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="px-6 py-2.5 bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium rounded-sm shadow-xs transition-colors cursor-pointer disabled:opacity-70 active:scale-[0.98] self-start sm:self-auto"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Stat Metric Cards matching business-profile overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {openDaysCount} Days
          </div>
          <p className="text-xs text-[#787570] font-normal">Working Days / Week</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {totalWeeklyHours} hrs
          </div>
          <p className="text-xs text-[#787570] font-normal">Total Weekly Hours</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {sundayStatus}
          </div>
          <p className="text-xs text-[#787570] font-normal">Sunday Status</p>
        </div>
      </div>

      {/* Schedule Table Container */}
      <div className="bg-white border border-[#E3DDD3]/70 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F3F0EA] border-b border-[#E3DDD3]/70 text-[11px] font-semibold uppercase tracking-wider text-[#787570]">
                <th className="py-3.5 px-6 w-1/4">DAY</th>
                <th className="py-3.5 px-4 w-1/6">STATUS</th>
                <th className="py-3.5 px-4 w-1/3">START TIME</th>
                <th className="py-3.5 px-6 w-1/3">END TIME</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E3DDD3]/60 text-xs sm:text-sm">
              {schedule.map((item, idx) => (
                <tr
                  key={item.day}
                  className={`transition-colors ${
                    item.isOpen
                      ? "bg-white hover:bg-[#FAF8F4]"
                      : "bg-[#FAF8F4]/60"
                  }`}
                >
                  {/* Day Column */}
                  <td className="py-4 px-6">
                    <span
                      className={`font-semibold ${
                        item.isOpen ? "text-[#2C2E33]" : "text-[#787570]"
                      }`}
                    >
                      {item.day}
                    </span>
                  </td>

                  {/* Open Toggle Switch Column */}
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => toggleDayOpen(idx)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer focus:outline-none ${
                        item.isOpen ? "bg-[#B78735]" : "bg-[#E5DFD5]"
                      }`}
                      aria-label={`Toggle ${item.day}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          item.isOpen ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Start & End Columns when OPEN vs OFF */}
                  {item.isOpen ? (
                    <>
                      {/* Start Time */}
                      <td className="py-4 px-4">
                        <div className="relative inline-block w-40">
                          <select
                            value={item.start}
                            onChange={(e) => updateStartTime(idx, e.target.value)}
                            className="w-full appearance-none bg-[#FAF8F4] hover:border-[#B78735]/60 text-xs font-medium text-[#2C2E33] py-2.5 pl-4 pr-9 rounded-sm border border-[#E3DDD3]/70 focus:outline-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] cursor-pointer transition-colors"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <Clock className="w-4 h-4 text-[#787570] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* End Time */}
                      <td className="py-4 px-6">
                        <div className="relative inline-block w-40">
                          <select
                            value={item.end}
                            onChange={(e) => updateEndTime(idx, e.target.value)}
                            className="w-full appearance-none bg-[#FAF8F4] hover:border-[#B78735]/60 text-xs font-medium text-[#2C2E33] py-2.5 pl-4 pr-9 rounded-sm border border-[#E3DDD3]/70 focus:outline-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] cursor-pointer transition-colors"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <Clock className="w-4 h-4 text-[#787570] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>
                    </>
                  ) : (
                    /* Day Off Text */
                    <td colSpan={2} className="py-4 px-4">
                      <span className="text-xs italic text-[#787570] font-serif font-medium bg-[#FAF8F4] px-3 py-1.5 rounded-sm border border-[#E3DDD3]/70 inline-block">
                        Day off
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
