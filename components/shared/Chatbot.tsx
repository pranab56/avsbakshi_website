"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  User,
  ChevronRight,
  Briefcase,
  Building2,
  HelpCircle,
  Headphones,
  Minus,
  type LucideIcon,
} from "lucide-react";

interface QuickOptionPng {
  label: string;
  iconType: "png";
  icon: string;
  query: string;
}

interface QuickOptionLucide {
  label: string;
  iconType: "lucide";
  icon: LucideIcon;
  query: string;
}

type QuickOption = QuickOptionPng | QuickOptionLucide;

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageIdCounter = useRef(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const quickOptions: QuickOption[] = [
    {
      label: "Book a Service",
      iconType: "png",
      icon: "/icons/hero/calendar.png",
      query: "I want to book a service",
    },
    {
      label: "Find a Professional",
      iconType: "png",
      icon: "/icons/hero/user-1.png",
      query: "How can I find a beauty professional?",
    },
    {
      label: "Find a Salon",
      iconType: "png",
      icon: "/icons/hero/location-1.png",
      query: "Where can I find top salons near me?",
    },
    {
      label: "Professional Support",
      iconType: "lucide",
      icon: Briefcase,
      query: "I am a professional, how does the platform work?",
    },
    {
      label: "Business Support",
      iconType: "lucide",
      icon: Building2,
      query: "I own a salon business, how can I register?",
    },
    {
      label: "How It Works",
      iconType: "lucide",
      icon: HelpCircle,
      query: "How does The Cloud Salon work?",
    },
    {
      label: "Contact Support",
      iconType: "lucide",
      icon: Headphones,
      query: "How can I contact customer support?",
    },
  ];

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes("book") || text.includes("service") || text.includes("appointment")) {
      return "To book a service, browse our categories or search for specific treatments. Choose your preferred professional or salon, select an available date & time slot, and confirm your booking instantly!";
    }
    if (text.includes("find a professional") || text.includes("professional") || text.includes("specialist")) {
      return "You can explore top-rated independent beauty specialists, view their portfolios, read verified customer reviews, and check real-time availability on our 'For Professionals' and 'Discover' pages!";
    }
    if (text.includes("salon") || text.includes("location") || text.includes("near me")) {
      return "We feature 5,000+ top salon locations! Check out the 'Salons Near You' section on the homepage or use the search tab to find salons in your city.";
    }
    if (text.includes("business support") || text.includes("business") || text.includes("owner")) {
      return "Salon owners can list their business, manage chair spaces, track staff schedules, and attract new clients on Cloud Salon. Visit our 'For Businesses' page to get started!";
    }
    if (text.includes("how it works") || text.includes("process")) {
      return "Cloud Salon connects clients with verified salons & independent pros. 1) Search services, 2) Book your appointment online, 3) Enjoy your treatment & earn reward points!";
    }
    if (text.includes("contact") || text.includes("help") || text.includes("support")) {
      return "Our support team is available 24/7! You can email us at support@cloudsalon.com or call our hotline at +1 (800) 555-SALON.";
    }
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! 😊 How can I help you with your salon booking today?";
    }
    return "Thank you for reaching out! Our support team is online 24/7. You can also explore our 'Services' or 'Salons' pages for instant online booking.";
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    messageIdCounter.current += 1;
    const currentId = `user-msg-${messageIdCounter.current}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: currentId,
      sender: "user",
      text: query,
      time: nowTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      messageIdCounter.current += 1;
      const botMsgId = `bot-msg-${messageIdCounter.current}`;
      const botMsg: Message = {
        id: botMsgId,
        sender: "bot",
        text: getBotResponse(query),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Interactive Floating Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] bg-[#E8E5DF] dark:bg-[#1C1C1E] border border-black/10 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] sm:h-[600px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Bar (Dark Charcoal) */}
          <div className="bg-[#18181A] text-white px-4 py-3.5 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#121214] border border-white/15 shrink-0 flex items-center justify-center">
                <Image
                  src="/icons/Dark_Mode.png"
                  alt="Cloud Assistant Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight text-white tracking-tight">
                  Cloud Assistant
                </h3>
                <p className="text-[11px] text-zinc-400 font-normal">
                  Your Virtual Salon Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Minimize Chat"
            >
              <Minus className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Body Content Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 select-none">
            
            {/* Initial Welcome Greeting Card from Assistant */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center mt-0.5">
                <Image
                  src="/icons/Dark_Mode.png"
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 bg-[#DFDCD5] dark:bg-[#28282B] p-4 sm:p-4.5 rounded-2xl space-y-2 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm leading-relaxed shadow-2xs">
                <h4 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white leading-snug">
                  Hi! I&apos;m Cloud Assistant <br />
                  <span className="font-normal text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    Your virtual salon assistant.
                  </span>
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-[13px] font-normal leading-relaxed">
                  I can help you book services, find professionals and salons, explore mobile or in-salon options, get support, or help you get started.
                </p>
                <p className="font-medium text-xs sm:text-sm pt-1 text-zinc-900 dark:text-zinc-100">
                  How can I help you today?
                </p>
              </div>
            </div>

            {/* Vertical Pill Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              {quickOptions.map((item, idx) => {
                const IconComponent = item.iconType === "lucide" ? item.icon : null;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.query)}
                    className="w-full px-4 py-3 rounded-full bg-[#DFDCD5]/90 dark:bg-[#28282B] hover:bg-[#D5D2CB] dark:hover:bg-[#323236] border border-black/5 dark:border-white/5 flex items-center justify-between text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      {item.iconType === "png" ? (
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain shrink-0"
                        />
                      ) : IconComponent ? (
                        <IconComponent className="w-5 h-5 text-[#D99722] shrink-0" />
                      ) : null}
                      <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[#D99722] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-[#D99722] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Render Active Conversation Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 pt-1 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center">
                    <Image
                      src="/icons/Dark_Mode.png"
                      alt="Bot"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-[#D99722] text-white rounded-br-none font-medium"
                      : "bg-[#DFDCD5] dark:bg-[#28282B] text-zinc-900 dark:text-zinc-100 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === "user"
                        ? "text-white/75 text-right"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#D99722] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center">
                  <Image
                    src="/icons/Dark_Mode.png"
                    alt="Typing"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="bg-[#DFDCD5] dark:bg-[#28282B] px-3.5 py-2.5 rounded-2xl rounded-bl-none text-xs text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer Bar */}
          <div className="p-3 bg-[#E8E5DF] dark:bg-[#1C1C1E] border-t border-black/5 dark:border-white/5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message ..."
                  className="w-full px-4 py-2.5 rounded-full bg-[#DFDCD5] dark:bg-[#28282B] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#D99722]"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D99722] hover:bg-[#C2841B] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Golden Round Chat Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => {
            if (!prev) setUnread(false);
            return !prev;
          });
        }}
        aria-label="Open Chat Support"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D99722] hover:bg-[#A0732A] active:scale-95 transition-all shadow-2xl flex items-center justify-center cursor-pointer group"
      >
        {/* Speech Bubble Icon */}
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white group-hover:scale-110 transition-transform" />

        {/* Red Unread Notification Badge Dot */}
        {unread && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#E53E3E] rounded-full border-2 border-white dark:border-[#121214] shadow-xs animate-pulse" />
        )}
      </button>
    </>
  );
}
