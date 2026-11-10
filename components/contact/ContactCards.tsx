"use client";

import { MessageSquare, Scissors, Building2, PhoneCall, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactCards() {
  const cards = [
    {
      icon: MessageSquare,
      badge: "CLIENT CARE",
      title: "Client & Appointment Help",
      desc: "Questions about your upcoming appointments, rescheduling, cancellations, or payment receipts.",
      email: "support@thecloudsalon.com",
      linkText: "Email Support Team",
      linkHref: "mailto:support@thecloudsalon.com",
      hours: "Mon – Sun: 8:00 AM – 9:00 PM EST",
    },
    {
      icon: Scissors,
      badge: "PROFESSIONALS",
      title: "Stylists & Workspace Rentals",
      desc: "Need guidance on renting chairs, booth fees, payout transfers, or verifying your specialist profile.",
      email: "professionals@thecloudsalon.com",
      linkText: "Contact Stylist Concierge",
      linkHref: "mailto:professionals@thecloudsalon.com",
      hours: "Dedicated Specialist Rep",
    },
    {
      icon: Building2,
      badge: "SALON OWNERS",
      title: "Salon Owners & Venues",
      desc: "Learn how to list chairs, automate booth leases, verify your venue, or manage multiple salon locations.",
      email: "salons@thecloudsalon.com",
      linkText: "Speak with Venue Advisory",
      linkHref: "mailto:salons@thecloudsalon.com",
      hours: "Fast-Track Onboarding",
    },
    {
      icon: PhoneCall,
      badge: "DIRECT LINE",
      title: "Direct Phone & Concierge",
      desc: "Urgent issue with an active booking today? Call our dedicated support line for priority assistance.",
      email: "+1 (555) 234-7256",
      linkText: "Call Us Now",
      linkHref: "tel:+15552347256",
      hours: "Toll-Free in US & Canada",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-xl hover:border-[#D99722]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#D99722]/10 text-[#D99722] flex items-center justify-center group-hover:bg-[#D99722] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                    {c.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground group-hover:text-[#D99722] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>

              {/* <div className="pt-5 mt-4 border-t border-border/60 space-y-2">
                <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{c.hours}</span>
                </p>
                <a
                  href={c.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D99722] hover:underline"
                >
                  <span>{c.email}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}

