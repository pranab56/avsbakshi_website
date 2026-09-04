"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Scissors, Calendar, CreditCard, Shield, User, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const topQuestions = [
    {
      q: "How do I find the right professional for me?",
      a: "Use our search filters to filter by service type, distance, availability, and client ratings. You can also view full portfolio photo galleries and read verified client reviews before booking."
    },
    {
      q: "Are all professionals on Cloud Salon verified?",
      a: "Yes! Every professional and salon goes through an application process that includes identity verification, credential checks, and profile reviews by our team."
    },
    {
      q: "Can I book a consultation before committing to a full appointment?",
      a: "Many professionals offer standalone 15-minute consultation slots. Look for 'Consultation' in their service menu or message them directly."
    },
    {
      q: "What if I am not happy with my appointment?",
      a: "We take client satisfaction very seriously. If you have any issue, contact our 7-day customer support team within 24 hours and we will work with the professional to resolve it."
    },
    {
      q: "Can I save favourite professionals?",
      a: "Yes! Click the heart icon on any professional or salon card to add them to your saved list for quick rebooking."
    }
  ];

  const categories = [
    { icon: Scissors, title: "For Professionals", count: "6 questions", link: "#" },
    { icon: Calendar, title: "Bookings & Cancellations", count: "5 questions", link: "#" },
    { icon: CreditCard, title: "Payments & Pricing", count: "5 questions", link: "#" },
    { icon: Shield, title: "Trust & Safety", count: "4 questions", link: "#" },
    { icon: User, title: "Account & Settings", count: "3 questions", link: "#" },
  ];

  const filteredQuestions = topQuestions.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F3EF] space-y-16 pb-20">
      {/* Dark Hero Header */}
      <section className="bg-[#1E1C1A] text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block">
            HELP CENTRE
          </span>
          <h1 className="font-title text-4xl sm:text-5xl font-bold leading-tight">
            How can we <br />
            <span className="font-light italic text-[#CAA054]">help you?</span>
          </h1>
          <p className="text-xs text-zinc-400 font-light max-w-md mx-auto">
            Answers to the most common questions from customers and professionals. Can&apos;t find what you need? Our support team is available seven days a week.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2C2A26] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#B78735]"
            />
          </div>
        </div>
      </section>

      {/* Accordion Questions */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {filteredQuestions.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-[#E5E0D6] overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-semibold text-sm text-[#1A1A1A] hover:text-[#B78735] transition-colors cursor-pointer"
            >
              <span>{item.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#B78735] transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-600 font-light leading-relaxed animate-in fade-in duration-150 border-t border-[#F5F3EF] pt-3">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* FAQ Category Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">
          OR BROWSE BY CATEGORY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E5E0D6] shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3EF] text-[#B78735] flex items-center justify-center group-hover:bg-[#B78735] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1A1A1A]">{cat.title}</h4>
                    <p className="text-[11px] text-zinc-400">{cat.count}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#B78735] group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-4">
        <span className="text-xs font-bold text-[#B78735] uppercase tracking-widest block">
          GET STARTED
        </span>
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Ready for Your Next <br />
          <span className="italic text-[#B78735]">Appointment?</span>
        </h2>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/search"
            className="px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-xl shadow transition-colors"
          >
            Find a Service
          </Link>
          <Link
            href="/discover?tab=professionals"
            className="px-6 py-3 bg-[#E8E4DA] hover:bg-[#DDD8CA] text-[#2C2E33] text-xs font-semibold rounded-xl transition-colors"
          >
            Explore Professionals
          </Link>
        </div>
      </section>
    </div>
  );
}
