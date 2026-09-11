"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Title */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] block">
            GOOD TO KNOW
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-bold text-foreground">
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
                className="border-b border-border pb-4 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer group"
                >
                  <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                    {faq.q}
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
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed pt-1.5 pr-6">
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
  );
}

