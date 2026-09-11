"use client";

import { useState } from "react";
import {
  Scissors,
  Calendar,
  CreditCard,
  ShieldCheck,
  Settings,
} from "lucide-react";
import Hero from "@/components/faq/Hero";
import AccordionList, { QuestionItem } from "@/components/faq/AccordionList";
import CategoriesGrid, { CategoryItem } from "@/components/faq/CategoriesGrid";
import GetStartedCta from "@/components/faq/GetStartedCta";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const topQuestions: QuestionItem[] = [
    {
      category: "general",
      q: "How do I find the right professional for me?",
      a: "Use our search filters to browse by service type, location, price range, and availability. You can view full professional profiles, portfolios of past work, and verified customer reviews before booking.",
    },
    {
      category: "Trust & Safety",
      q: "Are all professionals on Cloud Salon verified?",
      a: "Every professional on Cloud Salon goes through an application process that includes identity verification, professional credential checks, and a profile review by our team. Profiles displaying the blue Verified badge have passed all steps. You can always check a professional's verification status directly on their profile.",
    },
    {
      category: "Bookings & Cancellations",
      q: "Can I book a consultation before committing to a full appointment?",
      a: "Yes! Many professionals offer standalone 15-minute consultation slots. Look for 'Consultation' in their service menu or message them directly prior to booking.",
    },
    {
      category: "general",
      q: "What if I am not happy with my appointment?",
      a: "We take client satisfaction very seriously. If you experience any issue, please reach out to our customer support team within 24 hours of your service, and we will work directly with the professional to resolve it.",
    },
    {
      category: "Account & Settings",
      q: "Can I save favourite professionals?",
      a: "Yes! Click the heart icon on any professional or salon profile card to save them to your favorites for quick and easy rebooking.",
    },
  ];

  const categories: CategoryItem[] = [
    { icon: Scissors, title: "For Professionals", count: "6 questions", key: "For Professionals" },
    { icon: Calendar, title: "Bookings & Cancellations", count: "5 questions", key: "Bookings & Cancellations" },
    { icon: CreditCard, title: "Payments & Pricing", count: "5 questions", key: "Payments & Pricing" },
    { icon: ShieldCheck, title: "Trust & Safety", count: "4 questions", key: "Trust & Safety" },
    { icon: Settings, title: "Account & Settings", count: "3 questions", key: "Account & Settings" },
  ];

  const filteredQuestions = topQuestions.filter((item) => {
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans">
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <AccordionList
          filteredQuestions={filteredQuestions}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          searchQuery={searchQuery}
        />
        <CategoriesGrid
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <GetStartedCta />
    </div>
  );
}
