"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Menu, Bell } from "lucide-react";
import { DashboardConfig } from "./nav-config";
import ThemeToggle from "@/components/shared/theme-toggle";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import { useGetAllNotificationQuery } from "@/features/notification/notificationApi";
import { getUser } from "@/utils/storage";

interface DashboardHeaderProps {
  config: DashboardConfig;
  onOpenMobileMenu: () => void;
}

export default function DashboardHeader({
  config,
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const token = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);

  const { data: profileResponse } = useGetMyProfileQuery(undefined, { skip: !token });
  const profileData = profileResponse?.data;
  const storedUser = typeof window !== "undefined" ? getUser() : null;
  const storedDisplayName = typeof window !== "undefined" ? localStorage.getItem("userDisplayName") : null;
  const currentUser = profileData || user || storedUser;

  const { data: notificationRes } = useGetAllNotificationQuery(undefined, {
    skip: !token,
    pollingInterval: 60000,
  });

  const notificationsList = Array.isArray(notificationRes?.data?.data)
    ? notificationRes.data.data
    : Array.isArray(notificationRes?.data)
    ? notificationRes.data
    : [];

  const unreadCount =
    typeof notificationRes?.data?.unreadCount === "number"
      ? notificationRes.data.unreadCount
      : notificationsList.filter((n: any) => !n.isRead).length;

  const userImage = typeof currentUser?.image === "string" && currentUser.image.trim().length > 0 ? currentUser.image : null;

  // Derive section title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || segments[segments.length - 1] === "dashboard") {
      return "Dashboard";
    }

    let targetSegment = segments[segments.length - 1];

    // Check if the last segment is an ID (MongoDB 24-hex ObjectId, UUID, numeric or mixed hash)
    const isId =
      /^[a-f0-9]{24}$/i.test(targetSegment) ||
      /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(targetSegment) ||
      /^\d+$/.test(targetSegment) ||
      (targetSegment.length >= 12 && /\d/.test(targetSegment));

    if (isId && segments.length > 1) {
      targetSegment = segments[segments.length - 2];
    }

    if (
      targetSegment === "workspace" ||
      targetSegment === "work-space" ||
      targetSegment === "chairs-space" ||
      targetSegment === "my-chair-rentals"
    ) {
      return "Work Space";
    }
    if (targetSegment === "bookings" || targetSegment === "appointments") {
      return "Bookings";
    }
    if (targetSegment === "services") {
      return "Services";
    }
    if (targetSegment === "messages" || targetSegment === "chats") {
      return "Messages";
    }
    if (targetSegment === "calendar") {
      return "Calendar";
    }
    if (targetSegment === "portfolio") {
      return "Portfolio";
    }
    if (targetSegment === "reviews") {
      return "Reviews";
    }
    if (targetSegment === "settings") {
      return "Settings";
    }
    if (targetSegment === "notifications") {
      return "Notifications";
    }

    return (
      targetSegment.charAt(0).toUpperCase() +
      targetSegment.slice(1).replace(/-/g, " ")
    );
  };

  const displayName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
    : storedDisplayName || currentUser?.name || (currentUser?.email?.split('@')[0] || "Business Professional");

  const initial = currentUser?.firstName
    ? currentUser.firstName[0].toUpperCase()
    : (displayName[0] ? displayName[0].toUpperCase() : "B");

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
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-foreground truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
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
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-background shadow-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-border shrink-0">
          <div
            className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/15 text-primary font-bold text-xs sm:text-sm border border-primary/30 notranslate shrink-0 select-none uppercase overflow-hidden"
            translate="no"
          >
            {userImage ? (
              <Image src={userImage} alt={displayName} fill className="object-cover" unoptimized />
            ) : (
              initial
            )}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-foreground notranslate" translate="no">
              {displayName}
            </span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser?.role || config.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
