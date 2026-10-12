"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  Bot,
  X,
  Send,
  User,
  ChevronRight,
  Minus,
  RotateCcw,
  Mic,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Scissors,
  Mail,
  MapPin,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import {
  useTextChatInquiryMutation,
  useTextChatSelectSlotMutation,
  useTextChatProvideEmailMutation,
  useVoiceInputMutation,
  useGetConversationHistoryQuery,
} from "@/features/bot/botApi";

export interface Slot {
  date_label: string;
  date_time_text: string;
  professional: string;
  service: string;
  slot_id: string;
  time: string;
}

export interface BookingConfirmed {
  customer_email: string;
  customer_name: string | null;
  date_time_text: string;
  id: string;
  location: string;
  provider: string;
  service: string;
}

export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  slots?: Slot[] | null;
  booking_confirmed?: BookingConfirmed | null;
  escalated?: boolean;
  part?: string;
  isVoice?: boolean;
}

interface QuickOption {
  label: string;
  iconType: "png" | "lucide";
  icon: string | LucideIcon;
  query: string;
}

interface ApiResponse {
  booking_confirmed?: BookingConfirmed | null;
  escalated?: boolean;
  part?: string;
  reply?: string;
  session_id?: string;
  slots?: Slot[] | null;
}

interface ServerHistoryMessage {
  content: string;
  role: "user" | "assistant";
}

interface RootAuthState {
  auth?: {
    user?: {
      email?: string;
      name?: string;
    };
  };
}

function PremiumChatbotIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Headband / Audio Arc */}
      <path
        d="M5 14C5 7.5 10.5 4.5 18 4.5C25.5 4.5 31 7.5 31 14"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Antenna */}
      <path d="M18 5.5V2" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="18" cy="2" r="2.2" fill="#FFE082" />

      {/* Ear Headset Cushions */}
      <rect x="2" y="11.5" width="3.5" height="8.5" rx="1.75" fill="white" />
      <rect x="30.5" y="11.5" width="3.5" height="8.5" rx="1.75" fill="white" />

      {/* Robot Head Body */}
      <rect x="5.5" y="8" width="25" height="19.5" rx="7.5" fill="white" />

      {/* Visor Screen */}
      <rect x="8.5" y="11" width="19" height="13.5" rx="5" fill="#1C1A17" />

      {/* Glowing Happy Eyes */}
      <ellipse cx="14" cy="16.5" rx="2" ry="2.6" fill="#F5C042" />
      <circle cx="14.6" cy="15.7" r="0.8" fill="white" />
      <ellipse cx="22" cy="16.5" rx="2" ry="2.6" fill="#F5C042" />
      <circle cx="22.6" cy="15.7" r="0.8" fill="white" />

      {/* Friendly Smile */}
      <path
        d="M15.8 20.8C16.8 22 19.2 22 20.2 20.8"
        stroke="#F5C042"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Base Collar */}
      <path
        d="M13.5 28.5C13.5 28 15 27.5 18 27.5C21 27.5 22.5 28 22.5 28.5L24 32H12L13.5 28.5Z"
        fill="white"
      />
    </svg>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const stored = localStorage.getItem("cloud_salon_chat_session_id");
    if (stored) return stored;
    const fresh = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("cloud_salon_chat_session_id", fresh);
    return fresh;
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redux auth user
  const authUser = useSelector((state: RootAuthState) => state.auth?.user);

  // RTK Query hooks
  const [textChatInquiry, { isLoading: isInquiryLoading }] = useTextChatInquiryMutation();
  const [textChatSelectSlot, { isLoading: isSlotLoading }] = useTextChatSelectSlotMutation();
  const [textChatProvideEmail, { isLoading: isEmailLoading }] = useTextChatProvideEmailMutation();
  const [voiceInput, { isLoading: isVoiceLoading }] = useVoiceInputMutation();

  const isSending = isInquiryLoading || isSlotLoading || isEmailLoading || isVoiceLoading;

  // History query (skip if no session id yet)
  const { data: historyData } = useGetConversationHistoryQuery(sessionId, {
    skip: !sessionId,
  });

  // Session ID is initialized lazily above; no extra effect needed.

  // Format current time
  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Reset conversation session
  const handleResetSession = () => {
    const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    if (typeof window !== "undefined") {
      localStorage.setItem("cloud_salon_chat_session_id", newSessionId);
    }
    setSessionId(newSessionId);
    setMessages([]);
    setInput("");
  };

  // Process server response
  const handleBotResponse = useCallback((data: ApiResponse) => {
    if (!data) return;

    if (data.session_id && data.session_id !== sessionId) {
      setSessionId(data.session_id);
      if (typeof window !== "undefined") {
        localStorage.setItem("cloud_salon_chat_session_id", data.session_id);
      }
    }

    const botMessage: Message = {
      id: `bot-msg-${Date.now()}`,
      sender: "bot",
      text: data.reply || "I received your request.",
      time: getCurrentTime(),
      slots: data.slots || null,
      booking_confirmed: data.booking_confirmed || null,
      escalated: data.escalated ?? false,
      part: data.part || "",
    };

    setMessages((prev) => [...prev, botMessage]);
  }, [sessionId]);

  // Send a text message (inquiry, slot selection, or email)
  const handleSendMessage = useCallback(
    async (textToSend?: string, explicitType?: "slot" | "email" | "inquiry") => {
      const query = (textToSend || input).trim();
      if (!query || isSending) return;

      const userMessage: Message = {
        id: `user-msg-${Date.now()}`,
        sender: "user",
        text: query,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, userMessage]);
      if (!textToSend) setInput("");

      // Identify message intent / endpoint
      const lastBotMsg = [...messages].reverse().find((m) => m.sender === "bot");
      const lastBotText = (lastBotMsg?.text || "").toLowerCase();
      const hasActiveSlots = Boolean(lastBotMsg?.slots && lastBotMsg.slots.length > 0);
      const isEmailQuery =
        explicitType === "email" ||
        query.includes("@") ||
        lastBotText.includes("email address") ||
        lastBotText.includes("provide your email");

      const isSlotSelection =
        explicitType === "slot" ||
        (!isEmailQuery && hasActiveSlots) ||
        lastBotText.includes("which time works best") ||
        lastBotText.includes("options for a haircut");

      try {
        let responseData: ApiResponse;
        const activeSessionId =
          sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        if (isEmailQuery) {
          responseData = (await textChatProvideEmail({
            session_id: activeSessionId,
            message: query,
          }).unwrap()) as ApiResponse;
        } else if (isSlotSelection) {
          responseData = (await textChatSelectSlot({
            session_id: activeSessionId,
            message: query,
          }).unwrap()) as ApiResponse;
        } else {
          responseData = (await textChatInquiry({
            session_id: activeSessionId,
            message: query,
          }).unwrap()) as ApiResponse;
        }

        handleBotResponse(responseData);
      } catch (err: unknown) {
        console.error("Chat API error:", err);
        const errorRecord = err as { data?: { message?: string }; error?: string };
        const errMsg: Message = {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text:
            errorRecord?.data?.message ||
            errorRecord?.error ||
            "Sorry, I couldn't reach the server. Please check your connection and try again.",
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    },
    [
      input,
      isSending,
      messages,
      sessionId,
      textChatProvideEmail,
      textChatSelectSlot,
      textChatInquiry,
      handleBotResponse,
    ]
  );

  // Listen to custom open event (e.g. from Hero section button)
  useEffect(() => {
    const handleOpenBot = (e?: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      setUnread(false);
      if (customEvent?.detail?.query) {
        handleSendMessage(customEvent.detail.query);
      }
    };

    window.addEventListener("open-salon-bot", handleOpenBot);
    return () => window.removeEventListener("open-salon-bot", handleOpenBot);
  }, [handleSendMessage]);

  // Sync server conversation history if messages state is empty
  useEffect(() => {
    if (historyData?.messages && historyData.messages.length > 0 && messages.length === 0) {
      const loaded: Message[] = historyData.messages.map((m: ServerHistoryMessage, idx: number) => ({
        id: `hist-${idx}`,
        sender: m.role === "user" ? "user" : "bot",
        text: m.content,
        time: "",
      }));
      // Use a timeout so the state update does not happen synchronously
      // inside the effect body, satisfying the react-hooks/set-state-in-effect rule.
      const t = setTimeout(() => setMessages(loaded), 0);
      return () => clearTimeout(t);
    }
  }, [historyData, messages.length]);

  // Scroll to bottom when messages update or chat is opened
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isSending, scrollToBottom]);

  // Quick suggestions
  const quickOptions: QuickOption[] = [
    {
      label: "I need a haircut tomorrow afternoon",
      iconType: "png",
      icon: "/icons/hero/calendar.png",
      query: "I need a haircut tomorrow afternoon",
    },
    {
      label: "Find top beauty specialist",
      iconType: "png",
      icon: "/icons/hero/user-1.png",
      query: "Can you recommend a top hair specialist near me?",
    },
    {
      label: "Find salons near me",
      iconType: "png",
      icon: "/icons/hero/location-1.png",
      query: "Where can I find top salons near me?",
    },
    {
      label: "How does booking work?",
      iconType: "lucide",
      icon: CalendarCheck,
      query: "How does booking work on The Cloud Salon?",
    },
  ];

  // User clicks a specific slot button
  const handleSelectSlot = (slot: Slot) => {
    const promptText = `The ${slot.time} works perfect.`;
    handleSendMessage(promptText, "slot");
  };

  // Voice recording handlers
  const startRecording = async () => {
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined" ||
      (!window.isSecureContext && window.location.hostname !== "localhost")
    ) {
      alert("Voice input requires microphone permission and a secure connection (HTTPS).");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        mediaRecorderRef.current = null;

        if (audioChunksRef.current.length === 0) return;
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        const voiceUserMsg: Message = {
          id: `user-voice-${Date.now()}`,
          sender: "user",
          text: "🎤 Voice Message Sent",
          time: getCurrentTime(),
          isVoice: true,
        };
        setMessages((prev) => [...prev, voiceUserMsg]);

        try {
          const formData = new FormData();
          const activeSessionId =
            sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          formData.append("audio", audioBlob, "voice_message.webm");
          formData.append("session_id", activeSessionId);
          if (authUser?.email) {
            formData.append("email", authUser.email);
          }

          const responseData = (await voiceInput(formData).unwrap()) as ApiResponse;
          handleBotResponse(responseData);
        } catch (err: unknown) {
          console.error("Voice input error:", err);
          const errorRecord = err as { data?: { message?: string }; error?: string };
          const errMsg: Message = {
            id: `bot-err-${Date.now()}`,
            sender: "bot",
            text:
              errorRecord?.data?.message ||
              "Could not process your voice message. Please try speaking again or type your message.",
            time: getCurrentTime(),
          };
          setMessages((prev) => [...prev, errMsg]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("Microphone permission is required to use voice input. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      audioChunksRef.current = [];
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  // Helper to render markdown bolding & bullet items
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          const parts = line.split(/(\*\*.*?\*\*)/g);
          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          return (
            <p key={idx} className="leading-relaxed">
              {renderedLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-black/10 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[580px] sm:h-[630px] animate-in fade-in slide-in-from-bottom-5 duration-200">

          {/* Header Bar */}
          <div className="bg-[#18181B] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">

              <div className="relative w-9 h-9 shrink-0">
                {/* Avatar */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#242428] border border-[#D99722]/40 flex items-center justify-center shadow-inner">
                  <Image
                    src="/icons/Dark_Mode.png"
                    alt="Cloud Assistant Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* Online Status Dot */}
                <span className="absolute bottom-[0px] right-0 z-100 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#18181B]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm leading-tight text-white tracking-tight">
                    Cloud Salon AI
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#D99722]/20 text-[#D99722] font-semibold border border-[#D99722]/30">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-normal">
                  Instant Service & Booking Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetSession}
                title="Start New Chat"
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Minimize Chat"
              >
                <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Body Content Container */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3.5 select-text">
            {/* Initial Welcome Greeting Card */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center mt-0.5 shadow-xs">
                <Image
                  src="/icons/Dark_Mode.png"
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 bg-[#EBE7DF] dark:bg-[#252529] p-3.5 sm:p-4 rounded-2xl space-y-2 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm leading-relaxed shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#D99722] font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Booking Assistant</span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white leading-snug">
                  Welcome to The Cloud Salon!
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-[13px] font-normal leading-relaxed">
                  Tell me what service you need (e.g. <em>&quot;I need a haircut tomorrow afternoon&quot;</em>), and I will instantly find available specialists and book your appointment!
                </p>
              </div>
            </div>

            {/* Quick Starter Suggestions (only when fresh chat) */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 px-1">
                  Suggested inquiries:
                </p>
                {quickOptions.map((item, idx) => {
                  const IconComp = item.iconType === "lucide" ? (item.icon as LucideIcon) : null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(item.query)}
                      disabled={isSending}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EBE7DF]/80 dark:bg-[#252529] hover:bg-[#DDD8CD] dark:hover:bg-[#2F2F35] border border-black/5 dark:border-white/5 flex items-center justify-between text-left transition-all group cursor-pointer shadow-2xs disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.iconType === "png" ? (
                          <Image
                            src={item.icon as string}
                            alt={item.label}
                            width={18}
                            height={18}
                            className="w-4 h-4 object-contain shrink-0"
                          />
                        ) : IconComp ? (
                          <IconComp className="w-4 h-4 text-[#D99722] shrink-0" />
                        ) : null}
                        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-[#D99722] transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#D99722] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Render Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${msg.sender === "user" ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`flex items-end gap-2 max-w-[92%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  {/* Avatar */}
                  {msg.sender === "bot" ? (
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center">
                      <Image
                        src="/icons/Dark_Mode.png"
                        alt="Bot"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#D99722] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${msg.sender === "user"
                      ? "bg-[#D99722] text-white rounded-br-none font-medium"
                      : "bg-[#EBE7DF] dark:bg-[#252529] text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-black/5 dark:border-white/5"
                      }`}
                  >
                    {renderMessageContent(msg.text)}

                    {msg.time && (
                      <span
                        className={`block text-[9px] mt-1.5 ${msg.sender === "user"
                          ? "text-white/75 text-right"
                          : "text-zinc-500 dark:text-zinc-400"
                          }`}
                      >
                        {msg.time}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Slots List (if bot provided slots) */}
                {msg.slots && msg.slots.length > 0 && (
                  <div className="ml-9 mt-2 mr-2 space-y-2 max-w-[90%]">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D99722]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Available Time Slots — Tap to Select:</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {msg.slots.map((slot) => (
                        <button
                          key={slot.slot_id}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          disabled={isSending}
                          className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#2C2C32] hover:bg-[#F6F2EA] dark:hover:bg-[#34343B] border border-[#D99722]/30 hover:border-[#D99722] shadow-xs transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="px-2 py-1 rounded-md bg-[#D99722]/15 text-[#D99722] font-bold text-xs shrink-0 flex items-center gap-1 border border-[#D99722]/30">
                              <Clock className="w-3 h-3" />
                              <span>{slot.time}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Scissors className="w-3 h-3 text-[#D99722]" />
                                <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                                  {slot.service}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                                with {slot.professional} · {slot.date_label}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-[#D99722] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Select <ChevronRight className="w-3 h-3" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking Confirmation Card */}
                {msg.booking_confirmed && (
                  <div className="ml-9 mt-2 mr-2 p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF5EC] to-[#F1ECE0] dark:from-[#252529] dark:to-[#1E1E22] border-2 border-[#D99722] shadow-md space-y-2.5 max-w-[90%]">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Appointment Confirmed!</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Scissors className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                        <span className="font-medium text-zinc-900 dark:text-white">
                          {msg.booking_confirmed.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                        <span>Specialist: {msg.booking_confirmed.provider}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                        <span>Date & Time: {msg.booking_confirmed.date_time_text}</span>
                      </div>
                      {msg.booking_confirmed.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                          <span>Location: {msg.booking_confirmed.location}</span>
                        </div>
                      )}
                      {msg.booking_confirmed.customer_email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                          <span>Confirmation sent to: {msg.booking_confirmed.customer_email}</span>
                        </div>
                      )}
                    </div>

                    {msg.booking_confirmed.id && (
                      <div className="pt-1 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] text-zinc-500">
                        <span>Booking ID:</span>
                        <span className="font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
                          {msg.booking_confirmed.id}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing / Loading Indicator */}
            {isSending && (
              <div className="flex items-center gap-2 pt-1" aria-live="polite">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[#18181A] border border-white/10 shrink-0 flex items-center justify-center">
                  <Image
                    src="/icons/Dark_Mode.png"
                    alt="Typing"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="bg-[#EBE7DF] dark:bg-[#252529] px-3.5 py-2.5 rounded-2xl rounded-bl-none text-xs text-zinc-500 flex items-center gap-1.5 border border-black/5 dark:border-white/5">
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99722] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99722] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99722] animate-bounce" />
                  </span>
                  {/* <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                    Cloud Salon is thinking...
                  </span> */}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Email Pill helper (if user is logged in and last message asked for email) */}
          {authUser?.email && (
            <div className="px-3 py-1.5 bg-[#FAF8F5] dark:bg-[#1A1A1E] border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">Logged in as:</span>
              <button
                type="button"
                onClick={() => handleSendMessage(`my email is ${authUser.email}`, "email")}
                className="text-[10px] font-semibold text-[#D99722] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Mail className="w-3 h-3" />
                <span>Use {authUser.email}</span>
              </button>
            </div>
          )}

          {/* Voice Recording Overlay / Bar */}
          {isRecording ? (
            <div className="p-3 bg-[#EBE7DF] dark:bg-[#252529] border-t border-black/10 dark:border-white/10 shrink-0 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  Recording... {recordingSeconds}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelRecording}
                  className="px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-3 py-1.5 rounded-full bg-[#D99722] hover:bg-[#C2841B] text-white font-medium text-xs shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Voice</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Input Footer Bar */
            <div className="p-2.5 sm:p-3 bg-[#EBE7DF] dark:bg-[#1E1E22] border-t border-black/5 dark:border-white/5 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={isSending}
                  title="Speak with Voice"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#2C2C32] hover:bg-[#F3EFE6] dark:hover:bg-[#383842] text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-all cursor-pointer shrink-0 border border-black/10 dark:border-white/10 shadow-xs"
                >
                  <Mic className="w-4 h-4 text-[#D99722]" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type haircut, slot, or email..."
                    disabled={isSending}
                    className="w-full px-3.5 py-2.5 rounded-full bg-white dark:bg-[#2C2C32] border border-black/10 dark:border-white/10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#D99722]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D99722] hover:bg-[#C2841B] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          )}
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
        aria-label={isOpen ? "Close Salon AI Chat" : "Open Salon AI Chat"}
        title={isOpen ? "Close AI Chatbot" : "Chat with Salon AI Assistant"}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#B87D1B] via-[#D99722] to-[#F1B638] hover:brightness-105 active:scale-95 transition-all shadow-[0_8px_25px_-4px_rgba(217,151,34,0.55)] flex items-center justify-center cursor-pointer group"
      >
        {/* Soft Ambient Pulse Ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#D99722]/35 animate-ping pointer-events-none -z-10 [animation-duration:3s]" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform stroke-[2.5]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <PremiumChatbotIcon className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
            {/* <span className="absolute -top-2.5 -right-2.5 px-1.5 py-0.5 rounded-full bg-[#18181B] text-white text-[9px] font-extrabold border border-[#D99722]/70 shadow-md uppercase tracking-wider flex items-center gap-0.5 pointer-events-none">
              <Sparkles className="w-2.5 h-2.5 text-[#D99722]" />
              <span>AI</span>
            </span> */}
          </div>
        )}

        {unread && !isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#E53E3E] rounded-full border-2 border-white dark:border-[#121214] shadow-xs animate-pulse" />
        )}
      </button>
    </>
  );
}
