"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import HowItWorks from "@/components/home/HowItWorks";

export default function AboutPage() {
  const timeline = [
    { year: "2020", title: "Founded in a kitchen in Peckham" },
    { year: "2021", title: "First 100 professionals join" },
    { year: "2022", title: "Series A — £4.2M raised" },
    { year: "2023", title: "Expansion to 12 UK cities" },
    { year: "2024", title: "£28M paid out to professionals", highlight: true },
  ];

  const principles = [
    {
      num: "01",
      title: "Craft first, scale second.",
      desc: "Beauty is a practice of precision and intuition. Every professional on Cloud Salon is vetted not for volume, but for quality of work and depth of care.",
    },
    {
      num: "02",
      title: "Independence, not dependence.",
      desc: "We build tools that make professionals more powerful — never tools that make them dependent on us. Your clients, your pricing, your calendar. We&apos;re just the infrastructure.",
    },
    {
      num: "03",
      title: "Trust through transparency.",
      desc: "We show real reviews, real pricing, real availability. Clients know exactly what to expect. Professionals know exactly what they earn.",
    },
    {
      num: "04",
      title: "Community over competition.",
      desc: "The beauty industry thrives when professionals support each other. We invest in education, mentorship, and the connections that help careers grow.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Cloud Salon?",
      a: "Cloud Salon is a simple way to discover independent beauty professionals and exceptional salons near you. Browse real work, compare reviews, and book with confidence.",
    },
    {
      q: "How do I know who to trust?",
      a: "Every professional and salon on Cloud Salon has a verified profile with real photos, clear service lists, and authentic client reviews.",
    },
    {
      q: "Can I join as a beauty professional?",
      a: "Yes! Cloud Salon provides powerful booking, schedule, and client management tools for independent beauty professionals.",
    },
    {
      q: "Is Cloud Salon free to use?",
      a: "Browsing and booking appointments on Cloud Salon is 100% free for clients with zero hidden booking fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EF] space-y-20">
      {/* Combined Hero & Gold Stats Banner Wrapper */}
      <div className="w-full">
        {/* Dark Hero Header */}
        <section className="bg-[#1E1C1A] text-white py-16 sm:py-24 relative overflow-hidden">
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
                We built the <br />
                platform we needed <br />
                but <span className="font-light italic text-[#CAA054]">could never find.</span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
                Cloud Salon was founded by a hairstylist who spent 12 years managing bookings in WhatsApp groups and chasing payments over text. There had to be a better way.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 h-[480px] sm:h-[580px] lg:h-[620px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80')` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gold Stats Banner */}
        <section className="bg-[#B78735] text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-title text-4xl sm:text-5xl font-normal text-white mb-2">47,000+</h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal">Independent professionals</p>
            </div>
            <div>
              <h3 className="font-title text-4xl sm:text-5xl font-normal text-white mb-2">320,000+</h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal">Bookings this year</p>
            </div>
            <div>
              <h3 className="font-title text-4xl sm:text-5xl font-normal text-white mb-2">£28M+</h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal">Paid out to professionals</p>
            </div>
            <div>
              <h3 className="font-title text-4xl sm:text-5xl font-normal text-white mb-2">4.9★</h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal">Average platform rating</p>
            </div>
          </div>
        </section>
      </div>

      {/* Story Section: WHY CLOUD SALON */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
              WHY CLOUD SALON
            </span>

            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#1A1A1A]">
              Started behind the chair. <br />
              Built for everyone behind the chair.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed">
              <p className="text-[#4A4742]">
                In 2020, during the first lockdown, Amara Osei had 800 regular clients and no reliable way to contact them. No CRM, no booking system, no automated reminders. Just a phone with thousands of unread messages.
              </p>
              <p>
                She spent 14 hours rebuilding her client list from Instagram DMs and WhatsApp threads. Then she called James Whitfield, a friend from university who had spent a decade building marketplace software at scale.
              </p>
              <p>
                They built the first version of Cloud Salon in eight weeks, launching it to 40 of Amara&apos;s colleagues in South East London. Within six months, 2,000 professionals were on the waiting list.
              </p>
              <p>
                Four years later, Cloud Salon is home to more than 47,000 independent beauty professionals across 12 UK cities — and we&apos;re just getting started.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 pl-0 lg:pl-6">
            <div className="relative">
              {/* Main Salon Image Container */}
              <div className="relative rounded-[32px] overflow-hidden shadow-xl h-[440px] sm:h-[540px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80')` }}
                />
              </div>

              {/* Overlapping Bottom-Left Image Badge */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F5F3EF] z-10 hidden sm:block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80')` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY Timeline Section */}
      <section className="bg-[#18181A] text-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block mb-3">
              OUR JOURNEY
            </span>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-light italic text-white leading-tight">
              Four years of building in public.
            </h2>
          </div>

          <div className="border-t border-white/10">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-8 sm:gap-16 py-6 sm:py-7 border-b border-white/10 transition-colors"
              >
                <span
                  className={`font-title font-light italic text-xl sm:text-2xl w-20 shrink-0 ${item.highlight ? "text-[#C59B4C] font-normal" : "text-zinc-400"
                    }`}
                >
                  {item.year}
                </span>
                <span
                  className={`font-title text-base sm:text-lg sm:text-xl ${item.highlight ? "text-white font-bold" : "text-zinc-300 font-normal"
                    }`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
              WHAT WE STAND FOR
            </span>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#1A1A1A]">
              The principles that shape every decision we make.
            </h2>
            <p className="text-xs sm:text-sm text-[#666159] font-normal leading-relaxed max-w-sm">
              When we face a hard product or business decision, we come back to these four ideas.
            </p>
          </div>

          <div className="md:col-span-7">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="border-b border-[#D8CFC2] pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0"
              >
                <div className="flex items-start gap-6 sm:gap-8">
                  <span className="font-title font-light italic text-2xl sm:text-3xl text-[#C59B4C] w-8 shrink-0 pt-0.5">
                    {p.num}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-title text-lg sm:text-xl font-bold text-[#1A1A1A]">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* FAQ Section */}
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
            Ready for Your Next <br />
            <span className="font-light italic text-[#B78735]">Appointment?</span>
          </h2>
          <div className="flex justify-center gap-3 pt-4">
            <Link
              href="/search"
              className="px-7 py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-all hover:scale-[1.02] inline-block"
            >
              Find a Service
            </Link>
            <Link
              href="/discover?tab=professionals"
              className="px-7 py-3.5 bg-gray-100 hover:bg-[#D6C9B7] text-[#2C2E33] text-xs sm:text-sm font-semibold rounded-sm transition-all inline-block"
            >
              Explore Professionals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
