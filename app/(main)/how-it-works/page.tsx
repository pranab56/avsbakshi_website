"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  Calendar,
  CreditCard,
  Star,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Building2,
  Award,
} from "lucide-react";
import Hero, { RoleType } from "@/components/how-it-works/Hero";
import RoleOverviewHeader from "@/components/how-it-works/RoleOverviewHeader";
import RoleStepsTimeline, { StepItem } from "@/components/how-it-works/RoleStepsTimeline";
import FaqSection from "@/components/how-it-works/FaqSection";
import GetStartedCta from "@/components/how-it-works/GetStartedCta";

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<RoleType>("customers");

  // Content per Role
  const roleContent: Record<RoleType, { headerTitle: string; headerSubtitle: string; steps: StepItem[] }> = {
    customers: {
      headerTitle: "Book the perfect appointment in minutes.",
      headerSubtitle:
        "Find, book, and pay for beauty services from independent professionals and salons across the UK — all in one place.",
      steps: [
        {
          num: "01",
          title: "Search & discover",
          desc: "Browse by service, location, and availability. Filter by provider type, price range, and distance. Every listing shows real reviews and transparent pricing.",
          icon: Search,
        },
        {
          num: "02",
          title: "Choose your professional",
          desc: "View full profiles — bios, portfolios, service menus, and verified reviews. Compare professionals side by side before you decide.",
          icon: FileText,
        },
        {
          num: "03",
          title: "Pick a time that works",
          desc: "See live, real-time availability and book instantly. No phone calls, no back-and-forth messages. You'll receive a confirmation and reminder straight away.",
          icon: Calendar,
        },
        {
          num: "04",
          title: "Pay securely",
          desc: "Pay through Cloud Salon using your card, Apple Pay, or Google Pay. Payment is held securely and only released to the professional after your appointment is complete.",
          icon: CreditCard,
        },
        {
          num: "05",
          title: "Leave a review",
          desc: "After your appointment, share your experience. Your reviews help other customers find great professionals and help professionals grow their practice.",
          icon: Star,
        },
      ],
    },
    professionals: {
      headerTitle: "Grow your beauty business on your own terms.",
      headerSubtitle:
        "Manage your calendar, accept instant online bookings, build client relationships, and get paid seamlessly — all in one platform.",
      steps: [
        {
          num: "01",
          title: "Set up your profile",
          desc: "Showcase your specialty, bio, service menu, custom pricing, and past work portfolio. Highlight your expertise to attract new clients.",
          icon: Sparkles,
        },
        {
          num: "02",
          title: "Configure availability & services",
          desc: "Define your working hours, buffer times between clients, and cancellation policies. Sync with your personal calendar effortlessly.",
          icon: Calendar,
        },
        {
          num: "03",
          title: "Accept instant online bookings",
          desc: "Clients book directly through your custom profile link or the Cloud Salon marketplace with real-time confirmation.",
          icon: Zap,
        },
        {
          num: "04",
          title: "Automate payments & deposits",
          desc: "Collect deposits or full payments upfront to eliminate no-shows. Funds are deposited directly to your bank account with full reporting.",
          icon: ShieldCheck,
        },
        {
          num: "05",
          title: "Build client loyalty & reviews",
          desc: "Keep client notes, formulas, and history organized. Automated re-booking reminders keep your calendar filled month after month.",
          icon: TrendingUp,
        },
      ],
    },
    businesses: {
      headerTitle: "Power your salon operations effortlessly.",
      headerSubtitle:
        "Manage multiple chairs, staff schedules, chair rentals, and enterprise salon analytics in one unified cloud system.",
      steps: [
        {
          num: "01",
          title: "Register your salon storefront",
          desc: "Add your salon locations, chair inventory, amenities, and staff team members to create an official salon storefront.",
          icon: Building2,
        },
        {
          num: "02",
          title: "Manage chair rentals & staff",
          desc: "Rent out unused styling chairs to independent professionals or manage employed staff schedules all from one central portal.",
          icon: FileText,
        },
        {
          num: "03",
          title: "Multi-staff smart scheduling",
          desc: "Assign services, shift patterns, and commission rules per team member. Enable unified booking for all services across your salon.",
          icon: Calendar,
        },
        {
          num: "04",
          title: "Unified payouts & reporting",
          desc: "Process in-person and online payments with automatic split payouts for staff and chair renters. Track daily revenue and financial metrics.",
          icon: CreditCard,
        },
        {
          num: "05",
          title: "Scale your salon brand",
          desc: "Gain insights into peak booking hours, top-performing services, and client retention. Run targeted promotional campaigns.",
          icon: Award,
        },
      ],
    },
  };

  const currentRoleData = roleContent[activeRole];

  return (
    <div className="min-h-screen text-[#1A1A1A] font-sans">
      <Hero activeRole={activeRole} setActiveRole={setActiveRole} />
      <RoleOverviewHeader
        title={currentRoleData.headerTitle}
        subtitle={currentRoleData.headerSubtitle}
      />
      <RoleStepsTimeline steps={currentRoleData.steps} />
      <FaqSection />
      <GetStartedCta />
    </div>
  );
}