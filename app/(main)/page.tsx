"use client";

import Hero from "@/components/home/Hero";
import RoleCardsSection from "@/components/home/RoleCardsSection";
import StatsTicker from "@/components/home/StatsTicker";
import DiscoverMarketplace from "@/components/home/DiscoverMarketplace";
import HowItWorks from "@/components/home/HowItWorks";
import WhyCloudSalon from "@/components/home/WhyCloudSalon";
import SalonsNearYou from "@/components/home/SalonsNearYou";
import ServicesForAllAges from "@/components/home/ServicesForAllAges";
import CustomerReviews from "@/components/home/CustomerReviews";
import ForProfessionalsSection from "@/components/home/ForProfessionalsSection";
import ForBusinessesSection from "@/components/home/ForBusinessesSection";
import DualBanners from "@/components/home/DualBanners";
import FaqAccordion from "@/components/home/FaqAccordion";
import GetStartedCta from "@/components/home/GetStartedCta";
import CategoriesSection from "@/components/home/CategoriesSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#121214] text-foreground transition-colors duration-200">

      {/* Primary Screen Container */}
      <div className="w-full flex flex-col">
        {/* Figma Hero Section Upper */}
        <Hero />

        {/* Figma 3 Role Cards Section */}
        <RoleCardsSection />

        {/* Figma Bottom Stats Ticker & Slogan Ribbon */}
        <StatsTicker />
      </div>

      {/* Rest of Landing Page Sections */}
      <div className="space-y-12 sm:space-y-16 pt-8">
        <CategoriesSection />
        <DiscoverMarketplace />
        <HowItWorks />
        <WhyCloudSalon />
        <SalonsNearYou />
        <ServicesForAllAges />
        <CustomerReviews />
        <ForProfessionalsSection />
        <ForBusinessesSection />
        <DualBanners />
        <FaqAccordion />
        <GetStartedCta />
      </div>
    </div>
  );
}

