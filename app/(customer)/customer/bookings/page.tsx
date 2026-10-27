"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Clock, CheckCircle2, AlertCircle, MessageSquare, Loader2 } from "lucide-react";
import { useGetMyAppointmentQuery } from "@/features/appointment/appointmentApi";
import { useCreateChatMutation } from "@/features/chat/chatApi";

function CustomerBookingsContent() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [messagingProId, setMessagingProId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: appointmentsRes, isLoading } = useGetMyAppointmentQuery(undefined);
  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    const paymentStatus = searchParams.get("payment") || searchParams.get("status");
    const sessionId = searchParams.get("session_id");
    if (paymentStatus === "success" || sessionId || searchParams.get("success") === "true") {
      toast.success("Payment completed successfully! Your booking is confirmed.");
    }
  }, [searchParams]);

  const rawAppointments = Array.isArray(appointmentsRes?.data) ? appointmentsRes.data : [];

  const formatDateTime = (startsAtStr?: string) => {
    if (!startsAtStr) return "N/A";
    try {
      const date = new Date(startsAtStr);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return startsAtStr;
    }
  };

  const formattedBookings = rawAppointments.map((item: any) => {
    const pro = item.professional || {};
    const salon = item.salon || {};
    const firstName = pro.firstName || pro.user?.firstName || "";
    const lastName = pro.lastName || pro.user?.lastName || "";
    const proName = `${firstName} ${lastName}`.trim() || salon.name || "Professional Specialist";

    const serviceNames = Array.isArray(item.services) && item.services.length > 0
      ? item.services.map((s: any) => s.name).join(", ")
      : "Beauty Service";

    const totalPrice = item.pricing?.total !== undefined
      ? `$${item.pricing.total}`
      : item.services?.[0]?.priceInUSD
        ? `$${item.services[0].priceInUSD}`
        : "$0";

    const imageUrl =
      (pro.image && pro.image.trim() !== "" ? pro.image : "") ||
      (pro.user?.image && pro.user?.image.trim() !== "" ? pro.user.image : "") ||
      (salon.logo && salon.logo.trim() !== "" ? salon.logo : "");

    const startsAtDate = item.startsAt ? new Date(item.startsAt) : new Date();
    const isPast = startsAtDate < new Date() || item.status === "completed" || item.status === "cancelled";

    // Extract target professional user ID for chat creation
    const proUserId =
      pro.user?._id ||
      pro.userId ||
      (typeof pro.user === "string" ? pro.user : null) ||
      (typeof pro === "object" ? pro._id : null) ||
      (typeof item.professional === "string" ? item.professional : null);

    return {
      id: item._id || item.uid,
      uid: item.uid,
      stylistName: proName,
      salonName: salon.name || "",
      service: serviceNames,
      dateTime: formatDateTime(item.startsAt),
      price: totalPrice,
      image: imageUrl,
      status: item.status || "pending",
      paymentStatus: item.paymentStatus || "unpaid",
      isPast,
      proId: pro._id || (typeof item.professional === "string" ? item.professional : null),
      proUserId,
      rawItem: item,
      startsAtDate,
    };
  });

  const handleMessageProfessional = async (booking: any) => {
    const targetUserId = booking.proUserId || booking.proId;
    if (!targetUserId) {
      toast.error("Specialist contact information is unavailable for messaging.");
      return;
    }

    try {
      setMessagingProId(booking.id || targetUserId);
      const res = await createChat({
        participants: [targetUserId],
      }).unwrap();

      const createdChatId = res?.data?._id || res?._id || targetUserId;
      router.push(`/customer/messages?chatId=${createdChatId}`);
    } catch (err: any) {
      console.error("Failed to create chat:", err);
      // Fallback redirect with targetUserId so customer messages page can find or open conversation
      router.push(`/customer/messages?chatId=${targetUserId}`);
    } finally {
      setMessagingProId(null);
    }
  };

  const upcomingBookings = formattedBookings.filter((b: any) => !b.isPast);
  const pastBookings = formattedBookings.filter((b: any) => b.isPast);

  const currentBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          My Bookings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Manage your upcoming appointments and booking history
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${activeTab === "upcoming"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Upcoming ({upcomingBookings.length})
          {activeTab === "upcoming" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${activeTab === "past"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Past ({pastBookings.length})
          {activeTab === "past" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="max-w-3xl space-y-4 pt-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-card border border-border rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 animate-pulse"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted/70 dark:bg-zinc-800/70 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted/70 dark:bg-zinc-800/70 rounded w-36" />
                  <div className="h-3 bg-muted/60 dark:bg-zinc-800/60 rounded w-24" />
                  <div className="h-3 bg-muted/50 dark:bg-zinc-800/50 rounded w-48" />
                </div>
              </div>
              <div className="space-y-2 items-end flex flex-col shrink-0">
                <div className="h-5 bg-muted/70 dark:bg-zinc-800/70 rounded w-16" />
                <div className="h-8 bg-muted/70 dark:bg-zinc-800/70 rounded-lg w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : currentBookings.length > 0 ? (
        <div className="max-w-3xl space-y-4 pt-2">
          {currentBookings.map((booking: any) => (
            <div
              key={booking.id}
              className="bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs hover:border-primary/40"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Thumbnail Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-accent border border-border">
                  <ChairImage
                    src={booking.image}
                    alt={booking.stylistName}
                    size="sm"
                    className="object-cover"
                  />
                </div>

                {/* Booking Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-foreground leading-tight">
                      {booking.stylistName}
                    </h3>
                    {booking.salonName && (
                      <span className="text-[10px] font-semibold bg-accent px-2 py-0.5 rounded text-muted-foreground">
                        {booking.salonName}
                      </span>
                    )}
                  </div>

                  <p className="text-primary font-semibold text-xs sm:text-sm">
                    {booking.service}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap pt-0.5">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {booking.dateTime}
                    </span>

                    <span className="font-serif italic font-bold text-primary text-sm">
                      {booking.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${booking.paymentStatus === "paid"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}>
                      {booking.paymentStatus === "paid" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      Payment: {booking.paymentStatus}
                    </span>

                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-muted-foreground capitalize border border-border">
                      Status: {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sm:self-center shrink-0 flex items-center gap-2 w-full sm:w-auto">
                {/* Message Professional Button (Only when payment is paid) */}
                {booking.paymentStatus?.toLowerCase() === "paid" && (
                  <button
                    type="button"
                    onClick={() => handleMessageProfessional(booking)}
                    disabled={messagingProId === (booking.id || booking.proUserId || booking.proId)}
                    title={`Message ${booking.stylistName}`}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold shadow-xs disabled:opacity-50 active:scale-95 group"
                  >
                    {messagingProId === (booking.id || booking.proUserId || booking.proId) ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <MessageSquare className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    )}
                    <span>Message</span>
                  </button>
                )}

                <Link
                  href={booking.proId ? `/professionals/${booking.proId}` : "/discover"}
                  className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors shadow-xs"
                >
                  {activeTab === "upcoming" ? "View Specialist" : "Re-Book Service"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl bg-accent/60 border border-border rounded-2xl p-12 text-center text-muted-foreground space-y-3">
          <p className="font-serif text-lg font-bold text-foreground">No {activeTab} bookings found</p>
          <p className="text-xs max-w-sm mx-auto">
            You don't have any {activeTab} appointment bookings at the moment. Browse top rated specialists to book your next service.
          </p>
          <Link
            href="/professionals"
            className="inline-block px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs transition-colors"
          >
            Explore & Book Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CustomerBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-muted-foreground">
          Loading bookings...
        </div>
      }
    >
      <CustomerBookingsContent />
    </Suspense>
  );
}