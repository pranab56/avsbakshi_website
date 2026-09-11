import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
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
    <div className="min-h-screen bg-background text-foreground space-y-16 sm:space-y-24 lg:space-y-30 transition-colors duration-200">
      <Hero />
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
  );
}
