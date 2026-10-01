"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardSidebar from "./sidebar";
import DashboardHeader from "./header";
import { DASHBOARD_CONFIGS, RoleType, getProfessionalNavItems } from "./nav-config";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";

interface DashboardLayoutProps {
  role: RoleType;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);
  const { data: profileResponse } = useGetMyProfileQuery(undefined, { skip: !user });

  const profileData = profileResponse?.data;
  const isSalonOwner = Boolean(profileData?.isSalonOwner ?? user?.isSalonOwner);

  useEffect(() => {
    if (user?.role && user.role !== role && !(role === "professional" && user.role === "business")) {
      const targetDashboard =
        user.role === "professional" || user.role === "business"
          ? "/professional/dashboard"
          : "/customer/overview";
      router.replace(targetDashboard);
    }
  }, [user, role, router]);

  const config = DASHBOARD_CONFIGS[role] || DASHBOARD_CONFIGS.customer;
  const navItems = role === "professional"
    ? getProfessionalNavItems(isSalonOwner)
    : config.navItems;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        role={role}
        navItems={navItems}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Wrapper (offsetted by sidebar width on desktop) */}
      <div className="flex flex-col flex-1 lg:pl-64 transition-all duration-300 min-h-screen">
        {/* Header Topbar */}
        <DashboardHeader
          config={config}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
