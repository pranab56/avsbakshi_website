"use client";

import React, { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const ChatBot = dynamic(() => import("react-chatbotify"), {
  ssr: false,
});

const emptySubscribe = () => () => {};

export default function Chatbot() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { resolvedTheme } = useTheme();

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const flow = {
    start: {
      message: "👋 Hello! Welcome to **The Cloud Salon**! How can I assist you today?",
      options: [
        "💇 Explore Services",
        "📅 Book an Appointment",
        "💎 Special Offers",
        "📞 Customer Support",
      ],
      path: "handle_choice",
    },
    handle_choice: {
      transition: { duration: 0 },
      path: (params: { userInput: string }) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("service") || input.includes("💇")) {
          return "services";
        }
        if (input.includes("book") || input.includes("appointment") || input.includes("📅")) {
          return "booking";
        }
        if (input.includes("offer") || input.includes("special") || input.includes("💎")) {
          return "offers";
        }
        if (input.includes("support") || input.includes("customer") || input.includes("📞")) {
          return "support";
        }
        return "general_reply";
      },
    },
    services: {
      message:
        "✨ We offer a wide range of beauty & wellness services:\n\n• Haircuts, Styling & Hair Care\n• Nail Art, Manicures & Pedicures\n• Facial Treatments & Skincare\n• Makeup & Bridal Services\n• Spa & Relaxation Treatments",
      options: ["📅 Book an Appointment", "↩️ Main Menu"],
      path: (params: { userInput: string }) =>
        params.userInput.includes("Book") ? "booking" : "start",
    },
    booking: {
      message:
        " You can browse verified salons and top beauty professionals nearby to book instantly! Would you like to search now?",
      options: ["🔍 Go to Search", "↩️ Main Menu"],
      path: (params: { userInput: string }) => {
        if (params.userInput.includes("Search")) {
          window.location.href = "/search";
          return "redirecting";
        }
        return "start";
      },
    },
    redirecting: {
      message: "Taking you to our search page...",
      path: "start",
    },
    offers: {
      message:
        "🔥 **Current Special Offers**:\n\n• Get **20% OFF** your first salon booking with code `WELCOME20`!\n• Package deals available for Hair + Spa combos.",
      options: ["📅 Book with Discount", "↩️ Main Menu"],
      path: (params: { userInput: string }) =>
        params.userInput.includes("Book") ? "booking" : "start",
    },
    support: {
      message:
        "💬 Need personal assistance?\n\n• Email us: **support@cloudsalon.com**\n• Call: **+1 (800) 555-SALON**\n• Hours: Mon-Sat, 9:00 AM - 8:00 PM",
      options: ["↩️ Main Menu"],
      path: "start",
    },
    general_reply: {
      message: (params: { userInput: string }) =>
        `Thank you for your message! Regarding "${params.userInput}", our Cloud Salon team will be happy to guide you. Is there anything else you would like to know?`,
      options: ["💇 Explore Services", "📅 Book an Appointment", "↩️ Main Menu"],
      path: "handle_choice",
    },
  };

  const settings = {
    general: {
      primaryColor: "#B78735",
      secondaryColor: isDark ? "#27272A" : "#F4F4F5",
      fontFamily: "var(--font-sans), sans-serif",
      embedded: false,
      showFooter: false,
    },
    footer: {
      text: "",
    },
    fileAttachment: {
      disabled: true,
    },
    emoji: {
      disabled: true,
    },
    header: {
      title: "Cloud Salon Assistant",
      showAvatar: true,
      avatar: isDark ? "/icons/Dark_Mode.png" : "/icons/Light_Mode.png",
    },
    chatButton: {
      icon: isDark ? "/icons/Dark_Mode.png" : "/icons/Light_Mode.png",
    },
    tooltip: {
      mode: "CLOSE",
      text: "Need help? Chat with us! 💬",
    },
    chatWindow: {
      autoJumpToBottom: true,
      showScrollbar: true,
      defaultOpen: false,
    },
  };

  const styles = {
    chatButtonStyle: {
      bottom: "24px",
      right: "24px",
      backgroundColor: "#B78735",
      boxShadow: "0 8px 24px rgba(183, 135, 53, 0.35)",
    },
    tooltipStyle: {
      backgroundColor: isDark ? "#27272A" : "#FFFFFF",
      color: isDark ? "#FAFAFA" : "#18181B",
      fontWeight: 600,
      fontSize: "13px",
      boxShadow: isDark
        ? "0 4px 20px rgba(0, 0, 0, 0.5)"
        : "0 4px 20px rgba(0, 0, 0, 0.12)",
      border: isDark ? "1px solid #3F3F46" : "1px solid #E4E4E7",
      padding: "8px 14px",
      borderRadius: "12px",
    },
    chatWindowStyle: {
      bottom: "85px",
      right: "24px",
      borderRadius: "16px",
      backgroundColor: isDark ? "#18181B" : "#FFFFFF",
      borderColor: isDark ? "#27272A" : "#E4E4E7",
    },
    headerStyle: {
      backgroundColor: "#B78735",
      color: "#FFFFFF",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
    },
    footerStyle: {
      display: "none",
    },
    botBubbleStyle: {
      backgroundColor: isDark ? "#27272A" : "#F4F4F5",
      color: isDark ? "#FAFAFA" : "#18181B",
      borderRadius: "12px",
    },
    userBubbleStyle: {
      backgroundColor: "#B78735",
      color: "#FFFFFF",
      borderRadius: "12px",
    },
    botOptionStyle: {
      backgroundColor: isDark ? "#27272A" : "#FFFFFF",
      color: "#B78735",
      borderColor: "#B78735",
      fontWeight: 600,
    },
    botOptionHoveredStyle: {
      backgroundColor: "#B78735",
      color: "#FFFFFF",
    },
    chatInputAreaStyle: {
      backgroundColor: isDark ? "#18181B" : "#FFFFFF",
      color: isDark ? "#FAFAFA" : "#18181B",
    },
  };

  return (
    <ChatBot
      flow={flow}
      settings={settings}
      styles={styles}
    />
  );
}
