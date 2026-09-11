"use client";

import OverviewStatsGrid, { StatItem } from "@/components/customer/OverviewStatsGrid";
import AppointmentsList, { AppointmentItem } from "@/components/customer/AppointmentsList";
import RecentActivity, { ActivityItem } from "@/components/customer/RecentActivity";
import UnreviewedCallout from "@/components/customer/UnreviewedCallout";

export default function CustomerOverviewPage() {
  const stats: StatItem[] = [
    { label: "Upcoming appointments", value: "2", isHighlighted: false },
    { label: "Completed this year", value: "18", isHighlighted: false },
    { label: "Reviews given", value: "14", isHighlighted: false },
    { label: "Saved professionals", value: "7", isHighlighted: true },
  ];

  const upcomingAppointments: AppointmentItem[] = [
    {
      id: "1",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from £40",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      stylistName: "James Chen",
      service: "Balayage & Toner",
      dateTime: "Mon 19 Aug · 2:30 PM",
      price: "from $74",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Appointment confirmed with Sofia Martinez",
      subtitle: "19 Aug · Balayage & Toner",
    },
    {
      id: "2",
      title: "Payment of $55 processed",
      subtitle: "Classic Cut & Beard · James Chen",
    },
    {
      id: "3",
      title: "You left a review for Aisha Williams",
      subtitle: "5 stars · Bridal Makeup",
    },
    {
      id: "4",
      title: "Saved Priya Sharma to favourites",
      subtitle: "Nail Artist · Notting Hill",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Monday, 19 August 2026
        </p>
        <h1 className="font-serif italic font-normal text-2xl sm:text-4xl text-foreground">
          Good morning, <span className="notranslate" translate="no">Rasel</span>.
        </h1>
      </div>

      <OverviewStatsGrid stats={stats} />

      {/* Main Grid: Left Column (Appointments) & Right Column (Activity & Callout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <AppointmentsList upcomingAppointments={upcomingAppointments} />
        </div>

        <div className="lg:col-span-4 space-y-5">
          <RecentActivity recentActivities={recentActivities} />
          <UnreviewedCallout />
        </div>
      </div>
    </div>
  );
}
