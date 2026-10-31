"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  MessageSquare,
  X,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { useGetMyAppointmentQuery, useUpdateStatusMutation } from "@/features/appointment/appointmentApi";
import { useCreateChatMutation } from "@/features/chat/chatApi";

type TabType = "All" | "Pending" | "Confirmed" | "Cancelled";

export default function ProfessionalBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [messagingCustomerId, setMessagingCustomerId] = useState<string | null>(null);
  const [confirmActionModal, setConfirmActionModal] = useState<{
    isOpen: boolean;
    appointmentId: string | null;
    appointmentUid?: string;
    customerName?: string;
    serviceName?: string;
    newStatus: "confirmed" | "cancelled" | null;
  }>({
    isOpen: false,
    appointmentId: null,
    newStatus: null,
  });

  const { data: response, isLoading, isError, refetch, isFetching } = useGetMyAppointmentQuery(undefined);
  const [updateStatus] = useUpdateStatusMutation();
  const [createChat] = useCreateChatMutation();

  const appointments = response?.data || [];

  // Filter bookings based on activeTab
  const filteredBookings = appointments.filter((booking: any) => {
    if (activeTab === "All") return true;
    return booking.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const handleStatusChange = async (id: string, newStatus: "confirmed" | "cancelled") => {
    try {
      setUpdatingId(id);
      await updateStatus({
        id,
        data: { status: newStatus },
      }).unwrap();
      toast.success(`Appointment status updated to ${newStatus}!`);
      if (selectedAppointment && selectedAppointment._id === id) {
        setSelectedAppointment((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error("Failed to update status:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to update appointment status.";
      toast.error(errMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  const openConfirmModal = (booking: any, targetStatus: "confirmed" | "cancelled") => {
    const customerName = booking.customer
      ? `${booking.customer.firstName || ""} ${booking.customer.lastName || ""}`.trim() || booking.customer.email
      : "Customer";
    const serviceName = Array.isArray(booking.services) && booking.services.length > 0
      ? booking.services.map((s: any) => s.name).join(", ")
      : "Service";

    setConfirmActionModal({
      isOpen: true,
      appointmentId: booking._id,
      appointmentUid: booking.uid || booking._id?.slice(-6),
      customerName,
      serviceName,
      newStatus: targetStatus,
    });
  };

  const executeConfirmedStatusChange = async () => {
    if (!confirmActionModal.appointmentId || !confirmActionModal.newStatus) return;
    const { appointmentId, newStatus } = confirmActionModal;
    await handleStatusChange(appointmentId, newStatus);
    setConfirmActionModal({
      isOpen: false,
      appointmentId: null,
      newStatus: null,
    });
  };

  const handleMessageCustomer = async (customer: any) => {
    const customerId = typeof customer === "object" ? customer?._id : customer;
    if (!customerId) {
      toast.error("Customer information is unavailable for messaging.");
      return;
    }

    try {
      setMessagingCustomerId(customerId);
      toast.info("Connecting with customer...");
      const res = await createChat({
        participants: [customerId],
      }).unwrap();

      const createdChatId = res?.data?._id || res?._id || customerId;
      toast.success("Chat ready! Redirecting to messages...");
      router.push(`/professional/messages?chatId=${createdChatId}`);
    } catch (err: any) {
      console.error("Failed to create chat:", err);
      // Fallback redirect with customerId so the messages page can open the conversation
      router.push(`/professional/messages?chatId=${customerId}`);
    } finally {
      setMessagingCustomerId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    const s = (status || "pending").toLowerCase();
    if (s === "confirmed") {
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    }
    if (s === "cancelled") {
      return "bg-destructive/10 text-destructive border border-destructive/20";
    }
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Bookings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
            Manage client appointments and update booking statuses
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border flex items-center gap-8 text-sm overflow-x-auto">
        {(["All", "Pending", "Confirmed", "Cancelled"] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          const count = tab === "All"
            ? appointments.length
            : appointments.filter((b: any) => b.status?.toLowerCase() === tab.toLowerCase()).length;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-2.5 font-medium transition-all cursor-pointer whitespace-nowrap relative flex items-center gap-2 ${
                isActive
                  ? tab === "Cancelled"
                    ? "text-destructive"
                    : "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive
                  ? tab === "Cancelled"
                    ? "bg-destructive/15 text-destructive"
                    : "bg-primary/15 text-primary"
                  : "bg-accent text-muted-foreground"
              }`}>
                {count}
              </span>
              {isActive && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    tab === "Cancelled" ? "bg-destructive" : "bg-primary"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bookings Table Card Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
        {/* Table Header (Desktop) */}
        <div className="bg-accent/60 px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border hidden md:grid grid-cols-12 items-center gap-2">
          <div className="col-span-3">CLIENT</div>
          <div className="col-span-2">SERVICE</div>
          <div className="col-span-2">DATE & TIME</div>
          <div className="col-span-1">DURATION</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-3 text-right">STATUS & ACTIONS</div>
        </div>

        {/* Loading Skeleton Rows inside Table */}
        {isLoading ? (
          <div className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="p-4 sm:p-5 flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-3 sm:gap-2 animate-pulse"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted/70 dark:bg-zinc-800/70 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 bg-muted/70 dark:bg-zinc-800/70 rounded w-28" />
                    <div className="h-2.5 bg-muted/50 dark:bg-zinc-800/50 rounded w-16" />
                  </div>
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="h-3.5 bg-muted/70 dark:bg-zinc-800/70 rounded w-24" />
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="h-3.5 bg-muted/70 dark:bg-zinc-800/70 rounded w-28" />
                </div>
                <div className="col-span-1">
                  <div className="h-3.5 bg-muted/70 dark:bg-zinc-800/70 rounded w-12" />
                </div>
                <div className="col-span-1">
                  <div className="h-3.5 bg-muted/70 dark:bg-zinc-800/70 rounded w-14" />
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2 w-full md:w-auto">
                  <div className="h-6 bg-muted/70 dark:bg-zinc-800/70 rounded-full w-20" />
                  <div className="h-8 bg-muted/70 dark:bg-zinc-800/70 rounded-lg w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-12 text-center text-muted-foreground text-sm space-y-3">
            <p className="text-destructive font-semibold">Failed to load appointments.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Table Rows List */
          <div className="divide-y divide-border">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking: any) => {
                const customerName = booking.customer
                  ? `${booking.customer.firstName || ""} ${booking.customer.lastName || ""}`.trim() || booking.customer.email
                  : "Customer";
                const customerAvatar = booking.customer?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
                const serviceName = Array.isArray(booking.services) && booking.services.length > 0
                  ? booking.services.map((s: any) => s.name).join(", ")
                  : "General Service";
                const statusNormalized = (booking.status || "pending").toLowerCase();
                const isItemUpdating = updatingId === booking._id;
                const customerId = booking.customer?._id || booking.customer;
                const isMessagingThis = messagingCustomerId === customerId;

                return (
                  <div
                    key={booking._id}
                    className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-2 text-sm hover:bg-accent/40 transition-colors"
                  >
                    {/* Client Info */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent shrink-0 border border-border">
                        <Image
                          src={customerAvatar}
                          alt={customerName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-foreground text-sm truncate">
                          {customerName}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {booking.uid || booking._id?.slice(-6)}
                        </span>
                      </div>
                    </div>

                    {/* Service */}
                    <div className="col-span-2 text-foreground font-medium text-xs sm:text-sm">
                      <span className="md:hidden text-xs text-muted-foreground block font-normal">
                        Service:
                      </span>
                      <span className="line-clamp-2">{serviceName}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="col-span-2 text-muted-foreground text-xs sm:text-sm">
                      <span className="md:hidden text-xs text-muted-foreground block font-normal">
                        Date & Time:
                      </span>
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        {formatDate(booking.startsAt || booking.scheduledAt)}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="col-span-1 text-muted-foreground text-xs sm:text-sm">
                      <span className="md:hidden text-xs text-muted-foreground block font-normal">
                        Duration:
                      </span>
                      {booking.totalDurationInMinutes || 30} min
                    </div>

                    {/* Price */}
                    <div className="col-span-1 font-bold text-foreground text-sm sm:text-base">
                      <span className="md:hidden text-xs text-muted-foreground block font-sans font-normal">
                        Price:
                      </span>
                      ${booking.pricing?.total ?? booking.pricing?.subtotal ?? 0}
                    </div>

                    {/* Status Badge & Actions */}
                    <div className="col-span-3 md:text-right flex flex-wrap md:justify-end items-center gap-1.5 pt-1 md:pt-0">
                      {/* Payment Status Badge */}
                    

                    

                      {/* Eye Details Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedAppointment(booking)}
                        title="View Details"
                        className="p-1.5 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Message Customer Icon Button */}
                      <button
                        type="button"
                        onClick={() => handleMessageCustomer(booking.customer)}
                        disabled={isMessagingThis}
                        title="Message Customer"
                        className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isMessagingThis ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MessageSquare className="w-4 h-4" />
                        )}
                      </button>

                      {/* Action Buttons */}
                      {statusNormalized === "pending" && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openConfirmModal(booking, "confirmed")}
                            disabled={isItemUpdating}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                          >
                            {isItemUpdating ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>Confirm</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => openConfirmModal(booking, "cancelled")}
                            disabled={isItemUpdating}
                            className="px-2 py-1 rounded-md text-xs font-semibold border border-destructive/30 text-destructive hover:bg-destructive/10 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}

                      {statusNormalized === "confirmed" && (
                        <button
                          type="button"
                          onClick={() => openConfirmModal(booking, "cancelled")}
                          disabled={isItemUpdating}
                          className="px-2 py-1 rounded-md text-xs font-medium border border-destructive/30 text-destructive hover:bg-destructive/10 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {isItemUpdating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-16 text-center text-muted-foreground text-sm italic">
                No {activeTab.toLowerCase()} bookings found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-accent p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-base text-foreground">
                  Appointment Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Status & Payment & UID */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/60 border border-border flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Status:</span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${getStatusBadgeStyle(selectedAppointment.status)}`}>
                      {selectedAppointment.status || "pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Payment:</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md capitalize ${
                      (selectedAppointment.paymentStatus || "unpaid").toLowerCase() === "paid"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}>
                      {(selectedAppointment.paymentStatus || "unpaid").toLowerCase() === "paid" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {selectedAppointment.paymentStatus || "unpaid"}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  {selectedAppointment.uid || selectedAppointment._id}
                </span>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 border-b border-border pb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer Info</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent border border-border shrink-0">
                    <Image
                      src={selectedAppointment.customer?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt="Customer"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-foreground">
                      {selectedAppointment.customer
                        ? `${selectedAppointment.customer.firstName || ""} ${selectedAppointment.customer.lastName || ""}`.trim() || selectedAppointment.customer.email
                        : "Customer"}
                    </p>
                    {selectedAppointment.customer?.email && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-primary" /> {selectedAppointment.customer.email}
                      </p>
                    )}
                    {selectedAppointment.customer?.phone?.number && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-primary" /> {selectedAppointment.customer.phone.number}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Salon Info */}
              {selectedAppointment.salon && (
                <div className="space-y-2 border-b border-border pb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Salon Info</p>
                  <div className="flex items-center gap-3">
                    {selectedAppointment.salon.logo && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-accent border border-border shrink-0">
                        <Image
                          src={selectedAppointment.salon.logo}
                          alt="Salon"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm text-foreground">{selectedAppointment.salon.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedAppointment.salon.businessType}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services & Duration */}
              <div className="space-y-2 border-b border-border pb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Services & Timing</p>
                <p className="text-xs text-foreground font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {formatDate(selectedAppointment.startsAt || selectedAppointment.scheduledAt)} ({selectedAppointment.totalDurationInMinutes || 30} min)
                </p>
                {Array.isArray(selectedAppointment.services) && selectedAppointment.services.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {selectedAppointment.services.map((s: any) => (
                      <div key={s._id} className="text-xs flex items-center justify-between p-2 rounded-lg bg-accent/40">
                        <span className="font-medium text-foreground">• {s.name}</span>
                        <span className="font-bold text-foreground">${s.priceInUSD || 0}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-1 pt-1 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${selectedAppointment.pricing?.subtotal ?? 0}</span>
                </div>
                {selectedAppointment.pricing?.discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount:</span>
                    <span>-${selectedAppointment.pricing?.discount}</span>
                  </div>
                )}
                {(selectedAppointment.pricing?.platformFee !== undefined ||
                  selectedAppointment.pricing?.serviceFee !== undefined) && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Platform Fee (10%):</span>
                    <span>
                      $
                      {selectedAppointment.pricing?.platformFee ??
                        selectedAppointment.pricing?.serviceFee}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between font-bold text-base text-foreground pt-1 border-t border-border">
                  <span>Total Amount:</span>
                  <span className="text-primary">${selectedAppointment.pricing?.total ?? selectedAppointment.pricing?.subtotal ?? 0}</span>
                </div>
              </div>

              {/* Actions inside Modal */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                {/* Message Customer Button */}
                <button
                  type="button"
                  onClick={() => handleMessageCustomer(selectedAppointment.customer)}
                  disabled={messagingCustomerId === (selectedAppointment.customer?._id || selectedAppointment.customer)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {messagingCustomerId === (selectedAppointment.customer?._id || selectedAppointment.customer) ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                  <span>Message Customer</span>
                </button>

                {/* Status Actions */}
                <div className="flex items-center gap-2">
                  {(selectedAppointment.status || "pending").toLowerCase() === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => openConfirmModal(selectedAppointment, "confirmed")}
                        disabled={updatingId === selectedAppointment._id}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {updatingId === selectedAppointment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        <span>Confirm</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openConfirmModal(selectedAppointment, "cancelled")}
                        disabled={updatingId === selectedAppointment._id}
                        className="px-3 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}

                  {(selectedAppointment.status || "").toLowerCase() === "confirmed" && (
                    <button
                      type="button"
                      onClick={() => openConfirmModal(selectedAppointment, "cancelled")}
                      disabled={updatingId === selectedAppointment._id}
                      className="px-3.5 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {updatingId === selectedAppointment._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-4 h-4" />}
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION ACTION MODAL */}
      {confirmActionModal.isOpen && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 space-y-4 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center border ${
                confirmActionModal.newStatus === "confirmed"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}>
                {confirmActionModal.newStatus === "confirmed" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-xl text-foreground">
                  {confirmActionModal.newStatus === "confirmed"
                    ? "Confirm Appointment?"
                    : "Cancel Appointment?"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {confirmActionModal.newStatus === "confirmed"
                    ? "Are you sure you want to confirm the appointment for "
                    : "Are you sure you want to cancel the appointment for "}
                  <span className="font-semibold text-foreground">{confirmActionModal.customerName}</span>?
                </p>
              </div>

              <div className="bg-accent/60 border border-border rounded-xl p-3 text-left space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Booking ID:</span>
                  <span className="font-mono font-bold text-foreground">{confirmActionModal.appointmentUid}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service:</span>
                  <span className="font-medium text-foreground truncate max-w-[200px]">{confirmActionModal.serviceName}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmActionModal({ isOpen: false, appointmentId: null, newStatus: null })}
                  disabled={updatingId === confirmActionModal.appointmentId}
                  className="flex-1 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground transition-colors cursor-pointer disabled:opacity-50"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={executeConfirmedStatusChange}
                  disabled={updatingId === confirmActionModal.appointmentId}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50 ${
                    confirmActionModal.newStatus === "confirmed"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-destructive hover:bg-destructive/90"
                  }`}
                >
                  {updatingId === confirmActionModal.appointmentId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>
                      Yes, {confirmActionModal.newStatus === "confirmed" ? "Confirm" : "Cancel"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {response?.pagination && response.pagination.totalPage > 1 && (
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-xs text-muted-foreground font-medium">
            Page {currentPage} of {response.pagination.totalPage}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, response.pagination.totalPage))}
            disabled={currentPage === response.pagination.totalPage}
            className="px-3 py-1.5 text-primary hover:underline font-medium transition-colors cursor-pointer disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


