import Hero from "@/components/for-businesses/Hero";
import FeaturesGrid from "@/components/for-businesses/FeaturesGrid";
import GettingStartedTimeline from "@/components/for-businesses/GettingStartedTimeline";
import FaqSection from "@/components/for-businesses/FaqSection";
import GetStartedCta from "@/components/for-businesses/GetStartedCta";

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground space-y-20 transition-colors duration-200">
      <Hero />
      <FeaturesGrid />
      <GettingStartedTimeline />
      <FaqSection />
      <GetStartedCta />
    </div>
  );
}
