import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import DiscoverMarketplace from "@/components/home/DiscoverMarketplace";
import HowItWorks from "@/components/home/HowItWorks";
import WhyCloudSalon from "@/components/home/WhyCloudSalon";
import SalonsNearYou from "@/components/home/SalonsNearYou";
import CustomerReviews from "@/components/home/CustomerReviews";
import ForProfessionalsSection from "@/components/home/ForProfessionalsSection";
import ForBusinessesSection from "@/components/home/ForBusinessesSection";
import DualBanners from "@/components/home/DualBanners";
import FaqAccordion from "@/components/home/FaqAccordion";
import GetStartedCta from "@/components/home/GetStartedCta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] space-y-30">
      <Hero />
      <CategoriesSection />
      <DiscoverMarketplace />
      <HowItWorks />
      <WhyCloudSalon />
      <SalonsNearYou />
      <CustomerReviews />
      <ForProfessionalsSection />
      <ForBusinessesSection />
      <DualBanners />
      <FaqAccordion />
      <GetStartedCta />
    </div>
  );
}
