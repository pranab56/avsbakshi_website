"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import DashboardSidebar from "./sidebar";
import DashboardHeader from "./header";
import { DASHBOARD_CONFIGS, RoleType, getProfessionalNavItems } from "./nav-config";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import { hydrate, setUser } from "@/features/auth/authSlice";
import { getUser, getToken, getRefreshToken, saveUser } from "@/utils/storage";

interface DashboardLayoutProps {
  role: RoleType;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);
  const profileSyncedRef = useRef<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Eagerly restore auth state from localStorage on client mount if state is empty
  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      const savedUser = getUser();
      const savedToken = getToken();
      if (savedUser || savedToken) {
        dispatch(
          hydrate({
            token: savedToken,
            refreshToken: getRefreshToken(),
            user: savedUser,
          })
        );
      }
    }
  }, [user, dispatch]);

  const token = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.token);
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
    skip: !token && !getToken(),
  });

  const profileData = profileResponse?.data || profileResponse;
  const isSalonOwnerFromApi =
    profileData?.isSalonOwner ??
    profileData?.user?.isSalonOwner ??
    profileResponse?.data?.isSalonOwner ??
    profileResponse?.data?.user?.isSalonOwner ??
    profileResponse?.isSalonOwner;

  const storedUser = typeof window !== "undefined" ? getUser() : null;
  const currentUser = user || storedUser;
  const isSalonOwnerFromUser = currentUser?.isSalonOwner ?? currentUser?.user?.isSalonOwner;
  const storedIsSalonOwner = typeof window !== "undefined" ? localStorage.getItem("isSalonOwner") : null;

  const isSalonOwner = Boolean(
    isSalonOwnerFromApi !== undefined
      ? isSalonOwnerFromApi
      : isSalonOwnerFromUser !== undefined
        ? isSalonOwnerFromUser
        : storedIsSalonOwner !== null
          ? storedIsSalonOwner === "true"
          : false
  );

  useEffect(() => {
    if (profileData && typeof window !== "undefined") {
      const salonOwnerBool =
        profileData.isSalonOwner ??
        profileData.user?.isSalonOwner ??
        profileResponse?.data?.isSalonOwner ??
        profileResponse?.isSalonOwner;

      if (salonOwnerBool !== undefined) {
        localStorage.setItem("isSalonOwner", String(salonOwnerBool));
      }

      const fullName = profileData.firstName
        ? `${profileData.firstName} ${profileData.lastName || ""}`.trim()
        : profileData.name || (profileData.user?.firstName ? `${profileData.user.firstName} ${profileData.user.lastName || ""}`.trim() : "");
      if (fullName) {
        localStorage.setItem("userDisplayName", fullName);
      }

      const syncKey = `${profileData._id || profileData.id || ""}_${salonOwnerBool}_${fullName}`;
      if (profileSyncedRef.current !== syncKey) {
        profileSyncedRef.current = syncKey;
        const currentStored = getUser() || {};
        const updatedUser = {
          ...currentStored,
          ...profileData,
          isSalonOwner: salonOwnerBool !== undefined ? Boolean(salonOwnerBool) : currentStored.isSalonOwner,
        };
        saveUser(updatedUser);
        if (!user?.firstName || user.firstName !== profileData.firstName || user.isSalonOwner !== salonOwnerBool) {
          dispatch(setUser(updatedUser));
        }
      }
    }
  }, [profileData, profileResponse, dispatch]);

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
      <div className="flex flex-col flex-1 lg:pl-64 min-h-screen">
        {/* Header Topbar */}
        <DashboardHeader
          config={config}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {!isMounted || (isProfileLoading && !profileData) ? (
            <div className="flex flex-col items-center justify-center min-h-[55vh] py-16 space-y-4 animate-in fade-in duration-300">
              <div className="relative flex items-center justify-center">
                {/* Outer luxury pulsing glow */}
                <div className="absolute w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse" />

                {/* Spinning gradient ring */}
                <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />

                {/* Center brand sparkle */}
                <div className="absolute flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              <div className="space-y-1 text-center">
                <p className="text-xs font-semibold tracking-widest uppercase text-foreground/80 font-sans">
                  Loading Dashboard
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Please wait while we prepare your workspace...
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
