import Hero from "@/components/about/Hero";
import WhyCloudSalon from "@/components/about/WhyCloudSalon";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import CorePrinciples from "@/components/about/CorePrinciples";
import HowItWorks from "@/components/home/HowItWorks";
import FaqSection from "@/components/about/FaqSection";
import GetStartedCta from "@/components/about/GetStartedCta";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground space-y-20 transition-colors duration-200">
      <Hero />
      <WhyCloudSalon />
      <JourneyTimeline />
      <CorePrinciples />
      <HowItWorks />
      <FaqSection />
      <GetStartedCta />
    </div>
  );
}
