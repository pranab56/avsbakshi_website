"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Calendar as CalendarIcon,
  Send,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CalendarView = "Month" | "Week" | "Day";
type MainTab = "calendar" | "messages";

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
  const [mainTab, setMainTab] = useState<MainTab>("calendar");
  const [view, setView] = useState<CalendarView>("Month");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [newMessageText, setNewMessageText] = useState("");
  const [quickChatConvId, setQuickChatConvId] = useState<string | null>(null);
  const [quickChatMessageText, setQuickChatMessageText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickChatEndRef = useRef<HTMLDivElement>(null);

  const currentMonth = "August 2026";

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

  // Appointments for Calendar Grid
  const appointments = [
    {
      id: "1",
      client: "Sarah Jenkins",
      shortName: "Sarah J.",
      service: "Hair Coloring & Cut",
      date: "2026-08-19",
      dayNumber: 19,
      time: "2:30 PM",
      fullTime: "2:30 PM – 5:00 PM",
      price: "£120",
      color: "bg-[#B78735]",
      conversationId: "1",
    },
    {
      id: "2",
      client: "Michael Vance",
      shortName: "Michael V.",
      service: "Beard Trim & Styling",
      date: "2026-08-24",
      dayNumber: 24,
      time: "11:00 AM",
      fullTime: "11:00 AM – 12:30 PM",
      price: "£45",
      color: "bg-[#2C2E33]",
      conversationId: "2",
    },
    {
      id: "3",
      client: "Emma Watson",
      shortName: "Emma W.",
      service: "Manicure & Pedicure",
      date: "2026-08-19",
      dayNumber: 19,
      time: "3:30 PM",
      fullTime: "3:30 PM – 4:30 PM",
      price: "£75",
      color: "bg-[#787570]",
      conversationId: "3",
    },
  ];

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
  ];

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

  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedConversationId) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "pro",
      text: newMessageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === selectedConversationId) {
          return {
            ...c,
            lastMessage: newMessageText,
            timestamp: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setNewMessageText("");
    toast.success("Message sent to customer!");
  };

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

  const openCustomerQuickChat = (convId: string) => {
    setQuickChatConvId(convId);
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  const openFullInboxChat = (convId: string) => {
    setSelectedConversationId(convId);
    setQuickChatConvId(null);
    setMainTab("messages");
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Top Header Row with Title & Main Tabs (Calendar vs Direct Messages) */}
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
          <button
            type="button"
            onClick={() => setMainTab("calendar")}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer ${
              mainTab === "calendar"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => setMainTab("messages")}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer relative ${
              mainTab === "messages"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
            {totalUnread > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totalUnread}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* TAB 1: CALENDAR VIEW */}
      {/* ============================================================= */}
      {mainTab === "calendar" && (
        <div className="space-y-6 relative">
          {/* Sub Header for Calendar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-serif italic font-normal text-2xl text-foreground">
              {currentMonth}
            </h2>

            {/* View Switcher (Month / Week / Day) */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-2 rounded-sm flex items-center gap-1 cursor-pointer border border-border"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </Button>

              <div className="bg-accent p-1.5 rounded-sm flex items-center gap-1 border border-border">
                {(["Month", "Week", "Day"] as CalendarView[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer ${
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
                className="bg-accent hover:bg-accent/80 text-foreground text-xs font-medium px-3 py-2 rounded-sm flex items-center gap-1 cursor-pointer border border-border"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Month View Grid */}
          {view === "Month" && (
            <div className="overflow-x-auto rounded-lg border border-border shadow-xs">
              <div className="bg-card min-w-[640px] overflow-hidden">
                <div className="grid grid-cols-7 bg-accent/60 border-b border-border text-center text-xs font-semibold text-muted-foreground py-3">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>

                <div className="grid grid-cols-7 divide-x divide-y divide-border bg-card">
                  {monthDays.map((item, index) => {
                    const dayAppts = appointments.filter(
                      (a) => a.dayNumber === item.day
                    );
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] sm:min-h-[120px] p-2 flex flex-col justify-between transition-colors ${
                          item.isHighlight ? "bg-primary/10" : "hover:bg-accent/40"
                        }`}
                      >
                        <span className="text-xs font-semibold text-primary">
                          {item.day || ""}
                        </span>

                        {/* Appointment Event Cards */}
                        <div className="space-y-1.5 w-full">
                          {dayAppts.map((appt) => (
                            <div
                              key={appt.id}
                              onClick={() => openCustomerQuickChat(appt.conversationId)}
                              className={`w-full text-white text-[11px] font-medium p-1.5 rounded-md shadow-xs leading-tight flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity ${
                                appt.color === "bg-[#2C2E33]" ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
                              }`}
                              title="Click to chat with client"
                            >
                              <span className="truncate">
                                {appt.shortName} · {appt.time}
                              </span>
                              <MessageSquare className="w-3 h-3 shrink-0 ml-1 opacity-80" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Week View Grid */}
          {view === "Week" && (
            <div className="overflow-x-auto rounded-lg border border-border shadow-xs">
              <div className="bg-card min-w-[640px] overflow-hidden">
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

                <div className="divide-y divide-border bg-card">
                  {timeSlots.slice(1, 10).map((time, rowIdx) => (
                    <div key={rowIdx} className="grid grid-cols-8 min-h-[90px] divide-x divide-border">
                      <div className="p-2 text-[11px] text-muted-foreground font-medium text-right pr-3 flex items-center justify-end">
                        {time}
                      </div>

                      {weekDays.map((wd, colIdx) => {
                        const apptSarah = wd.dateNum === 19 && time === "2 PM";
                        const apptMichael = wd.dateNum === 24 && time === "11 AM";

                        return (
                          <div
                            key={colIdx}
                            className="p-1 relative hover:bg-accent/40 transition-colors flex items-center"
                          >
                            {apptSarah && (
                              <button
                                type="button"
                                onClick={() => openCustomerQuickChat("1")}
                                className="w-full bg-primary text-primary-foreground h-[64px] flex flex-col justify-center items-center p-1.5 rounded-md text-xs font-medium shadow-xs leading-tight text-center hover:bg-primary/90 transition-colors cursor-pointer"
                              >
                                <span>Sarah J.</span>
                                <span className="text-[10px] opacity-90">2:30 PM</span>
                                <span className="text-[9px] underline mt-0.5 flex items-center gap-1">
                                  <MessageSquare className="w-2.5 h-2.5" /> Chat
                                </span>
                              </button>
                            )}
                            {apptMichael && (
                              <button
                                type="button"
                                onClick={() => openCustomerQuickChat("2")}
                                className="w-full bg-foreground text-background h-[64px] flex flex-col justify-center items-center p-1.5 rounded-md text-xs font-medium shadow-xs leading-tight text-center hover:bg-foreground/90 transition-colors cursor-pointer"
                              >
                                <span>Michael V.</span>
                                <span className="text-[10px] opacity-90">11:00 AM</span>
                                <span className="text-[9px] underline mt-0.5 flex items-center gap-1">
                                  <MessageSquare className="w-2.5 h-2.5" /> Chat
                                </span>
                              </button>
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

          {/* Day View Timeline */}
          {view === "Day" && (
            <div className="bg-card border border-border rounded-lg p-6 shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                Monday 19 August
              </h3>

              <div className="space-y-4 pt-2">
                {timeSlots.map((time, idx) => {
                  const appt = appointments.find((a) =>
                    a.time.startsWith(time.split(" ")[0])
                  );
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      <span className="w-14 text-xs font-medium text-muted-foreground text-right pt-0.5 shrink-0">
                        {time}
                      </span>
                      <div className="flex-1 border-t border-dashed border-border pt-2 min-h-[50px]">
                        {appt && (
                          <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="font-bold text-sm sm:text-base">
                                {appt.client}
                              </div>
                              <div className="text-xs text-primary-foreground/90">
                                {appt.service} · {appt.fullTime} · {appt.price}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => openCustomerQuickChat(appt.conversationId)}
                              className="bg-card text-foreground hover:bg-accent px-4 py-2 rounded-md font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shadow-xs border border-border"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-primary" />
                              <span>Message {appt.shortName}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
      )}

      {/* ============================================================= */}
      {/* TAB 2: DIRECT CLIENT CHAT SYSTEM */}
      {/* ============================================================= */}
      {mainTab === "messages" && (
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
            {/* Left Column: Customer Conversations List */}
            <div className="lg:col-span-4 border-r border-border pr-0 lg:pr-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="font-serif font-bold text-lg text-foreground">
                  Client Inquiries
                </h3>
                <span className="text-xs text-muted-foreground font-medium">
                  {conversations.length} Active
                </span>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
                {conversations.map((conv) => {
                  const isSelected = selectedConversationId === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => openFullInboxChat(conv.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-xs"
                          : "bg-accent border-border hover:bg-accent/80"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-full overflow-hidden relative bg-accent">
                          <Image
                            src={conv.avatar}
                            alt={conv.customerName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        {conv.unreadCount && conv.unreadCount > 0 ? (
                          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-background">
                            {conv.unreadCount}
                          </span>
                        ) : null}
                      </div>

                      {/* Content Preview */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                            {conv.customerName}
                          </h4>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {conv.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Direct Chat Thread Box */}
            <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-2">
              {activeConversation ? (
                <>
                  {/* Chat Box Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent shrink-0">
                        <Image
                          src={activeConversation.avatar}
                          alt={activeConversation.customerName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-foreground">
                          {activeConversation.customerName}
                        </h3>
                        {activeConversation.appointmentInfo && (
                          <p className="text-[11px] text-primary font-medium">
                            {activeConversation.appointmentInfo}
                          </p>
                        )}
                      </div>
                    </div>

                    {activeConversation.isOnline && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                        Online
                      </span>
                    )}
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 max-h-[380px]">
                    {activeConversation.messages.map((msg) => {
                      const isPro = msg.sender === "pro";
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            isPro ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                              isPro
                                ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs"
                                : "bg-accent text-foreground rounded-bl-xs border border-border"
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
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input Bar */}
                  <div className="pt-3 border-t border-border flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder={`Reply to ${activeConversation.customerName}...`}
                      className="flex-1 bg-accent border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-all"
                    />

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <MessageSquare className="w-12 h-12 mb-3 text-muted-foreground/60" />
                  <p className="text-sm font-medium">Select a client conversation to start chatting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
