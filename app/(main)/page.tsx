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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground space-y-6 sm:space-y-12 lg:space-y-16 transition-colors duration-200">
      {/* Hero Section */}
      <Hero />

      {/* Explore Services immediately under Hero */}
      {/* <CategoriesSection /> */}

      {/* Role Persona Cards & Stats Ticker */}
      <RoleCardsSection />
      <StatsTicker />

      {/* Marketplace & Discovery */}
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
  );
}
