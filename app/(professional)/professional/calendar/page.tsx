"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Calendar as CalendarIcon,
  Send,
  X,
  ExternalLink,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetMyAppointmentQuery, useUpdateStatusMutation } from "@/features/appointment/appointmentApi";

type CalendarView = "Month" | "Week" | "Day";

interface Message {
  id: string;
  sender: "customer" | "pro";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  customerName: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline: boolean;
  appointmentInfo?: string;
  serviceName: string;
  messages: Message[];
}

export default function ProfessionalCalendarPage() {
  const router = useRouter();
  const [view, setView] = useState<CalendarView>("Month");

  // Selected date for calendar view navigation
  const [currentDateState, setCurrentDateState] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Chat states
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [newMessageText, setNewMessageText] = useState("");
  const [quickChatConvId, setQuickChatConvId] = useState<string | null>(null);
  const [quickChatMessageText, setQuickChatMessageText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickChatEndRef = useRef<HTMLDivElement>(null);

  // RTK Query API Hooks
  const { data: response, isLoading: isAppointmentsLoading, isFetching, refetch } = useGetMyAppointmentQuery(undefined);
  const [updateStatus] = useUpdateStatusMutation();

  const appointmentsList = response?.data || [];

  // Conversations data representing direct messages from customers
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      customerName: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Hi James! Just confirming my Balayage & Cut for Monday at 2:30 PM.",
      timestamp: "10 min ago",
      unreadCount: 2,
      isOnline: true,
      serviceName: "Balayage & Cut",
      appointmentInfo: "Mon, Aug 19 · 2:30 PM (Hair Coloring & Cut)",
      messages: [
        {
          id: "m1",
          sender: "customer",
          text: "Hi James! I booked an appointment with you for Monday Aug 19 at 2:30 PM for Hair Coloring & Cut.",
          time: "10:15 AM",
        },
        {
          id: "m2",
          sender: "pro",
          text: "Hello Sarah! Great to hear from you. Your slot is confirmed for 2:30 PM.",
          time: "10:20 AM",
        },
        {
          id: "m3",
          sender: "customer",
          text: "Hi James! Just confirming my Balayage & Cut for Monday at 2:30 PM. Should I wash my hair before coming?",
          time: "10:30 AM",
        },
      ],
    },
    {
      id: "2",
      customerName: "Michael Vance",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Is it possible to shift my beard trim to 11:30 AM?",
      timestamp: "1h ago",
      unreadCount: 1,
      isOnline: false,
      serviceName: "Beard Trim & Styling",
      appointmentInfo: "Sat, Aug 24 · 11:00 AM (Beard Trim & Styling)",
      messages: [
        {
          id: "m10",
          sender: "customer",
          text: "Hi! Is it possible to shift my beard trim appointment on Saturday to 11:30 AM instead of 11:00 AM?",
          time: "09:45 AM",
        },
      ],
    },
    {
      id: "3",
      customerName: "Emma Watson",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Thank you so much for the appointment! Loved the result.",
      timestamp: "Yesterday",
      isOnline: true,
      serviceName: "Manicure & Pedicure",
      appointmentInfo: "Mon, Aug 19 · 3:30 PM (Manicure & Pedicure)",
      messages: [
        {
          id: "m20",
          sender: "customer",
          text: "Thank you so much for the appointment! Loved the result.",
          time: "4:45 PM",
        },
        {
          id: "m21",
          sender: "pro",
          text: "You are very welcome Emma! Glad you liked it.",
          time: "5:00 PM",
        },
      ],
    },
  ]);

  const handleStatusChange = async (id: string, newStatus: "confirmed" | "cancelled") => {
    try {
      setUpdatingId(id);
      await updateStatus({
        id,
        data: { status: newStatus },
      }).unwrap();
      toast.success(`Appointment status updated to ${newStatus}!`);
      if (selectedAppointment && selectedAppointment._id === id) {
        setSelectedAppointment((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error("Failed to update status:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to update appointment status.";
      toast.error(errMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    const s = (status || "pending").toLowerCase();
    if (s === "confirmed") {
      return "bg-emerald-600 text-white dark:bg-emerald-500/25 dark:text-emerald-300 border border-emerald-500/40";
    }
    if (s === "cancelled") {
      return "bg-rose-600 text-white dark:bg-rose-500/25 dark:text-rose-300 border border-rose-500/40 line-through opacity-75";
    }
    // pending
    return "bg-amber-500 text-white dark:bg-amber-500/25 dark:text-amber-300 border border-amber-500/40";
  };

  const formatTime = (dateStr: string) => {
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

  const formatDateFull = (dateStr: string) => {
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

  const activeConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const activeQuickChatConv = conversations.find(
    (c) => c.id === quickChatConvId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversationId, activeConversation?.messages]);

  useEffect(() => {
    quickChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [quickChatConvId, activeQuickChatConv?.messages]);

  const handleSendQuickMessage = () => {
    if (!quickChatMessageText.trim() || !quickChatConvId) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "pro",
      text: quickChatMessageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === quickChatConvId) {
          return {
            ...c,
            lastMessage: quickChatMessageText,
            timestamp: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setQuickChatMessageText("");
    toast.success("Message sent to customer!");
  };

  const totalUnread = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0
  );

  const openFullInboxChat = (convId: string) => {
    router.push("/professional/messages");
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Top Header Row with Title & Main Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
            Calendar &amp; Client Messages
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Manage your appointment schedules and reply directly to client inquiries
          </p>
        </div>

        {/* Main Tab Switcher */}
        <div className="flex items-center gap-2 bg-accent p-1.5 rounded-lg border border-border w-full sm:w-auto">
          <Link
            href="/professional/calendar"
            className="flex-1 sm:flex-none justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer bg-primary text-primary-foreground shadow-sm"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar</span>
          </Link>

          <Link
            href="/professional/messages"
            className="flex-1 sm:flex-none justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer relative text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
            {totalUnread > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totalUnread}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ============================================================= */}
      {/* CALENDAR VIEW */}
      {/* ============================================================= */}
      <div className="space-y-6 relative">
        {/* Sub Header for Calendar Controls & Status Legend */}
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
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    view === v
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

        {/* Month View Grid */}
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

              {isAppointmentsLoading ? (
                <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">Loading calendar appointments...</p>
                </div>
              ) : (
                <div className="grid grid-cols-7 divide-x divide-y divide-border bg-card">
                  {monthCells.map((item, index) => {
                    // Filter appointments that land on this cell's day
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
                        className={`min-h-[110px] sm:min-h-[130px] p-2 flex flex-col justify-between transition-colors ${
                          isToday ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-accent/40"
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
                            const clientName = appt.customer
                              ? `${appt.customer.firstName || ""} ${appt.customer.lastName || ""}`.trim() || appt.customer.email?.split("@")[0]
                              : "Customer";
                            const statusStyle = getStatusBadgeStyle(appt.status);

                            return (
                              <div
                                key={appt._id}
                                onClick={() => setSelectedAppointment(appt)}
                                className={`w-full text-[11px] font-semibold p-1.5 rounded-md shadow-xs leading-tight flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all ${statusStyle}`}
                                title={`Click for appointment details (${appt.status})`}
                              >
                                <span className="truncate">
                                  {clientName} · {formatTime(appt.startsAt || appt.scheduledAt)}
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

        {/* Week View Grid */}
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
                      const clientName = appt.customer
                        ? `${appt.customer.firstName || ""} ${appt.customer.lastName || ""}`.trim() || appt.customer.email
                        : "Customer";
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
                            <h4 className="font-bold text-sm truncate">{clientName}</h4>
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

        {/* Day View Timeline */}
        {view === "Day" && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
              <span>{currentDateState.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            </h3>

            {appointmentsList.length > 0 ? (
              <div className="space-y-4 pt-2">
                {appointmentsList.map((appt: any) => {
                  const clientName = appt.customer
                    ? `${appt.customer.firstName || ""} ${appt.customer.lastName || ""}`.trim() || appt.customer.email
                    : "Customer";
                  const serviceName = Array.isArray(appt.services) && appt.services.length > 0
                    ? appt.services.map((s: any) => s.name).join(", ")
                    : "Service";
                  const statusNormalized = (appt.status || "pending").toLowerCase();
                  const statusStyle = getStatusBadgeStyle(appt.status);

                  return (
                    <div
                      key={appt._id}
                      className={`rounded-xl p-5 shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${statusStyle}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">{clientName}</span>
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

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {statusNormalized === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(appt._id, "confirmed")}
                              disabled={updatingId === appt._id}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                            >
                              {updatingId === appt._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                              <span>Confirm</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(appt._id, "cancelled")}
                              disabled={updatingId === appt._id}
                              className="px-3 py-1.5 rounded-lg border border-white/40 hover:bg-black/20 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          </>
                        )}

                        {statusNormalized === "confirmed" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(appt._id, "cancelled")}
                            disabled={updatingId === appt._id}
                            className="px-3 py-1.5 rounded-lg border border-white/40 hover:bg-black/20 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {updatingId === appt._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            <span>Cancel</span>
                          </button>
                        )}
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

        {/* APPOINTMENT DETAIL MODAL */}
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
                {/* Status Banner */}
                <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-semibold ${getStatusBadgeStyle(selectedAppointment.status)}`}>
                  <span>Status: {selectedAppointment.status?.toUpperCase() || "PENDING"}</span>
                  <span className="font-mono">{selectedAppointment.uid || selectedAppointment._id?.slice(-6)}</span>
                </div>

                {/* Customer Info */}
                <div className="space-y-2 border-b border-border pb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent border border-border">
                      <Image
                        src={selectedAppointment.customer?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt="Customer"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        {selectedAppointment.customer
                          ? `${selectedAppointment.customer.firstName || ""} ${selectedAppointment.customer.lastName || ""}`.trim() || selectedAppointment.customer.email
                          : "Customer"}
                      </p>
                      {selectedAppointment.customer?.email && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {selectedAppointment.customer.email}
                        </p>
                      )}
                      {selectedAppointment.customer?.phone?.number && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {selectedAppointment.customer.phone.number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="space-y-2 border-b border-border pb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Schedule & Services</p>
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

                {/* Actions inside Modal */}
                <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
                  {(selectedAppointment.status || "pending").toLowerCase() === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(selectedAppointment._id, "confirmed")}
                        disabled={updatingId === selectedAppointment._id}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {updatingId === selectedAppointment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        <span>Confirm</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(selectedAppointment._id, "cancelled")}
                        disabled={updatingId === selectedAppointment._id}
                        className="px-4 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}

                  {(selectedAppointment.status || "").toLowerCase() === "confirmed" && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedAppointment._id, "cancelled")}
                      disabled={updatingId === selectedAppointment._id}
                      className="px-4 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {updatingId === selectedAppointment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-4 h-4" />}
                      <span>Cancel Booking</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QUICK CHAT MODAL OVERLAY ON CALENDAR */}
        {quickChatConvId && activeQuickChatConv && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="bg-accent p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent shrink-0">
                    <Image
                      src={activeQuickChatConv.avatar}
                      alt={activeQuickChatConv.customerName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-foreground">
                        {activeQuickChatConv.customerName}
                      </h3>
                      {activeQuickChatConv.isOnline && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                      )}
                    </div>
                    <p className="text-[11px] text-primary font-medium">
                      {activeQuickChatConv.appointmentInfo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openFullInboxChat(quickChatConvId)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    title="Open in full inbox"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickChatConvId(null)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[360px] bg-accent/40">
                {activeQuickChatConv.messages.map((msg) => {
                  const isPro = msg.sender === "pro";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isPro ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isPro
                            ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs"
                            : "bg-card text-foreground rounded-bl-xs border border-border"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  );
                })}
                <div ref={quickChatEndRef} />
              </div>

              {/* Modal Footer / Input */}
              <div className="p-3 bg-card border-t border-border flex items-center gap-2">
                <input
                  type="text"
                  value={quickChatMessageText}
                  onChange={(e) => setQuickChatMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendQuickMessage()}
                  placeholder={`Direct message ${activeQuickChatConv.customerName}...`}
                  className="flex-1 bg-accent border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleSendQuickMessage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
