"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/discover/Hero";
import ServicesTab from "@/components/discover/ServicesTab";
import ProfessionalsTab from "@/components/discover/ProfessionalsTab";
import SalonsTab from "@/components/discover/SalonsTab";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [userTab, setUserTab] = useState<string | null>(null);
  const activeTab = userTab ?? tabParam ?? "services";
  const setActiveTab = (tab: string) => setUserTab(tab);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16">
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "professionals" && <ProfessionalsTab />}
        {activeTab === "salons" && <SalonsTab />}
      </section>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading discover page...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
