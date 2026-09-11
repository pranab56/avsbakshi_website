"use client";

import { useState } from "react";
import Header, { DetailTabType } from "@/components/professional-detail/Header";
import AboutTab from "@/components/professional-detail/AboutTab";
import ServicesTab from "@/components/professional-detail/ServicesTab";
import PortfolioTab from "@/components/professional-detail/PortfolioTab";
import ReviewsTab from "@/components/professional-detail/ReviewsTab";
import AvailabilityTab from "@/components/professional-detail/AvailabilityTab";
import BookingSidebar from "@/components/professional-detail/BookingSidebar";

export default function ProfessionalDetailsPage() {
  const [activeTab, setActiveTab] = useState<DetailTabType>("about");
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            {activeTab === "about" && <AboutTab />}
            {activeTab === "services" && <ServicesTab />}
            {activeTab === "portfolio" && <PortfolioTab />}
            {activeTab === "reviews" && <ReviewsTab />}
            {activeTab === "availability" && <AvailabilityTab />}
          </div>

          <BookingSidebar />
        </div>
      </section>
    </div>
  );
}
