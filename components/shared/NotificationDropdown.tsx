"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Clock,
  FileText,
  Calendar,
  MessageSquare,
  Star,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllNotificationQuery,
  useReadAllNotificationMutation,
  useReadSingleNotificationMutation,
} from "@/features/notification/notificationApi";

interface NotificationDropdownProps {
  userRole?: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export default function NotificationDropdown({
  userRole = "customer",
  isMobile = false,
  onNavigate,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: notificationRes, isLoading } = useGetAllNotificationQuery(
    { page: 1, limit: 10 },
    { pollingInterval: 60000 }
  );

  const [readAllNotification, { isLoading: isMarkingAll }] = useReadAllNotificationMutation();
  const [readSingleNotification] = useReadSingleNotificationMutation();

  const notificationsList = Array.isArray(notificationRes?.data?.data)
    ? notificationRes.data.data
    : Array.isArray(notificationRes?.data)
    ? notificationRes.data
    : [];

  const unreadCount =
    typeof notificationRes?.data?.unreadCount === "number"
      ? notificationRes.data.unreadCount
      : notificationsList.filter((n: any) => !n.isRead).length;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      await readAllNotification(undefined).unwrap();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleItemClick = async (item: any) => {
    if (!item.isRead) {
      try {
        await readSingleNotification(item._id).unwrap();
      } catch (e) {
        // Silent fail
      }
    }
  };

  const getTargetNotificationsPage = () => {
    if (userRole === "professional") return "/professional/notifications";
    if (userRole === "business") return "/business/notifications";
    return "/customer/notifications";
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "policy_updated":
      case "disclaimer":
        return <FileText className="w-4 h-4 text-[#D99722]" />;
      case "booking":
      case "appointment":
        return <Calendar className="w-4 h-4 text-emerald-500" />;
      case "message":
      case "chat":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "review":
        return <Star className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#D99722]" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        className={`relative ${
          isMobile
            ? "p-2 rounded-xl text-foreground hover:bg-accent border border-border/80 transition-colors cursor-pointer"
            : "h-10 w-10 rounded-sm border border-border bg-card hover:bg-accent hover:border-[#D99722]/50 text-foreground shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
        }`}
      >
        <Bell className="w-4 h-4" />

        {/* Unread Badge Counter */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#D99722] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-150">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`absolute z-50 mt-2 bg-popover text-popover-foreground rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ${
              isMobile
                ? "right-0 w-[calc(100vw-2rem)] max-w-sm"
                : "right-0 w-80 sm:w-96"
            }`}
          >
            {/* Header */}
            <div className="p-3.5 px-4 border-b border-border/70 flex items-center justify-between bg-card/60 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D99722]/15 text-[#D99722] border border-[#D99722]/20">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  disabled={isMarkingAll}
                  className="text-[11px] font-semibold text-[#D99722] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-60"
                >
                  {isMarkingAll ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <CheckCheck className="w-3.5 h-3.5" />
                  )}
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-border/50 scrollbar-thin">
              {isLoading ? (
                <div className="p-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#D99722]" />
                  <span>Loading notifications...</span>
                </div>
              ) : notificationsList.length === 0 ? (
                <div className="py-10 px-4 text-center text-muted-foreground space-y-2">
                  <Bell className="w-8 h-8 mx-auto text-muted-foreground/40" />
                  <p className="text-xs font-semibold text-foreground">
                    No notifications yet
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    We&apos;ll notify you when appointments, updates, or messages arrive.
                  </p>
                </div>
              ) : (
                notificationsList.slice(0, 6).map((item: any) => {
                  const isRead = item.isRead;
                  return (
                    <div
                      key={item._id}
                      onClick={() => handleItemClick(item)}
                      className={`p-3.5 px-4 flex items-start gap-3 transition-colors cursor-pointer ${
                        !isRead
                          ? "bg-[#D99722]/5 hover:bg-[#D99722]/10"
                          : "hover:bg-accent/40"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-accent border border-border/80 flex items-center justify-center shrink-0 mt-0.5">
                        {getNotificationIcon(item.type)}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-xs font-bold truncate ${
                              !isRead ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {item.title || "Notification"}
                          </p>
                          {!isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#D99722] shrink-0" />
                          )}
                        </div>

                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.message || item.description || ""}
                        </p>

                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 pt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{item.timeAgo || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "")}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 px-4 bg-card border-t border-border/70 text-center">
              <Link
                href={getTargetNotificationsPage()}
                onClick={() => {
                  setIsOpen(false);
                  if (onNavigate) onNavigate();
                }}
                className="w-full py-1.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#D99722] hover:underline transition-colors"
              >
                <span>View all notifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
