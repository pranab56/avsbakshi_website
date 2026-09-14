"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, Bot, Scissors, Calendar, MapPin, HelpCircle } from "lucide-react";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! 👋 Welcome to The Cloud Salon. How can I assist you with your beauty and salon bookings today?",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messageIdCounter = useRef(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const quickQuestions = [
    { label: "Book Appointment", icon: Calendar, query: "How do I book an appointment?" },
    { label: "Find Salons", icon: MapPin, query: "Where can I find top salons near me?" },
    { label: "For Professionals", icon: Scissors, query: "How can I join as a beauty professional?" },
    { label: "Pricing & Services", icon: HelpCircle, query: "What services are available?" },
  ];

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes("book") || text.includes("appointment") || text.includes("schedule")) {
      return "To book an appointment, click on 'Book A Service' on our homepage or browse through our 'Services' page. You can choose your preferred professional, salon, date, and time slot!";
    }
    if (text.includes("salon") || text.includes("location") || text.includes("near me") || text.includes("find")) {
      return "We have over 5,000+ verified salons! Visit our 'Salons' tab to explore featured salon locations near you with ratings, photos, and client reviews.";
    }
    if (text.includes("professional") || text.includes("join") || text.includes("business") || text.includes("work")) {
      return "Are you a hair stylist, esthetician, or salon owner? You can register as a Professional or Business to manage bookings, set your rates, and grow your clientele on The Cloud Salon platform!";
    }
    if (text.includes("price") || text.includes("cost") || text.includes("service")) {
      return "We offer haircutting, hair coloring, manicures, pedicures, facials, massage therapy, bridal makeup, and more! Prices are set directly by individual salons and professionals for total transparency.";
    }
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! 😊 How can I help you find or book your next beauty service?";
    }
    return "Thank you for reaching out! Our support team is online 24/7. You can also explore our 'Services' or 'Salons' tabs to book directly.";
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
    }, 800);
  };

  return (
    <>
      {/* Interactive Floating Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] sm:h-[520px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#D99722] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#D99722]" />
              </div>
              <div>
                <h3 className="font-title font-bold text-sm leading-tight text-white">The Cloud Salon AI</h3>
                <p className="text-[10px] text-white/80 font-medium">Virtual Assistant • Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-accent/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-[#D99722] text-white rounded-br-none font-medium"
                      : "bg-card text-foreground border border-border/60 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === "user" ? "text-white/70 text-right" : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#D99722] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-card border border-border/60 px-3 py-2 rounded-2xl rounded-bl-none text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#D99722] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2 bg-card border-t border-border/40 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 no-scrollbar">
            {quickQuestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(item.query)}
                  className="px-2.5 py-1 rounded-full bg-accent/60 hover:bg-[#D99722] hover:text-white text-[10px] font-medium text-foreground transition-all flex items-center gap-1 cursor-pointer shrink-0 border border-border/40"
                >
                  <Icon className="w-3 h-3 text-[#D99722] group-hover:text-white" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-card border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about salon services..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-accent/40 border border-border focus:outline-none focus:ring-1 focus:ring-[#D99722] text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-[#D99722] hover:bg-[#C2841B] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Golden Round Floating Chat Button (Matches Figma Screenshot Exactly) */}
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
        {/* Filled White Speech Bubble Icon */}
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white group-hover:scale-110 transition-transform" />

        {/* Red Unread Notification Badge Dot on Top-Right Edge */}
        {unread && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#E53E3E] rounded-full border-2 border-white dark:border-[#121214] shadow-xs animate-pulse" />
        )}
      </button>
    </>
  );
}
