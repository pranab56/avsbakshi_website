"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { DashboardConfig } from "./nav-config";

interface DashboardHeaderProps {
  config: DashboardConfig;
  onOpenMobileMenu: () => void;
}

export default function DashboardHeader({
  config,
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  // Derive section title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || segments[segments.length - 1] === "dashboard") {
      return "Dashboard";
    }
    const lastSegment = segments[segments.length - 1];
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/-/g, " ")
    );
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-md border-b border-[#E5E0D6] transition-all">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-[#2C2E33] hover:bg-[#F5F3EF] lg:hidden transition-colors cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h1 className="text-xl sm:text-2xl font-bold font-title text-[#2C2E33]">
            {getPageTitle()}
          </h1>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${config.roleBadgeColor}`}
          >
            {config.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Right: Quick Actions, Notifications, User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Action Button */}
        {config.actionButtonLabel && (
          <Link
            href={config.actionButtonHref}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B78735] text-white font-medium text-sm hover:bg-[#A0742B] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#B78735]/20 cursor-pointer"
          >
            <span>{config.actionButtonLabel}</span>
          </Link>
        )}

        {/* Notifications Icon */}
        <button
          className="relative p-2.5 rounded-xl text-[#2C2E33] hover:bg-[#F5F3EF] border border-transparent hover:border-[#E5E0D6] transition-all cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#B78735] ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-[#E5E0D6]">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B78735]/15 text-[#B78735] font-bold text-sm border border-[#B78735]/30">
            RA
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-[#2C2E33]">Rasel</span>
            <span className="text-xs text-[#6C757D] capitalize">{config.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
