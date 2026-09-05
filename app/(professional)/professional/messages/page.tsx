"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  Search,
} from "lucide-react";
import { toast } from "sonner";

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
  messages: Message[];
}

export default function ProfessionalMessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [newMessageText, setNewMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const filteredConversations = conversations.filter((c) =>
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversationId, activeConversation?.messages]);

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
    toast.success("Message sent to client!");
  };

  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-[#1A1A1A]">
      {/* Page Title Header */}
      <div className="border-b border-[#E3DDD3] pb-4">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Customer Direct Messages
        </h1>
        <p className="text-xs sm:text-sm text-[#787570] font-normal mt-1">
          Chat directly with customers who booked services or inquired about your availability
        </p>
      </div>

      {/* Main Inbox Container */}
      <div className="bg-white border border-[#E3DDD3]/70 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
          {/* Left Column: Conversation List */}
          <div className="lg:col-span-4 border-r border-[#E3DDD3]/70 pr-0 lg:pr-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customer..."
                className="w-full bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder-zinc-400 outline-none focus:border-[#B78735]"
              />
            </div>

            {/* List */}
            <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
              {filteredConversations.map((conv) => {
                const isSelected = selectedConversationId === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-[#B78735]/10 border-[#B78735] shadow-xs"
                        : "bg-[#FAF9F5] border-[#E5E0D6] hover:bg-[#F3EFE6]"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden relative bg-[#E0D9CE]">
                        <Image
                          src={conv.avatar}
                          alt={conv.customerName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      {conv.unreadCount && conv.unreadCount > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-[#B78735] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                          {conv.unreadCount}
                        </span>
                      ) : null}
                    </div>

                    {/* Content Preview */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-semibold text-xs sm:text-sm text-[#1A1A1A] truncate">
                          {conv.customerName}
                        </h4>
                        <span className="text-[10px] text-zinc-400 shrink-0">
                          {conv.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate leading-tight mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Box */}
          <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-2">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E3DDD3]/70">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E0D9CE] shrink-0">
                      <Image
                        src={activeConversation.avatar}
                        alt={activeConversation.customerName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-[#1A1A1A]">
                        {activeConversation.customerName}
                      </h3>
                      {activeConversation.appointmentInfo && (
                        <p className="text-[11px] text-[#B78735] font-medium">
                          {activeConversation.appointmentInfo}
                        </p>
                      )}
                    </div>
                  </div>

                  {activeConversation.isOnline && (
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
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
                              ? "bg-[#B78735] text-white rounded-br-xs shadow-xs"
                              : "bg-[#F3F0EA] text-[#1A1A1A] rounded-bl-xs border border-[#E5E0D6]"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-zinc-400 mt-1 px-1">
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div className="pt-3 border-t border-[#E3DDD3]/70 flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={`Reply to ${activeConversation.customerName}...`}
                    className="flex-1 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder-zinc-400 outline-none focus:border-[#B78735] focus:bg-white transition-all"
                  />

                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-[#B78735] hover:bg-[#A37428] text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400 p-8">
                <MessageSquare className="w-12 h-12 mb-3 text-zinc-300" />
                <p className="text-sm font-medium">Select a conversation to start chatting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

