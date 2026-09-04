"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Calendar,
  Scissors,
  Clock,
  DollarSign,
  Star,
  ChevronDown,
} from "lucide-react";

export default function ForProfessionalsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      icon: User,
      title: "Get Discovered",
      desc: "Build a verified public profile and be found by thousands of customers searching for beauty services every day.",
      bgColor: "bg-[#3B5998]/10",
      textColor: "text-[#3B5998]",
    },
    {
      icon: Calendar,
      title: "Manage Bookings",
      desc: "Accept, reschedule, and manage appointments from a single professional dashboard. No phone tag, no back-and-forth.",
      bgColor: "bg-[#A94442]/10",
      textColor: "text-[#A94442]",
    },
    {
      icon: Scissors,
      title: "Manage Services",
      desc: "List your services with pricing, duration, and descriptions. Update them anytime to reflect your current offering.",
      bgColor: "bg-[#8A6D3B]/10",
      textColor: "text-[#8A6D3B]",
    },
    {
      icon: Clock,
      title: "Control Availability",
      desc: "Set your own hours and days. Block off time, set recurring availability, and take breaks whenever you need.",
      bgColor: "bg-[#666666]/10",
      textColor: "text-[#666666]",
    },
    {
      icon: DollarSign,
      title: "Track Earnings",
      desc: "See every payment, payout, and transaction in one place. Get paid directly to your account after each service.",
      bgColor: "bg-[#B78735]/10",
      textColor: "text-[#B78735]",
    },
    {
      icon: Star,
      title: "Receive Reviews",
      desc: "Build your reputation with verified reviews from real customers. Your rating is your most powerful marketing tool.",
      bgColor: "bg-[#E0B363]/15",
      textColor: "text-[#E0B363]",
      fill: true,
    },
  ];

  const steps = [
    { num: "01", title: "Create Your Profile", desc: "Sign up and complete your professional profile with your services, availability, and portfolio.", bg: "bg-[#B78735]" },
    { num: "02", title: "Get Verified", desc: "Submit your credentials and ID. Our team reviews applications within 2-3 business days.", bg: "bg-[#1A1A1D]" },
    { num: "03", title: "Go Live", desc: "Once approved, your profile is live and visible to customers searching for professionals like you.", bg: "bg-[#1A1A1D]" },
    { num: "04", title: "Start Earning", desc: "Accept bookings, deliver great services, collect reviews, and grow your client base.", bg: "bg-[#B78735]" },
  ];

  const faqs = [
    { q: "How much does it cost to join?", a: "Joining Cloud Salon is free to start. We offer flexible plans depending on your volume and feature requirements." },
    { q: "How long does verification take?", a: "Our team reviews applications within 24-48 business hours after credential submission." },
    { q: "When do I get paid?", a: "Payouts are automatically transferred directly to your bank account after each completed service." },
    { q: "Can I set my own prices?", a: "Absolutely! You have 100% full control over your service list, prices, durations, and booking policies." },
  ];

  return (
    <div className="min-h-screen  space-y-20">
      {/* Dark Hero Header */}
      <section className="bg-[#1E1C1A] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Bottom-right warm amber color gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C4F24]/40 via-[#5A3819]/15 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B78735]" />
              <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em]">
                FOR PROFESSIONALS
              </span>
            </div>

            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white">
              Your Skills. <br />
              Your Clients. <br />
              <span className="font-light italic text-[#CAA054]">Your Business.</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
              Join thousands of independent beauty professionals who manage their entire business through Cloud Salon.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/register?role=professional"
                className="px-6 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-colors"
              >
                Start Your Professional Profile
              </Link>
              <a
                href="#features"
                className="px-6 py-3.5 bg-[#E2D8C9] hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-sm transition-colors"
              >
                See How It Works
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 pt-8 border-t border-white/10">
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">12,000+</h4>
                <p className="text-xs text-zinc-400 font-normal">Active Professionals</p>
              </div>
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">4.8★</h4>
                <p className="text-xs text-zinc-400 font-normal">Average Rating</p>
              </div>
              <div>
                <h4 className="font-title text-2xl sm:text-3xl font-bold text-white mb-0.5">£850</h4>
                <p className="text-xs text-zinc-400 font-normal">Avg Monthly Earnings</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 h-[480px] sm:h-[580px] lg:h-[620px] w-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80')` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
            EVERYTHING YOU NEED
          </span>
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-tight mb-3">
            Built for independent professionals.
          </h2>
          <p className="text-xs sm:text-sm text-[#666159] font-normal max-w-md mx-auto">
            One platform to manage your entire beauty business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg p-8 border border-gray-200 flex flex-col items-start text-left shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-9 h-9 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center mb-5 shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.fill ? "fill-[#E0B363]" : ""} ${item.textColor}`} />
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

      {/* 4-Step Journey Timeline */}
      <section className="bg-[#e3dfd8] py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-14 sm:mb-16">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
              THE JOURNEY
            </span>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1A1A1A]">
              From sign-up to your first booking.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className={`w-12 h-12 rounded-full ${step.bg || 'bg-[#B78735]'} text-white font-title font-light italic text-lg sm:text-xl flex items-center justify-center mx-auto mb-5 shadow-sm`}>
                  {step.num}
                </span>
                <h3 className="font-title text-lg sm:text-xl font-medium text-[#1A1A1A] mb-3">
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
            Ready to grow <br />
            <span className="font-light italic text-[#B78735]">your business?</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-md mx-auto mb-8">
            Join Cloud Salon today and start connecting with customers who are looking for exactly what you offer.
          </p>
          <div>
            <Link
              href="/register?role=professional"
              className="px-7 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all hover:scale-[1.02] inline-block"
            >
              Start Your Professional Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
