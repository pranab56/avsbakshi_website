"use client";

import { useState } from "react";
import DashboardSidebar from "./sidebar";
import DashboardHeader from "./header";
import { DASHBOARD_CONFIGS, RoleType } from "./nav-config";

interface DashboardLayoutProps {
  role: RoleType;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = DASHBOARD_CONFIGS[role] || DASHBOARD_CONFIGS.customer;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        role={role}
        navItems={config.navItems}
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
