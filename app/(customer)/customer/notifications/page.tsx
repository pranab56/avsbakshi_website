"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  MessageSquare,
  FileText,
  Star,
  Tag,
  Clock,
  CheckCheck,
  Filter,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllNotificationQuery,
  useReadAllNotificationMutation,
  useReadSingleNotificationMutation,
} from "@/features/notification/notificationApi";
import { ListSkeleton } from "@/components/ui/skeleton";

export default function CustomerNotificationsPage() {
  const [filter, setFilter] = useState<string>("all");

  const { data: notificationRes, isLoading } = useGetAllNotificationQuery({
    page: 1,
    limit: 50,
  });

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

  const markAllAsRead = async () => {
    try {
      await readAllNotification(undefined).unwrap();
      toast.success("All notifications marked as read!");
    } catch {
      toast.error("Failed to mark notifications as read");
    }
  };

  const markAsRead = async (id: string, isAlreadyRead: boolean) => {
    if (!isAlreadyRead) {
      try {
        await readSingleNotification(id).unwrap();
      } catch {
        // Silent fail
      }
    }
  };

  const filteredNotifications = notificationsList.filter((n: any) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
      case "appointment":
        return <Calendar className="w-5 h-5 text-[#D99722]" />;
      case "message":
      case "chat":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "promo":
        return <Tag className="w-5 h-5 text-emerald-500" />;
      case "policy_updated":
      case "disclaimer":
        return <FileText className="w-5 h-5 text-[#D99722]" />;
      case "review":
        return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D99722]" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-[#D99722] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Stay updated with your bookings, messages, salon updates, and policies
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={isMarkingAll}
            className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs self-start sm:self-auto border border-border disabled:opacity-60"
          >
            {isMarkingAll ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#D99722]" />
            ) : (
              <CheckCheck className="w-4 h-4 text-[#D99722]" />
            )}
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border scrollbar-none">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { key: "all", label: "All Notifications" },
          { key: "unread", label: `Unread (${unreadCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer shrink-0 ${
              filter === tab.key
                ? "bg-[#D99722] border-[#D99722] text-white shadow-xs"
                : "bg-card border-border text-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List Container */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs divide-y divide-border">
        {isLoading ? (
          <ListSkeleton count={4} />
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((n: any) => (
            <div
              key={n._id}
              onClick={() => markAsRead(n._id, n.isRead)}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors cursor-pointer ${
                !n.isRead ? "bg-[#D99722]/8 hover:bg-[#D99722]/12" : "hover:bg-accent/40"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`text-sm font-bold ${
                        !n.isRead ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#D99722]" title="Unread" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {n.message || n.description}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 pt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{n.timeAgo || (n.createdAt ? new Date(n.createdAt).toLocaleDateString() : "")}</span>
                  </div>
                </div>
              </div>

              {!n.isRead && (
                <div className="self-end sm:self-center shrink-0">
                  <span className="text-[11px] font-semibold text-[#D99722] bg-[#D99722]/15 px-2.5 py-1 rounded-full border border-[#D99722]/20">
                    New
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-muted-foreground space-y-3">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground/40 stroke-[1.5]" />
            <p className="text-sm font-medium">No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
