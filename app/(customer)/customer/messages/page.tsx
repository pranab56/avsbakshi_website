"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "pro";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  proName: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline: boolean;
  messages: Message[];
}

export default function CustomerMessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      proName: "Sofia Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Great, see you Monday!",
      timestamp: "2h ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "m1",
          sender: "pro",
          text: "Hi Rachel! Just confirming your appointment on Monday at 2:30 PM for Balayage & Toner. See you then!",
          time: "10:32 AM",
        },
        {
          id: "m2",
          sender: "user",
          text: "Perfect, thank you! Quick question — should I come with dry or wet hair?",
          time: "10:45 AM",
        },
        {
          id: "m3",
          sender: "pro",
          text: "Dry hair works best for balayage. No need to wash beforehand.",
          time: "11:02 AM",
        },
        {
          id: "m4",
          sender: "user",
          text: "Great, see you Monday!",
          time: "11:05 AM",
        },
        {
          id: "m5",
          sender: "pro",
          text: "See you Monday!",
          time: "11:06 AM",
        },
      ],
    },
    {
      id: "2",
      proName: "James Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Looking forward to it.",
      timestamp: "Yesterday",
      isOnline: false,
      messages: [
        {
          id: "m10",
          sender: "pro",
          text: "Thanks for booking! Looking forward to it.",
          time: "4:15 PM",
        },
      ],
    },
    {
      id: "3",
      proName: "Aisha Williams",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      lastMessage: "Thank you so much!",
      timestamp: "3 days ago",
      isOnline: false,
      messages: [
        {
          id: "m20",
          sender: "pro",
          text: "Thank you so much for the review!",
          time: "2:00 PM",
        },
      ],
    },
  ]);

  const activeConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversationId, activeConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedConversationId) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
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
  };

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* VIEW 1: CONVERSATIONS LIST (When no conversation is selected)     */}
      {/* ----------------------------------------------------------------- */}
      {!activeConversation && (
        <div className="space-y-6">
          {/* Header Title */}
          <div className="space-y-1">
            <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
              Messages
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
              Your conversations with professionals
            </p>
          </div>

          {/* Conversations List Container */}
          <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border shadow-xs">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConversationId(conv.id);
                  // Mark as read
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === conv.id ? { ...c, unreadCount: 0 } : c
                    )
                  );
                }}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar with optional badge */}
                  <div className="relative shrink-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent">
                      <Image
                        src={conv.avatar}
                        alt={conv.proName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-background">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </div>

                  {/* Name & Preview Text */}
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-bold text-base text-foreground">
                      {conv.proName}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-tight ${
                        conv.unreadCount && conv.unreadCount > 0
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <span className="text-xs text-muted-foreground shrink-0">
                  {conv.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VIEW 2: CHAT CONVERSATION VIEW (When a conversation is selected)  */}
      {/* ----------------------------------------------------------------- */}
      {activeConversation && (
        <div className="space-y-4">
          {/* Top Bar with Back Button & Selected Professional Info */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedConversationId(null)}
              className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3 ml-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent">
                <Image
                  src={activeConversation.avatar}
                  alt={activeConversation.proName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif font-bold text-base sm:text-lg text-foreground leading-tight">
                  {activeConversation.proName}
                </h2>
                {activeConversation.isOnline && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    Online
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main Messages Thread Box */}
          <div className="bg-card border h-[calc(100vh-220px)] min-h-[500px] border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-xs">
            {/* Scrollable Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {activeConversation.messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-md sm:max-w-xl p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-xs"
                          : "bg-accent text-foreground rounded-bl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar at Bottom */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-accent border border-border rounded-sm px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-sm font-medium text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}