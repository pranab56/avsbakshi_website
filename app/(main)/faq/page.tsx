"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Scissors,
  Calendar,
  CreditCard,
  ShieldCheck,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Question 2 open by default as in design screenshot
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const topQuestions = [
    {
      category: "general",
      q: "How do I find the right professional for me?",
      a: "Use our search filters to browse by service type, location, price range, and availability. You can view full professional profiles, portfolios of past work, and verified customer reviews before booking.",
    },
    {
      category: "Trust & Safety",
      q: "Are all professionals on Cloud Salon verified?",
      a: "Every professional on Cloud Salon goes through an application process that includes identity verification, professional credential checks, and a profile review by our team. Profiles displaying the blue Verified badge have passed all steps. You can always check a professional's verification status directly on their profile.",
    },
    {
      category: "Bookings & Cancellations",
      q: "Can I book a consultation before committing to a full appointment?",
      a: "Yes! Many professionals offer standalone 15-minute consultation slots. Look for 'Consultation' in their service menu or message them directly prior to booking.",
    },
    {
      category: "general",
      q: "What if I am not happy with my appointment?",
      a: "We take client satisfaction very seriously. If you experience any issue, please reach out to our customer support team within 24 hours of your service, and we will work directly with the professional to resolve it.",
    },
    {
      category: "Account & Settings",
      q: "Can I save favourite professionals?",
      a: "Yes! Click the heart icon on any professional or salon profile card to save them to your favorites for quick and easy rebooking.",
    },
  ];

  const categories = [
    { icon: Scissors, title: "For Professionals", count: "6 questions", key: "For Professionals" },
    { icon: Calendar, title: "Bookings & Cancellations", count: "5 questions", key: "Bookings & Cancellations" },
    { icon: CreditCard, title: "Payments & Pricing", count: "5 questions", key: "Payments & Pricing" },
    { icon: ShieldCheck, title: "Trust & Safety", count: "4 questions", key: "Trust & Safety" },
    { icon: Settings, title: "Account & Settings", count: "3 questions", key: "Account & Settings" },
  ];

  const filteredQuestions = topQuestions.filter((item) => {
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans">
      {/* 1. Hero Section (Dark Theme with Left-aligned content) */}
      <section className="bg-[#181614] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#B78735]/30 to-transparent" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-zinc-400" />
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
              HELP CENTRE
            </span>
          </div>

          <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            How can we <br />
            <span className="italic font-serif text-[#C48B36] font-normal">
              help you?
            </span>
          </h1>

          <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
            <p>Answers to the most common questions from customers and professionals.</p>
            <p>Can&apos;t find what you need? Our support team is available seven days a week.</p>
          </div>

          {/* Search Input Box */}
          <div className="max-w-md relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#282522]/90 border border-white/15 rounded-sm pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#B78735] transition-all shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* 2. Main Content (Accordion & Categories) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Accordion Questions Card */}
        <div className="bg-[#FDFDFD] border border-gray-200 rounded-xl p-4 sm:p-6 space-y-3 shadow-sm">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-gray-200 last:border-0 pb-3 last:pb-0 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-3 gap-4 cursor-pointer group"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#B78735] transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#B78735]" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-3"
                      : "grid-rows-[0fr] opacity-0 pb-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed pr-4">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-xs text-zinc-500 py-6">
              No questions found matching &ldquo;{searchQuery}&rdquo;.
            </p>
          )}
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;

            return (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedCategory(isSelected ? null : cat.key)}
                className={`p-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer group ${isSelected
                  ? "bg-[#B78735] text-white"
                  : "bg-[#DED8CC] hover:bg-[#D6CFBF]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#E6E0D4] text-[#8C7A65]"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-xs sm:text-sm ${isSelected ? "text-white" : "text-[#1A1A1A]"
                        }`}
                    >
                      {cat.title}
                    </h4>
                    <p
                      className={`text-[11px] ${isSelected ? "text-white/80" : "text-zinc-500"
                        }`}
                    >
                      {cat.count}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? "text-white" : "text-zinc-500"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom CTA Section ("Ready for Your Next Appointment?") */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EBE0] text-center border-t border-[#D0C7B5]">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
            GET STARTED
          </span>
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
            Ready for Your Next{" "}
            <span className="text-[#B78735] font-title italic block sm:inline">
              Appointment?
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-normal">
            Join thousands of customers discovering and booking beauty services they love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/search"
              className="w-full sm:w-auto px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium text-xs sm:text-sm rounded-sm shadow transition-all cursor-pointer text-center"
            >
              Find a Service
            </Link>
            <Link
              href="/discover"
              className="w-full sm:w-auto px-6 py-3 bg-[#E5DFD4] hover:bg-[#DCD5C9] text-[#1A1A1A] font-medium text-xs sm:text-sm rounded-sm transition-all cursor-pointer text-center border border-[#CEC6B7]"
            >
              Explore Professionals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
