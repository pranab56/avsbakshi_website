import Hero from "@/components/for-professionals/Hero";
import FeaturesGrid from "@/components/for-professionals/FeaturesGrid";
import JourneyTimeline from "@/components/for-professionals/JourneyTimeline";
import FaqSection from "@/components/for-professionals/FaqSection";
import GetStartedCta from "@/components/for-professionals/GetStartedCta";

export default function ForProfessionalsPage() {
  return (
    <div className="min-h-screen space-y-20">
      <Hero />
      <FeaturesGrid />
      <JourneyTimeline />
      <FaqSection />
      <GetStartedCta />
    </div>
  );
}
