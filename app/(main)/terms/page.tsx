"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
            {/* 1. Hero Section (Dark Theme matching website palette) */}
            <section className="bg-[#181614] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#B78735]/30 to-transparent" />

                <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
                            LEGAL TERMS
                        </span>
                    </div>

                    <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Terms &amp;
                        <span className="font-serif italic text-[#C48B36] font-normal">
                            Conditions
                        </span>
                    </h1>

                    <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
                        <p>Last updated: September 5, 2026</p>
                        <p>
                            Cloud Salon connects independent beauty professionals with customers. These terms govern your use of our platform and services.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Main Content */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
                {/* Navigation Link to Privacy */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-200 text-xs sm:text-sm font-medium">
                    <Link
                        href="/privacy"
                        className="inline-flex items-center gap-1.5 text-[#B78735] hover:text-[#A37428] transition-colors"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Privacy Policy
                    </Link>
                    <span className="text-zinc-400">Terms of Service Overview</span>
                </div>

                {/* Terms Sections */}
                <div className="space-y-10">
                    {/* Section 1: Overview */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
                            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                                1. Overview of the Platform
                            </h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
                            <p>
                                Cloud Salon is an online technology marketplace connecting clients with independent beauty professionals and salon venues. Professionals use our tools to display service menus, manage calendars, and accept payments.
                            </p>
                            <p>
                                Cloud Salon acts solely as an intermediary technology provider. We are not a service provider, employer, or contract party to the beauty services rendered. All treatments and beauty services are provided independently by third-party professionals.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Acceptance of Terms */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
                            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                                2. Acceptance of Terms
                            </h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
                            <p>
                                By accessing, browsing, or registering an account on Cloud Salon, you agree to be bound by these Terms &amp; Conditions, our <Link href="/privacy" className="text-[#B78735] underline font-medium hover:text-[#A37428]">Privacy Policy</Link>, and any applicable guidelines.
                            </p>
                            <p>
                                If you do not agree to these terms in full, you must discontinue using our website and mobile application immediately.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: User Registration & Accounts */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
                            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                                3. User Accounts &amp; Registration
                            </h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
                            <p>
                                To access features like booking appointments or creating a professional storefront, you must register for an account. You agree to provide current, complete, and accurate information during signup.
                            </p>
                            <p>
                                You are solely responsible for keeping your login credentials secure and for all activities under your account. Professionals must submit valid identification and qualifications during verification.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Bookings & Cancellations */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
                            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                                4. Bookings, Payments &amp; Cancellations
                            </h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
                            <p>
                                Bookings are confirmed immediately upon completion of the checkout process. Payments are processed securely via integrated card payment gateways.
                            </p>
                            <p>
                                Each professional maintains their individual cancellation window and deposit policies. Late cancellations or missed appointments (no-shows) may be subject to cancellation fees as outlined on the professional&apos;s service page prior to confirmation.
                            </p>
                        </div>
                    </section>

                    {/* Section 5: Professional Conduct */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#B78735] rounded-full" />
                            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                                5. Professional Responsibilities &amp; Insurance
                            </h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-[#56544C] leading-relaxed pl-4 border-l-2 border-[#E5E0D6]">
                            <p>
                                Beauty professionals warrant that they possess all required certifications, licenses, and public liability insurance necessary to perform services safely and legally in their jurisdiction.
                            </p>
                            <p>
                                Professionals must adhere to health and safety standards, maintain clean workspace environments, and accurately represent their service pricing and treatment descriptions.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Contact */}
                    <section className="bg-[#FAF9F5] border border-[#E5E0D6] rounded-2xl p-6 space-y-3">
                        <h3 className="font-title text-xl font-bold text-[#1A1A1A]">
                            Need clarification on our Terms?
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                            If you have any questions regarding these Terms &amp; Conditions, please contact our support team at{" "}
                            <a href="mailto:support@cloudsalon.com" className="text-[#B78735] font-semibold hover:underline">
                                support@cloudsalon.com
                            </a>.
                        </p>
                    </section>
                </div>
            </section>

            {/* 3. Bottom CTA Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EBE0] text-center border-t border-[#D0C7B5]">
                <div className="max-w-2xl mx-auto space-y-6">
                    <span className="text-xs font-semibold text-[#B78735] uppercase tracking-[0.2em] block">
                        GET STARTED
                    </span>
                    <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
                        Ready to get{" "}
                        <span className="text-[#B78735] font-title italic">started?</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 font-normal">
                        Find your next appointment in under 2 minutes.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium text-xs sm:text-sm rounded-lg shadow transition-all cursor-pointer"
                        >
                            Find a Professional
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}