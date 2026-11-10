import { Metadata } from "next";
import Hero from "@/components/contact/Hero";
import ContactCards from "@/components/contact/ContactCards";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactFaq from "@/components/contact/ContactFaq";
import GetStartedCta from "@/components/about/GetStartedCta";

export const metadata: Metadata = {
  title: "Help Center & Contact Us | The Cloud Salon",
  description:
    "Get in touch with The Cloud Salon concierge support team. Assistance for clients, independent stylists, and salon owners available seven days a week.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Hero />
      <ContactCards />
      <ContactFormSection />
      <ContactFaq />
      <GetStartedCta />
    </div>
  );
}

