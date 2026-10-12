"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  Loader2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMyAppointmentQuery } from "@/features/appointment/appointmentApi";

type CalendarView = "Month" | "Week" | "Day";

export default function CustomerCalendarPage() {
  const [view, setView] = useState<CalendarView>("Month");
  const [currentDateState, setCurrentDateState] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Fetch customer appointments from same API endpoint as professional calendar
  const { data: response, isLoading, isFetching, refetch } = useGetMyAppointmentQuery(undefined);

  const appointmentsList = response?.data || [];

  const getStatusBadgeStyle = (status: string) => {
    const s = (status || "pending").toLowerCase();
    if (s === "confirmed") {
      return "bg-emerald-600 text-white dark:bg-emerald-500/25 dark:text-emerald-300 border border-emerald-500/40";
    }
    if (s === "cancelled") {
      return "bg-rose-600 text-white dark:bg-rose-500/25 dark:text-rose-300 border border-rose-500/40 line-through opacity-75";
    }
    return "bg-amber-500 text-white dark:bg-amber-500/25 dark:text-amber-300 border border-amber-500/40";
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const formatDateFull = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Month navigation
  const handlePrevPeriod = () => {
    setCurrentDateState((prev) => {
      const next = new Date(prev);
      if (view === "Month") next.setMonth(prev.getMonth() - 1);
      else if (view === "Week") next.setDate(prev.getDate() - 7);
      else next.setDate(prev.getDate() - 1);
      return next;
    });
  };

  const handleNextPeriod = () => {
    setCurrentDateState((prev) => {
      const next = new Date(prev);
      if (view === "Month") next.setMonth(prev.getMonth() + 1);
      else if (view === "Week") next.setDate(prev.getDate() + 7);
      else next.setDate(prev.getDate() + 1);
      return next;
    });
  };

  // Month cells calculation
  const getMonthGrid = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const startingDay = (firstDayIndex + 6) % 7; // Monday = 0

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: { day: number | null; isCurrentMonth: boolean; dateObj?: Date }[] = [];

    for (let i = 0; i < startingDay; i++) {
      cells.push({ day: null, isCurrentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        dateObj: new Date(year, month, d),
      });
    }

    return cells;
  };

  const monthCells = getMonthGrid(currentDateState);

  const formattedHeaderMonth = currentDateState.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Top Header Row with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
            My Appointments Calendar
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Track and manage all your scheduled beauty &amp; wellness appointments
          </p>
        </div>
      </div>

      {/* CALENDAR CONTROLS & HEADER */}
      <div className="space-y-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif italic font-normal text-2xl text-foreground">
              {formattedHeaderMonth}
            </h2>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh calendar data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Status Color Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs bg-accent/50 p-2 rounded-lg border border-border">
            <span className="text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">Status Colors:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-medium text-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">Confirmed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="font-medium text-foreground">Cancelled</span>
            </div>
          </div>

          {/* View Switcher & Prev/Next */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPeriod}
              className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer border border-border"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </Button>

            <div className="bg-accent p-1.5 rounded-md flex items-center gap-1 border border-border">
              {(["Month", "Week", "Day"] as CalendarView[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${view === v
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPeriod}
              className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer border border-border"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* VIEW 1: MONTH VIEW GRID */}
        {/* ============================================================= */}
        {view === "Month" && (
          <div className="overflow-x-auto rounded-xl border border-border shadow-xs">
            <div className="bg-card min-w-[680px] overflow-hidden">
              <div className="grid grid-cols-7 bg-accent/60 border-b border-border text-center text-xs font-semibold text-muted-foreground py-3">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              {isLoading ? (
                <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">Loading calendar appointments...</p>
                </div>
              ) : (
                <div className="grid grid-cols-7 divide-x divide-y divide-border bg-card">
                  {monthCells.map((item, index) => {
                    const dayAppts = appointmentsList.filter((a: any) => {
                      const dateStr = a.startsAt || a.scheduledAt;
                      if (!dateStr || !item.day || !item.isCurrentMonth) return false;
                      const d = new Date(dateStr);
                      return (
                        d.getFullYear() === currentDateState.getFullYear() &&
                        d.getMonth() === currentDateState.getMonth() &&
                        d.getDate() === item.day
                      );
                    });

                    const isToday =
                      item.isCurrentMonth &&
                      item.day === new Date().getDate() &&
                      currentDateState.getMonth() === new Date().getMonth() &&
                      currentDateState.getFullYear() === new Date().getFullYear();

                    return (
                      <div
                        key={index}
                        className={`min-h-[110px] sm:min-h-[130px] p-2 flex flex-col justify-between transition-colors ${isToday ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-accent/40"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${isToday ? "text-primary bg-primary/20 px-1.5 py-0.5 rounded-full" : "text-muted-foreground"}`}>
                            {item.day || ""}
                          </span>
                          {dayAppts.length > 0 && (
                            <span className="text-[10px] font-bold text-muted-foreground bg-accent px-1.5 py-0.5 rounded-full">
                              {dayAppts.length}
                            </span>
                          )}
                        </div>

                        {/* Appointment Event Cards */}
                        <div className="space-y-1.5 w-full overflow-y-auto max-h-[85px] pr-0.5">
                          {dayAppts.map((appt: any) => {
                            const proName = appt.professional
                              ? `${appt.professional.firstName || ""} ${appt.professional.lastName || ""}`.trim()
                              : appt.salon?.name || "Specialist";
                            const statusStyle = getStatusBadgeStyle(appt.status);

                            return (
                              <div
                                key={appt._id}
                                onClick={() => setSelectedAppointment(appt)}
                                className={`w-full text-[11px] font-semibold p-1.5 rounded-md shadow-xs leading-tight flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all ${statusStyle}`}
                                title={`Click for appointment details (${appt.status})`}
                              >
                                <span className="truncate">
                                  {proName} · {formatTime(appt.startsAt || appt.scheduledAt)}
                                </span>
                                <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-black/20 font-bold ml-1 shrink-0">
                                  {appt.status || "pending"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 2: WEEK VIEW GRID */}
        {/* ============================================================= */}
        {view === "Week" && (
          <div className="overflow-x-auto rounded-xl border border-border shadow-xs">
            <div className="bg-card min-w-[720px] overflow-hidden">
              <div className="divide-y divide-border bg-card">
                <div className="p-4 bg-accent/40 text-xs text-muted-foreground font-semibold flex items-center justify-between">
                  <span>Appointments for week of {formattedHeaderMonth}</span>
                  <span>Total: {appointmentsList.length} Bookings</span>
                </div>

                {appointmentsList.length > 0 ? (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointmentsList.map((appt: any) => {
                      const proName = appt.professional
                        ? `${appt.professional.firstName || ""} ${appt.professional.lastName || ""}`.trim()
                        : appt.salon?.name || "Specialist";
                      const serviceName = Array.isArray(appt.services) && appt.services.length > 0
                        ? appt.services.map((s: any) => s.name).join(", ")
                        : "Service";
                      const statusStyle = getStatusBadgeStyle(appt.status);

                      return (
                        <div
                          key={appt._id}
                          onClick={() => setSelectedAppointment(appt)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 hover:shadow-md ${statusStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono">
                              {appt.uid || appt._id?.slice(-6)}
                            </span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/20">
                              {appt.status || "pending"}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm truncate">{proName}</h4>
                            <p className="text-xs opacity-90 line-clamp-1">{serviceName}</p>
                            <p className="text-[11px] opacity-80 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDateFull(appt.startsAt || appt.scheduledAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-16 text-center text-muted-foreground text-sm italic">
                    No appointments scheduled for this week.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 3: DAY VIEW TIMELINE */}
        {/* ============================================================= */}
        {view === "Day" && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
              <span>{currentDateState.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            </h3>

            {appointmentsList.length > 0 ? (
              <div className="space-y-4 pt-2">
                {appointmentsList.map((appt: any) => {
                  const proName = appt.professional
                    ? `${appt.professional.firstName || ""} ${appt.professional.lastName || ""}`.trim()
                    : appt.salon?.name || "Specialist";
                  const serviceName = Array.isArray(appt.services) && appt.services.length > 0
                    ? appt.services.map((s: any) => s.name).join(", ")
                    : "Service";
                  const statusNormalized = (appt.status || "pending").toLowerCase();
                  const statusStyle = getStatusBadgeStyle(appt.status);

                  return (
                    <div
                      key={appt._id}
                      onClick={() => setSelectedAppointment(appt)}
                      className={`rounded-xl p-5 shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer ${statusStyle}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">{proName}</span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-black/20">
                            {statusNormalized}
                          </span>
                        </div>
                        <p className="text-xs opacity-90">{serviceName}</p>
                        <p className="text-xs opacity-80 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDateFull(appt.startsAt || appt.scheduledAt)} ({appt.totalDurationInMinutes || 30} min)</span>
                        </p>
                        <p className="text-xs font-serif italic font-bold">
                          Total: ${appt.pricing?.total ?? appt.pricing?.subtotal ?? 0}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-black/20 text-xs font-bold">
                          View Details
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center text-muted-foreground text-sm italic">
                No appointments scheduled.
              </div>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* APPOINTMENT DETAIL MODAL */}
        {/* ============================================================= */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="bg-accent p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <h3 className="font-serif font-bold text-base text-foreground">
                    Appointment Details
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {/* Status & Payment Banner */}
                <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-semibold ${getStatusBadgeStyle(selectedAppointment.status)}`}>
                  <div className="flex items-center gap-2">
                    <span>Status: {selectedAppointment.status?.toUpperCase() || "PENDING"}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/20 font-bold capitalize">
                      Payment: {selectedAppointment.paymentStatus || "unpaid"}
                    </span>
                  </div>
                  <span className="font-mono">{selectedAppointment.uid || selectedAppointment._id?.slice(-6)}</span>
                </div>

                {/* Professional & Salon Info */}
                <div className="space-y-2 border-b border-border pb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Specialist &amp; Salon</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent border border-border shrink-0">
                      <Image
                        src={
                          selectedAppointment.professional?.image ||
                          selectedAppointment.salon?.logo ||
                          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80"
                        }
                        alt="Professional"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        {selectedAppointment.professional
                          ? `${selectedAppointment.professional.firstName || ""} ${selectedAppointment.professional.lastName || ""}`.trim()
                          : selectedAppointment.salon?.name || "Professional Specialist"}
                      </p>
                      {selectedAppointment.salon?.name && selectedAppointment.professional && (
                        <p className="text-xs text-muted-foreground font-medium">
                          {selectedAppointment.salon.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking Schedule & Services */}
                <div className="space-y-2 border-b border-border pb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Schedule &amp; Services</p>
                  <p className="text-xs text-foreground font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {formatDateFull(selectedAppointment.startsAt || selectedAppointment.scheduledAt)} ({selectedAppointment.totalDurationInMinutes || 30} min)
                  </p>
                  {Array.isArray(selectedAppointment.services) && selectedAppointment.services.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {selectedAppointment.services.map((s: any) => (
                        <div key={s._id} className="text-xs flex items-center justify-between text-muted-foreground">
                          <span>• {s.name}</span>
                          <span className="font-semibold text-foreground">${s.priceInUSD || 0}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing Total */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-muted-foreground">Total Price:</span>
                  <span className="font-serif italic font-bold text-lg text-primary">
                    ${selectedAppointment.pricing?.total ?? selectedAppointment.pricing?.subtotal ?? 0}
                  </span>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
                  <Link
                    href={selectedAppointment.professional?._id ? `/professionals/${selectedAppointment.professional._id}` : "/discover"}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-colors shadow-xs"
                  >
                    View Specialist Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}