"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  q: string;
  a: string;
}

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "How do I cancel or reschedule an existing appointment?",
      a: "You can modify or cancel any upcoming appointment directly from your customer dashboard under 'My Bookings'. Cancellation policies are clearly noted on the professional's page and in your booking confirmation email. Free cancellation is generally permitted up to 24-48 hours before the service start time.",
    },
    {
      q: "How do workspace bookings and chair rentals work for stylists?",
      a: "Independent stylists and barbers can browse verified salon spaces, select dedicated chair rentals by daily, weekly, or monthly slots, and book with transparent upfront pricing. Once approved by the salon owner, you receive check-in instructions and salon access details.",
    },
    {
      q: "How do salon owners get started with listing workspaces?",
      a: "Salon owners can register directly through our portal by choosing the 'Salon Owner' role during sign-up. Complete our 6-step business onboarding wizard to showcase your venue, available chairs, operating hours, and amenities. Your venue profile is reviewed and published within 24 hours.",
    },
    {
      q: "What should I do if I experience an issue with a booking or specialist?",
      a: "Your satisfaction and safety are our top priorities. If any issue arises before, during, or after your appointment, please contact our concierge team directly via this page or email support@thecloudsalon.com within 24 hours. We mediate disputes and enforce our verified client guarantee.",
    },
    {
      q: "How do payouts and earnings work for professionals?",
      a: "Professionals receive payouts directly to their linked bank account via our secure payment gateway. Funds for completed appointments are processed within 24 to 48 business hours after service completion with full fee breakdown transparency.",
    },
  ];

  return (
    <section className="bg-accent/40 border-y border-border py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMON HELP QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Quick solutions to the questions clients, stylists, and salon owners ask us most frequently.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 space-y-3 shadow-xs">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-border last:border-0 pb-3 last:pb-0 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-3 gap-4 cursor-pointer group"
                >
                  <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
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
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
          >
            <span>Browse Full FAQ Knowledge Base</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

