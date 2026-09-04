"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Cloud Salon?",
      a: "Cloud Salon is a simple way to discover independent beauty professionals and exceptional salons near you. Browse real work, compare reviews, and book with confidence.",
    },
    {
      q: "How do I know who to trust?",
      a: "Every professional and salon on Cloud Salon goes through a strict verification process. Look for the 'Verified' badge on their profiles for extra peace of mind.",
    },
    {
      q: "Can I join as a beauty professional?",
      a: "Yes! Whether you work independently or manage a full salon team, Cloud Salon gives you tools for online bookings, calendar management, earnings tracking, and client growth.",
    },
    {
      q: "Is Cloud Salon free to use?",
      a: "For customers, searching and browsing is 100% free. You only pay for the services you book with clear, transparent pricing and no hidden costs.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Left Column: Title */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
            GOOD TO KNOW
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#1A1A1A]">
            Questions, answered.
          </h2>
        </div>

        {/* Right Column: Clean Accordion List with Dividers */}
        <div className="md:col-span-7">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-[#D8CFC2] py-5 sm:py-6 first:pt-0 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left flex items-center justify-between font-semibold text-base sm:text-lg text-[#1A1A1A] hover:text-[#B78735] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1A1A1A] transition-transform duration-300 shrink-0 ml-4 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pt-3 pb-2 text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-xl animate-in fade-in duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
