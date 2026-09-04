"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users,
  Scissors,
  Calendar,
  DollarSign,
  UserCheck,
  Building2,
  ChevronDown,
} from "lucide-react";

export default function ForBusinessesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: Users,
      title: "Team Management",
      desc: "Add your professionals, set their services and availability, and manage your entire team from one place.",
      bgColor: "bg-[#3B5998]/10",
      textColor: "text-[#3B5998]",
    },
    {
      icon: Scissors,
      title: "Shared Services",
      desc: "Create a shared service menu that your team members can offer, with individual pricing and durations.",
      bgColor: "bg-[#8A6D3B]/10",
      textColor: "text-[#8A6D3B]",
    },
    {
      icon: Calendar,
      title: "Shared Calendar",
      desc: "See all bookings across your entire team in one unified calendar view. Never double-book again.",
      bgColor: "bg-[#A94442]/10",
      textColor: "text-[#A94442]",
    },
    {
      icon: DollarSign,
      title: "Revenue Tracking",
      desc: "Monitor earnings per service, per professional, and across your whole business in real time.",
      bgColor: "bg-[#B78735]/10",
      textColor: "text-[#B78735]",
    },
    {
      icon: UserCheck,
      title: "Customer Management",
      desc: "Build a detailed client database with history, preferences, and spending insights.",
      bgColor: "bg-[#3B5998]/10",
      textColor: "text-[#3B5998]",
    },
    {
      icon: Building2,
      title: "Business Profile",
      desc: "A premium business profile page that showcases your team, services, gallery, and reviews.",
      bgColor: "bg-[#2E7D32]/10",
      textColor: "text-[#2E7D32]",
    },
  ];

  const steps = [
    { num: "01", title: "Register", desc: "Create your business account and submit your salon information." },
    { num: "02", title: "Onboard", desc: "Add your team, services, opening hours, and photos." },
    { num: "03", title: "Verify", desc: "We review your business details within 3-5 business days." },
    { num: "04", title: "Launch", desc: "Your business profile goes live and bookings start coming in." },
  ];

  const faqs = [
    { q: "How do I add my team members?", a: "You can easily invite staff members via email from your business admin portal to set up their individual schedules." },
    { q: "Can team members have individual profiles?", a: "Yes! Each professional gets their own profile linked directly under your salon business page." },
    { q: "Is there a limit on team size?", a: "No, Cloud Salon scales seamlessly whether you have 2 chairs or 50 salon locations." },
    { q: "How does booking management work?", a: "Clients can book specific stylists or choose 'first available' for any service, with automated SMS/email reminders." },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EF] space-y-20">
      {/* Dark Hero Banner */}
      <section className="bg-[#1E1C1A] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Bottom-right warm amber color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/40 via-[#5A3819]/15 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B78735]" />
              <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
                FOR BUSINESSES
              </span>
            </div>

            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
              Run Your Salon <br />
              <span className="font-light italic text-[#CAA054]">Smarter.</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
              Manage your team, services, bookings, schedules, customers, and revenue from one powerful business platform.
            </p>

            <div className="pt-2">
              <Link
                href="/register?role=business"
                className="px-6 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-colors inline-block"
              >
                Start Your Business
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 pt-8 border-t border-white/10">
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">3,400+</h4>
                <p className="text-xs text-zinc-400 font-normal">Partner Salons</p>
              </div>
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">98%</h4>
                <p className="text-xs text-zinc-400 font-normal">Satisfaction Rate</p>
              </div>
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">£2,400</h4>
                <p className="text-xs text-zinc-400 font-normal">Avg Monthly Earnings</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 h-[480px] sm:h-[580px] lg:h-[620px] w-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
            PLATFORM FEATURES
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-tight mb-3">
            Everything your salon needs.
          </h2>
          <p className="text-xs sm:text-sm text-[#666159] font-normal max-w-md mx-auto">
            From team management to revenue tracking — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg p-8 border border-gray-200 flex flex-col items-start text-left shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-9 h-9 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center mb-5 shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.textColor}`} />
                </div>
                <h3 className="font-title text-lg font-bold text-[#1A1A1A] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Steps Timeline */}
      <section className="bg-[#e3dfd8] py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-14 sm:mb-16">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
              GETTING STARTED
            </span>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1A1A1A]">
              Up and running in days.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="font-title font-light italic text-4xl sm:text-5xl lg:text-6xl text-[#C59B4C] mb-4 block">
                  {step.num}
                </span>
                <h3 className="font-title text-xl sm:text-2xl font-medium text-[#1A1A1A] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
              GOOD TO KNOW
            </span>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#1A1A1A]">
              Questions, answered.
            </h2>
          </div>

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
                    className={`w-5 h-5 text-[#1A1A1A] transition-transform duration-300 shrink-0 ml-4 ${openFaq === idx ? "rotate-180" : ""
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

      {/* Final CTA */}
      <section className="bg-[#E6DFD5] py-20 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-4">
            GET STARTED
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.15] mb-4">
            Ready to run your <br />
            <span className="font-light italic text-[#B78735]">salon smarter?</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-md mx-auto mb-8">
            Join thousands of salons and beauty businesses that use Cloud Salon to manage their entire operation.
          </p>
          <div>
            <Link
              href="/register?role=business"
              className="px-7 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all hover:scale-[1.02] inline-block"
            >
              Start Your Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
