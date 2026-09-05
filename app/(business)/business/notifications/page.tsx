"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  CheckCheck,
  Trash2,
  ArrowRight,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

type NotificationType = "booking" | "rental" | "staff" | "system";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export default function BusinessNotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | NotificationType>("all");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      type: "rental",
      title: "New Chair Rental Request",
      description: "Alex Rivera requested a weekly chair rental for Station #3 starting Mon, Sep 1.",
      timestamp: "20 min ago",
      isRead: false,
      actionUrl: "/business/chairs-space",
      actionLabel: "Review Request",
    },
    {
      id: "n2",
      type: "booking",
      title: "Salon Appointment Summary",
      description: "8 new salon client appointments booked across your listed staff today.",
      timestamp: "2 hours ago",
      isRead: false,
      actionUrl: "/business/calendar",
      actionLabel: "View Calendar",
    },
    {
      id: "n3",
      type: "staff",
      title: "Staff Schedule Updated",
      description: "Elena Rostova updated her shift availability for next week.",
      timestamp: " Yesterday at 4:30 PM",
      isRead: true,
      actionUrl: "/business/staff",
      actionLabel: "Manage Staff",
    },
    {
      id: "n4",
      type: "system",
      title: "Monthly Salon Payout Verified",
      description: "Your monthly salon venue commission payout statement for August 2026 is ready.",
      timestamp: "3 days ago",
      isRead: true,
      actionUrl: "/business/analytics",
      actionLabel: "View Analytics",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read!");
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed!");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter !== "all") return n.type === filter;
    return true;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "rental":
        return <Building2 className="w-5 h-5 text-[#B78735]" />;
      case "booking":
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case "staff":
        return <Users className="w-5 h-5 text-[#2C2E33]" />;
      case "system":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-zinc-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-[#1A1A1A]">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DDD3] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
              Salon Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-[#B78735] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#787570] font-normal mt-1">
            Manage notifications for chair rentals, staff schedules, salon bookings, and payout reports
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="bg-[#E5DFD5] hover:bg-[#DCD5C9] text-[#2C2E33] px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4 text-[#B78735]" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E3DDD3]/50">
        <span className="text-xs font-semibold text-[#787570] flex items-center gap-1 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { key: "all", label: "All Notifications" },
          { key: "unread", label: `Unread (${unreadCount})` },
          { key: "rental", label: "Chair Rentals" },
          { key: "booking", label: "Bookings" },
          { key: "staff", label: "Staff Updates" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as "all" | "unread" | NotificationType)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer shrink-0 ${
              filter === tab.key
                ? "bg-[#B78735] text-white shadow-xs"
                : "bg-[#FAF9F5] border border-[#E5E0D6] text-[#2C2E33] hover:bg-[#F3EFE6]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List Container */}
      <div className="bg-white border border-[#E3DDD3]/70 rounded-2xl overflow-hidden shadow-xs divide-y divide-[#E3DDD3]/70">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors ${
                !n.isRead ? "bg-[#B78735]/5" : "hover:bg-[#FAF9F5]"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E5E0D6] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`text-sm font-semibold ${
                        !n.isRead ? "text-[#1A1A1A]" : "text-zinc-700"
                      }`}
                    >
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#B78735]" title="Unread" />
                    )}
                  </div>
                  <p className="text-xs text-[#5C5954] leading-relaxed">
                    {n.description}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 pt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{n.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                {n.actionUrl && (
                  <Link
                    href={n.actionUrl}
                    className="bg-[#FAF9F5] border border-[#E5E0D6] hover:bg-[#EBE5D9] text-[#2C2E33] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{n.actionLabel || "View"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B78735]" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-zinc-400 space-y-3">
            <Bell className="w-12 h-12 mx-auto text-zinc-300 stroke-[1.5]" />
            <p className="text-sm font-medium">No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
