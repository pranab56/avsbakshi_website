"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      {/* 1. Hero Section (Dark Theme matching website palette) */}
      <section className="bg-[#181614] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#B78735]/30 to-transparent" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-zinc-400" />
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
              LEGAL & PRIVACY
            </span>
          </div>

          <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Privacy 
            <span className="font-serif italic text-[#C48B36] font-normal">
              Policy
            </span>
          </h1>

          <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
            <p>Last updated: September 5, 2026</p>
            <p>
              Your privacy is fundamental to us. This policy details how Cloud Salon collects, uses, and safeguards your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        {/* Navigation Link to Terms */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-200 text-xs sm:text-sm font-medium">
          <span className="text-zinc-400">Privacy Policy Overview</span>
          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-[#B78735] hover:text-[#A37428] transition-colors"
          >
            Terms &amp; Conditions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* Section 1: Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                1. Introduction
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
              <p>
                This Privacy Policy describes how Cloud Salon (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects your personal information when you access or use our platform, including our website and mobile application (collectively, the &ldquo;Platform&rdquo;).
              </p>
              <p>
                Cloud Salon is an online marketplace connecting customers with independent beauty and wellness professionals. By using our Platform, you acknowledge that you have read and understood the practices described herein.
              </p>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                2. Information We Collect
              </h2>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-[#56544C] pl-4 border-l-2 border-[#E5E0D6]">
              <div className="space-y-2">
                <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base">
                  A. Information You Provide Directly
                </h3>
                <ul className="space-y-2.5 pl-5 list-disc text-zinc-600">
                  <li>
                    <strong className="text-zinc-800">Account Registration:</strong> Name, email address, phone number, and password when registering as a customer, professional, or business.
                  </li>
                  <li>
                    <strong className="text-zinc-800">Professional Credentials:</strong> Professional licenses, portfolio photographs, business location, and service pricing menus.
                  </li>
                  <li>
                    <strong className="text-zinc-800">Booking &amp; Payments:</strong> Appointment dates, selected services, and transaction details processed securely via certified payment gateways.
                  </li>
                  <li>
                    <strong className="text-zinc-800">Communications &amp; Reviews:</strong> User feedback, ratings, direct support inquiries, and messages sent through our platform.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-[#1A1A1A] text-sm sm:text-base">
                  B. Information Collected Automatically
                </h3>
                <ul className="space-y-2.5 pl-5 list-disc text-zinc-600">
                  <li>
                    <strong className="text-zinc-800">Device &amp; Usage Data:</strong> IP address, device type, browser details, pages visited, and interaction logs.
                  </li>
                  <li>
                    <strong className="text-zinc-800">Location Data:</strong> Approximate or precise location (with explicit device consent) to display nearby professionals and salons.
                  </li>
                  <li>
                    <strong className="text-zinc-800">Cookies &amp; Analytics:</strong> Tracking technologies to retain session preferences and analyze application performance.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                3. How We Use Your Information
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
              <p>We process collected data for legitimate operational and business purposes:</p>
              <ul className="space-y-2.5 pl-5 list-disc text-zinc-600">
                <li>Facilitating appointment bookings, client notifications, and automated booking reminders.</li>
                <li>Processing secure payments, split payouts for salon renters, and digital receipts.</li>
                <li>Personalizing service recommendations based on past appointments and location.</li>
                <li>Detecting fraudulent activity, verifying professional accounts, and enforcing community safety standards.</li>
                <li>Sending transactional updates, service announcements, and optional promotional offers.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Data Security & Retention */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                4. Data Security &amp; Retention
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
              <p>
                We implement industry-standard technical and organizational security measures, including SSL encryption, secure data storage, and strict access controls. Payment card details are tokenized and processed exclusively by PCI-DSS compliant payment providers.
              </p>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable UK legal and tax regulations.
              </p>
            </div>
          </section>

          {/* Section 5: Your Privacy Rights */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                5. Your Privacy Rights
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
              <p>Depending on your location, you hold specific rights regarding your personal information:</p>
              <ul className="space-y-2.5 pl-5 list-disc text-zinc-600">
                <li><strong className="text-zinc-800">Access &amp; Correction:</strong> Request a copy of your personal data or request corrections to inaccurate entries.</li>
                <li><strong className="text-zinc-800">Erasure (Right to be Forgotten):</strong> Request account deletion and removal of associated non-transactional data.</li>
                <li><strong className="text-zinc-800">Opt-Out:</strong> Unsubscribe from marketing emails at any time using the link in the footer of our emails.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Contact Us */}
          <section className="bg-[#FAF9F5] border border-[#E5E0D6] rounded-2xl p-6 space-y-3">
            <h3 className="font-title text-xl font-bold text-[#1A1A1A]">
              Questions about our Privacy Policy?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              If you have any questions, concerns, or requests regarding your personal data, please contact our Data Protection Team at{" "}
              <a href="mailto:privacy@cloudsalon.com" className="text-[#B78735] font-semibold hover:underline">
                privacy@cloudsalon.com
              </a>.
            </p>
          </section>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EBE0] text-center border-t border-[#D0C7B5]">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
            CLOUD SALON LEGAL
          </span>
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
            Review our{" "}
            <span className="text-[#B78735] font-title italic">Terms of Service</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-normal">
            Understand your rights and obligations when using Cloud Salon.
          </p>

          <div className="pt-2">
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium text-xs sm:text-sm rounded-lg shadow transition-all cursor-pointer"
            >
              Read Terms &amp; Conditions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}