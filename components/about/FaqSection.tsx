"use client";

import { useState } from "react";
import { ChevronDown, Loader2, HelpCircle } from "lucide-react";
import { useFAQListQuery } from "@/features/faq/faqApi";

const defaultFaqs = [
  {
    q: "What is The Cloud Salon?",
    a: "The Cloud Salon is a modern marketplace designed to discover independent beauty professionals, explore luxury salon workspaces, and book appointments seamlessly — all with transparent pricing and verified reviews.",
  },
  {
    q: "How do I know the professionals are verified?",
    a: "Every stylist, barber, and esthetician on Cloud Salon undergoes a verification process. Profiles include authentic portfolios, confirmed licensing or salon affiliations, and genuine reviews from verified clients.",
  },
  {
    q: "Can I join as an independent beauty professional or salon owner?",
    a: "Yes! Cloud Salon provides dedicated booking systems, calendar tools, instant payout features, and chair rental listings for salon owners and freelancers.",
  },
  {
    q: "Are there any hidden booking fees for clients?",
    a: "No. Browsing, discovering, and booking appointments on The Cloud Salon is 100% free for clients. You pay only for the services you receive.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: faqRes, isLoading } = useFAQListQuery(undefined);

  const apiFaqs = faqRes?.data || [];
  const faqs = apiFaqs.length > 0
    ? apiFaqs.map((f: { _id?: string; question?: string; answer?: string; q?: string; a?: string }) => ({
        q: f.question || f.q || "",
        a: f.answer || f.a || "",
      }))
    : defaultFaqs;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99722]/10 border border-[#D99722]/20">
            <HelpCircle className="w-3.5 h-3.5 text-[#D99722]" />
            <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              COMMON QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Everything you need <br />
            <span className="text-[#D99722]">to know.</span>
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Have questions about bookings, stylist verification, or chair rentals? We are here to help every step of the way.
          </p>
        </div>

        <div className="md:col-span-7 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2 text-[#D99722]" />
              <span className="text-xs font-semibold">Loading questions...</span>
            </div>
          ) : (
            faqs.map((faq: { q: string; a: string }, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-card border-[#D99722]/50 shadow-sm"
                      : "bg-card/50 hover:bg-card border-border/80 hover:border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-foreground">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#D99722] text-white rotate-180"
                          : "bg-accent text-muted-foreground"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
