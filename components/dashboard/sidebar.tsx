"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "@/features/auth/authSlice";
import { LogOut, X } from "lucide-react";
import { NavItem, RoleType } from "./nav-config";
import Image from "next/image";
import { useGetAllChatsQuery } from "@/features/chat/chatApi";
import { useGetMyAppointmentQuery } from "@/features/appointment/appointmentApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardSidebarProps {
  role: RoleType;
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  navItems,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);

  const { data: chatsResponse } = useGetAllChatsQuery(undefined, { skip: !user });
  const { data: appointmentsResponse } = useGetMyAppointmentQuery(undefined, { skip: !user });

  const chatsCount = Array.isArray(chatsResponse?.data)
    ? chatsResponse.data.length
    : (chatsResponse?.pagination?.total ?? (Array.isArray(chatsResponse) ? chatsResponse.length : undefined));

  const bookingsCount = Array.isArray(appointmentsResponse?.data)
    ? appointmentsResponse.data.length
    : (appointmentsResponse?.pagination?.total ?? (Array.isArray(appointmentsResponse) ? appointmentsResponse.length : undefined));

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    dispatch(logout());
    toast.success("Successfully logged out.");
    window.location.href = "/api/auth/logout";
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 max-w-[85vw] lg:max-w-none bg-[#161618] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header / Brand Logo */}
        <div className="relative flex items-center justify-center h-16 sm:h-20 px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center justify-center group">
            {/* Light Mode Logo */}
            <Image
              src="/icons/Light_Mode.png"
              width={140}
              height={40}
              alt="The Cloud Salon"
              className="h-9 w-auto object-contain block dark:hidden"
            />
            {/* Dark Mode Logo */}
            <Image
              src="/icons/Dark_Mode.png"
              width={140}
              height={40}
              alt="The Cloud Salon"
              className="h-9 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Close button for Mobile */}
          <button
            onClick={onClose}
            className="absolute right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check active state
            const isActive =
              pathname === item.href ||
              (item.href !== "/customer/dashboard" &&
                item.href !== "/business/dashboard" &&
                item.href !== "/professional/dashboard" &&
                pathname.startsWith(item.href));

            let displayBadge = item.badge;
            if (item.href.includes("/messages")) {
              displayBadge = chatsCount;
            } else if (item.href.includes("/bookings")) {
              displayBadge = bookingsCount;
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3 text-base font-medium  transition-all duration-200 ${isActive
                  ? "bg-[#D99722] text-white  font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                      }`}
                  />
                  <span>{item.title}</span>
                </div>

                {/* Optional Badge */}
                {displayBadge !== undefined && displayBadge !== null && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive
                      ? "bg-white text-[#D99722]"
                      : "bg-white/10 text-gray-300"
                      }`}
                  >
                    {displayBadge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Footer Section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-sm bg-[#E54D42] text-white font-medium text-sm hover:bg-[#D43B30] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#E54D42]/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md bg-popover border border-border text-popover-foreground p-6 rounded-xl">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="  font-bold text-xl text-foreground">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to log out of your account? You will need to log in again to access your dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-accent text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-lg bg-[#E54D42] hover:bg-[#D43B30] text-white text-sm font-medium transition-colors cursor-pointer shadow-sm shadow-[#E54D42]/20"
            >
              Log out
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
