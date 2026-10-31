"use client";

import Hero from "@/components/home/Hero";
import RoleCardsSection from "@/components/home/RoleCardsSection";
import StatsTicker from "@/components/home/StatsTicker";
import CategoriesSection from "@/components/home/CategoriesSection";
import SalonsNearYou from "@/components/home/SalonsNearYou";
import DiscoverMarketplace from "@/components/home/DiscoverMarketplace";
import WorkspacesSection from "@/components/home/WorkspacesSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyCloudSalon from "@/components/home/WhyCloudSalon";
import ServicesForAllAges from "@/components/home/ServicesForAllAges";
import GetStartedCta from "@/components/home/GetStartedCta";
import ForProfessionalsSection from "@/components/home/ForProfessionalsSection";
import CustomerReviews from "@/components/home/CustomerReviews";
import ForBusinessesSection from "@/components/home/ForBusinessesSection";
import DualBanners from "@/components/home/DualBanners";
import FaqAccordion from "@/components/home/FaqAccordion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#121214] text-foreground transition-colors duration-200">
      {/* 1. Hero Section */}
      <Hero />

      {/* Role Cards Section (Commented out per request) */}
      {/* <RoleCardsSection /> */}

      {/* Bottom Stats Ticker (Commented out per request) */}
      {/* <StatsTicker /> */}

      {/* Landing Page Content Sections */}
      <div className="space-y-14 sm:space-y-20 pt-10 pb-16">
        {/* 2. Our Services */}
        <CategoriesSection />

        {/* 3. Salons */}
        <SalonsNearYou />

        {/* 4. Professionals */}
        <DiscoverMarketplace />

        {/* 5. Workspaces */}
        <WorkspacesSection />

        {/* 6. How it works */}
        <HowItWorks />

        {/* 7. WHY CLOUD SALON (Video Section) */}
        <WhyCloudSalon />

        {/* 8. Services for all ages */}
        <ServicesForAllAges />

        {/* 9. Call to action section */}
        <GetStartedCta />

        {/* 10. Join as a professional */}
        <ForProfessionalsSection />

        {/* ========================================================
            OTHER SECTIONS (Commented out per request)
        ======================================================== */}
        {/* <CustomerReviews /> */}
        {/* <ForBusinessesSection /> */}
        {/* <DualBanners /> */}
        {/* <FaqAccordion /> */}
      </div>
    </div>
  );
}


