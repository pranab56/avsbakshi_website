import Hero from "@/components/terms/Hero";
import TermsContent from "@/components/terms/TermsContent";
import GetStartedCta from "@/components/terms/GetStartedCta";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 font-sans">
      <Hero />
      <TermsContent />
      <GetStartedCta />
    </div>
  );
}