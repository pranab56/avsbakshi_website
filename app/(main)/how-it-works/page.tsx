"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Scissors,
    Building2,
    Search,
    FileText,
    Calendar,
    CreditCard,
    Star,
    ChevronDown,
    Sparkles,
    ShieldCheck,
    Zap,
    TrendingUp,
    Award,
} from "lucide-react";

type RoleType = "customers" | "professionals" | "businesses";

export default function HowItWorksPage() {
    const [activeRole, setActiveRole] = useState<RoleType>("customers");
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // Content per Role
    const roleContent = {
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

    // FAQ Items
    const faqs = [
        {
            q: "What is Cloud Salon?",
            a: "Cloud Salon is a simple way to discover independent beauty professionals and exceptional salons near you. Browse real work, compare reviews, and book with confidence.",
        },
        {
            q: "How do I know who to trust?",
            a: "All professionals on Cloud Salon have verified profiles, portfolios, and genuine customer reviews. We also ensure transparent pricing and secure booking.",
        },
        {
            q: "Can I join as a beauty professional?",
            a: "Yes! Cloud Salon provides powerful tools for independent beauty professionals and salon owners to manage bookings, clients, and grow their business.",
        },
        {
            q: "Is Cloud Salon free to use?",
            a: "Cloud Salon is completely free for clients to search, discover, and book appointments. There are no hidden booking fees.",
        },
    ];

    return (
        <div className="min-h-screen  text-[#1A1A1A] font-sans">
            {/* 1. Hero Section (Dark Theme) */}
            <section className="bg-[#181715] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-6">
                    <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.25em] block">
                        HOW IT WORKS
                    </span>

                    <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight">
                        <span className="italic block text-white font-serif">
                            Simple for everyone.
                        </span>
                        <span className="italic block text-[#B78735] font-serif mt-1">
                            Powerful where it counts.
                        </span>
                    </h1>

                    {/* Role Filter Tabs (Segmented Control Pill) */}
                    <div className="pt-4 flex justify-center">
                        <div className="bg-[#242220] p-1.5 rounded-2xl border border-white/10 inline-flex items-center gap-1 max-w-full overflow-x-auto shadow-inner">
                            <button
                                type="button"
                                onClick={() => setActiveRole("customers")}
                                className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${activeRole === "customers"
                                    ? "bg-[#B78735] text-white shadow-md"
                                    : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                For Customers
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveRole("professionals")}
                                className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${activeRole === "professionals"
                                    ? "bg-[#B78735] text-white shadow-md"
                                    : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                <Scissors className="w-4 h-4" />
                                For Professionals
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveRole("businesses")}
                                className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${activeRole === "businesses"
                                    ? "bg-[#B78735] text-white shadow-md"
                                    : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                <Building2 className="w-4 h-4" />
                                For Businesses
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Intro Sub-header */}
            <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center bg-[#F3F0EA]">
                <h2 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight">
                    {currentRoleData.headerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed mt-3 max-w-xl mx-auto">
                    {currentRoleData.headerSubtitle}
                </p>
            </section>

            {/* 3. Vertical Timeline Steps */}
            <section className="py-20 flex justify-center items-center bg-white">
                <div className="relative space-y-16 sm:space-y-20 max-w-xl">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-6 sm:left-7 top-6 bottom-6 w-[2px] bg-[#D8D2C4] -z-0" />

                    {currentRoleData.steps.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isFirst = idx === 0;

                        return (
                            <div
                                key={step.num}
                                className="relative z-10 flex items-start gap-5 sm:gap-6 group"
                            >
                                {/* Icon Circle */}
                                <div
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm ${isFirst
                                        ? "bg-[#B78735] text-white"
                                        : "bg-[#F0ECE1] border border-[#DDD6C8] text-[#8C7A65]"
                                        }`}
                                >
                                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>

                                {/* Content */}
                                <div className="pt-1 sm:pt-2 flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-title font-semibold text-xs sm:text-sm text-[#B78735]">
                                            {step.num}
                                        </span>
                                        <h3 className="font-title text-lg sm:text-xl font-bold text-[#1A1A1A]">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-1.5 max-w-lg">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4. FAQ Section ("GOOD TO KNOW") */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFDFD]">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    {/* Left Title */}
                    <div className="lg:col-span-5 space-y-2">
                        <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
                            GOOD TO KNOW
                        </span>
                        <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                            Questions, answered.
                        </h2>
                    </div>

                    {/* Right Accordion List */}
                    <div className="lg:col-span-7 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="border-b border-[#D0C8B7] pb-4 transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer group"
                                    >
                                        <span className="font-semibold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${
                                                isOpen ? "rotate-180 text-[#B78735]" : ""
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100 pb-3"
                                                : "grid-rows-[0fr] opacity-0 pb-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed pt-1.5 pr-6">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Bottom CTA Section ("Ready to get started?") */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EBE0] text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
                        Ready to get{" "}
                        <span className="text-[#B78735] font-title italic">started?</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 font-normal">
                        Find your next appointment in under 2 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <Link
                            href="/search"
                            className="w-full sm:w-auto px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium text-sm rounded-lg shadow transition-all cursor-pointer text-center"
                        >
                            Find a Professional
                        </Link>
                        <Link
                            href="/discover"
                            className="w-full sm:w-auto px-6 py-3 bg-[#E6E1D5] hover:bg-[#DDD8CA] text-[#1A1A1A] font-medium text-sm rounded-lg transition-all cursor-pointer text-center border border-[#CEC6B4]"
                        >
                            Browse Salons
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}