import Hero from "@/components/terms/Hero";
import TermsContent from "@/components/terms/TermsContent";
import GetStartedCta from "@/components/terms/GetStartedCta";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      <Hero />
      <TermsContent />
      <GetStartedCta />
    </div>
  );
}