"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { DashboardConfig } from "./nav-config";
import ThemeToggle from "@/components/shared/theme-toggle";

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
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 sm:h-20 px-3 sm:px-6 lg:px-8 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-200">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-foreground hover:bg-accent lg:hidden transition-colors cursor-pointer shrink-0"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold font-title text-foreground truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
            {getPageTitle()}
          </h1>
          <span
            className={`hidden xs:inline-flex items-center px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border shrink-0 ${config.roleBadgeColor}`}
          >
            {config.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Right: Quick Actions, Theme Toggle, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <ThemeToggle />

        {/* Notifications Icon */}
        <Link
          href={`/${config.role}/notifications`}
          className="relative p-2 sm:p-2.5 rounded-xl text-foreground hover:bg-accent border border-transparent hover:border-border transition-all cursor-pointer block shrink-0"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
        </Link>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-border shrink-0">
          <div
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/15 text-primary font-bold text-xs sm:text-sm border border-primary/30 notranslate shrink-0 select-none"
            translate="no"
          >
            RA
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-foreground notranslate" translate="no">
              Rasel
            </span>
            <span className="text-xs text-muted-foreground capitalize">{config.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
