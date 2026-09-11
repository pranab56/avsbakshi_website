import Hero from "@/components/privacy/Hero";
import PolicyContent from "@/components/privacy/PolicyContent";
import GetStartedCta from "@/components/privacy/GetStartedCta";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      <Hero />
      <PolicyContent />
      <GetStartedCta />
    </div>
  );
}