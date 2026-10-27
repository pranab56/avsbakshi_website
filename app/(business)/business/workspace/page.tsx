"use client";

import { useState } from "react";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import {
  Loader2,
  AlertCircle,
  Armchair,
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Phone,
  Mail,
  CreditCard,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyRentalsQuery,
  useUpdateChairRentalMutation,
} from "@/features/chairRental/chairRentalApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ListSkeleton } from "@/components/ui/skeleton";

interface ProfessionalInfo {
  _id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: {
    countryCode?: string;
    number?: string;
  } | string;
}

interface SalonInfo {
  _id?: string;
  name?: string;
  logo?: string;
  email?: string;
  phone?: string;
}

interface ChairInfo {
  _id?: string;
  name?: string;
  description?: string;
  photo?: string;
  location?: string;
  pricePerDayInUSD?: number;
  status?: string;
  uid?: string;
}

interface MyRentalItem {
  _id: string;
  chair?: ChairInfo;
  salon?: SalonInfo | string;
  professional?: ProfessionalInfo | string;
  startDate?: string;
  endDate?: string;
  durationInDays?: number;
  pricing?: {
    total?: number;
    currency?: string;
  };
  totalPrice?: number;
  pricePerDayInUSD?: number;
  paymentStatus?: string;
  transaction?: string;
  status?: string;
  uid?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function BusinessWorkspacePage() {
  const { data: rentalsData, isLoading: isRentalsLoading, isError, error, refetch } =
    useGetMyRentalsQuery({});
  const [updateChairRental, { isLoading: isUpdating }] = useUpdateChairRentalMutation();

  const [modalState, setModalState] = useState<{
    open: boolean;
    rentalId: string | null;
    action: "confirmed" | "cancelled" | null;
    chairName: string;
  }>({
    open: false,
    rentalId: null,
    action: null,
    chairName: "",
  });

  // Selected rental for viewing professional details modal
  const [selectedRentalDetails, setSelectedRentalDetails] = useState<MyRentalItem | null>(null);

  const rentalsList: MyRentalItem[] = Array.isArray(rentalsData?.data)
    ? rentalsData.data
    : Array.isArray(rentalsData)
      ? rentalsData
      : [];

  const handleStatusUpdate = async (rentalId: string, status: "confirmed" | "cancelled") => {
    try {
      await updateChairRental({
        chairRentalId: rentalId,
        id: rentalId,
        data: { status },
        status,
      }).unwrap();
      toast.success(
        status === "confirmed"
          ? "Work space rental approved successfully"
          : "Work space rental rejected successfully"
      );
      if (selectedRentalDetails && selectedRentalDetails._id === rentalId) {
        setSelectedRentalDetails((prev) => (prev ? { ...prev, status } : null));
      }
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update status");
    }
  };

  const openConfirmation = (
    rentalId: string,
    action: "confirmed" | "cancelled",
    chairName: string
  ) => {
    setModalState({
      open: true,
      rentalId,
      action,
      chairName,
    });
  };

  const handleConfirmAction = async () => {
    if (!modalState.rentalId || !modalState.action) return;
    await handleStatusUpdate(modalState.rentalId, modalState.action);
    setModalState((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Work Space
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          View your requested and active workspace rentals
        </p>
      </div>

      {/* Main Content */}
      {isRentalsLoading ? (
        <div className="bg-card border border-border rounded-lg p-2">
          <ListSkeleton count={3} />
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            {(error as any)?.data?.message || "Failed to load your workspaces."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 bg-secondary text-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : rentalsList.length === 0 ? (
        <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <Armchair className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              No workspace rentals requested
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              You haven&apos;t rented any salon workspaces yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {rentalsList.map((rental) => {
            const chairObj = rental.chair;
            const salonObj = typeof rental.salon === "object" ? rental.salon : null;

            const chairName = chairObj?.name || "Work Station";
            const salonName = salonObj?.name || "Salon Space";
            const img =
              chairObj?.photo ||
              salonObj?.logo ||
              "";

            const formattedStart = rental.startDate
              ? new Date(rental.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "N/A";
            const formattedEnd = rental.endDate
              ? new Date(rental.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "N/A";

            const price = rental.pricing?.total ?? rental.totalPrice ?? (chairObj?.pricePerDayInUSD || 0);
            const status = rental.status || "pending";

            return (
              <div
                key={rental._id}
                className="bg-card border border-border rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
              >
                {/* Left Side: Thumbnail & Main Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-accent shrink-0 border border-border">
                    <ChairImage
                      src={img}
                      alt={chairName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-foreground">
                        {chairName}
                      </span>
                      {chairObj?.uid && (
                        <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded border border-border">
                          {chairObj.uid}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>{salonName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>
                        {formattedStart} – {formattedEnd}
                      </span>
                      {rental.durationInDays && (
                        <span className="text-foreground font-medium">
                          ({rental.durationInDays} days)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Price, Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-border">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-muted-foreground block">Total Amount</span>
                    <span className="text-base font-bold text-[#D99722]">${price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize border ${status === "confirmed"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : status === "cancelled" || status === "rejected"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                    >
                      {status}
                    </span>

                    {/* View Details Eye Icon Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedRentalDetails(rental)}
                      className="px-2.5 py-2 rounded-md bg-secondary/80 hover:bg-[#D99722]/15 text-foreground hover:text-[#D99722] border border-border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium shadow-2xs group active:scale-95"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D99722] group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Admin Action Buttons if Pending */}
                    {status === "pending" && (
                      <div className="flex items-center gap-1.5 ml-1">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => openConfirmation(rental._id, "confirmed", chairName)}
                          className="p-2 rounded-md hover:bg-emerald-500/10 text-emerald-600 transition-colors cursor-pointer border border-border disabled:opacity-50"
                          title="Approve Request"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => openConfirmation(rental._id, "cancelled", chairName)}
                          className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors cursor-pointer border border-border disabled:opacity-50"
                          title="Reject Request"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={modalState.open}
        onOpenChange={(val) => setModalState((prev) => ({ ...prev, open: val }))}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              {modalState.action === "confirmed" ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span>
                {modalState.action === "confirmed"
                  ? "Approve Work Space Request"
                  : "Reject Work Space Request"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              {modalState.action === "confirmed"
                ? `Are you sure you want to approve the rental request for "${modalState.chairName}"?`
                : `Are you sure you want to reject the rental request for "${modalState.chairName}"?`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-4">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => setModalState((prev) => ({ ...prev, open: false }))}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleConfirmAction}
              className={`px-5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 ${modalState.action === "confirmed"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                }`}
            >
              {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isUpdating
                ? "Processing..."
                : modalState.action === "confirmed"
                  ? "Confirm Approval"
                  : "Confirm Rejection"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* PROFESSIONAL & RENTAL DETAILS MODAL                               */}
      {/* ----------------------------------------------------------------- */}
      <Dialog
        open={!!selectedRentalDetails}
        onOpenChange={(val) => !val && setSelectedRentalDetails(null)}
      >
        <DialogContent className="sm:max-w-2xl bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-xl text-card-foreground max-h-[90vh] overflow-y-auto">
          {selectedRentalDetails && (() => {
            const rental = selectedRentalDetails;
            const prof = typeof rental.professional === "object" ? rental.professional : null;
            const chairObj = rental.chair;
            const salonObj = typeof rental.salon === "object" ? rental.salon : null;

            const profFullName = prof
              ? `${prof.firstName || ""} ${prof.lastName || ""}`.trim() || prof.name || prof.email || "Professional Stylist"
              : "Professional Stylist";
            const profEmail = prof?.email || "Not provided";
            const profPhone = typeof prof?.phone === "object" ? prof.phone?.number : prof?.phone || "Not provided";
            const profInitials = prof?.firstName
              ? (prof.firstName[0] + (prof.lastName ? prof.lastName[0] : "")).toUpperCase()
              : profFullName.slice(0, 2).toUpperCase();

            const chairName = chairObj?.name || "Work Station";
            const chairImg = chairObj?.photo || salonObj?.logo || "";
            const chairPrice =
              rental.pricing?.total ??
              rental.totalPrice ??
              (chairObj?.pricePerDayInUSD || 0) * (rental.durationInDays || 1);
            const status = (rental.status || "pending").toLowerCase();

            const formattedStart = rental.startDate
              ? new Date(rental.startDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "N/A";
            const formattedEnd = rental.endDate
              ? new Date(rental.endDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "N/A";

            return (
              <div className="space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-border pb-4 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <DialogTitle className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                        Rental Details
                      </DialogTitle>
                      {rental.uid && (
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-secondary text-foreground font-semibold border border-border">
                          {rental.uid}
                        </span>
                      )}
                    </div>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Complete information for this workspace chair reservation
                    </DialogDescription>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border shrink-0 ${status === "confirmed"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : status === "cancelled" || status === "rejected"
                          ? "bg-destructive/15 text-destructive border-destructive/30"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      }`}
                  >
                    {rental.status || "Pending"}
                  </span>
                </div>

                {/* Section 1: Professional Information (Highlighted for Salon Owner) */}
                <div className="bg-accent/40 border border-border/80 rounded-xl p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-[#D99722]" />
                      <span>Renting Professional</span>
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold border border-primary/20">
                      Renter
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-primary/10 border-2 border-primary/30 text-primary flex items-center justify-center font-bold font-serif text-xl shrink-0 shadow-xs">
                      {prof?.image ? (
                        <Image
                          src={prof.image}
                          alt={profFullName}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        profInitials
                      )}
                    </div>

                    {/* Name & Contact */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <h3 className="font-serif font-bold text-lg text-foreground truncate">
                        {profFullName}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {/* Email */}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                          {profEmail !== "Not provided" ? (
                            <a
                              href={`mailto:${profEmail}`}
                              className="text-foreground hover:text-[#D99722] hover:underline truncate"
                            >
                              {profEmail}
                            </a>
                          ) : (
                            <span className="italic">{profEmail}</span>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5 text-[#D99722] shrink-0" />
                          {profPhone !== "Not provided" && profPhone !== "" ? (
                            <a
                              href={`tel:${profPhone}`}
                              className="text-foreground hover:text-[#D99722] hover:underline"
                            >
                              {profPhone}
                            </a>
                          ) : (
                            <span className="italic">Phone not provided</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Reserved Chair & Salon Workspace */}
                <div className="border border-border rounded-xl p-4 sm:p-5 space-y-3 bg-card shadow-2xs">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-[#D99722]" />
                    <span>Reserved Work Station</span>
                  </h4>

                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-accent shrink-0 border border-border">
                      <ChairImage src={chairImg} alt={chairName} fill className="object-cover" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-bold text-base text-foreground">
                          {chairName}
                        </span>
                        {chairObj?.uid && (
                          <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded border border-border font-mono">
                            {chairObj.uid}
                          </span>
                        )}
                      </div>

                      {chairObj?.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#D99722]" />
                          <span>{chairObj.location}</span>
                        </p>
                      )}

                      {chairObj?.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 pt-0.5">
                          {chairObj.description}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-foreground pt-1">
                        Rate:{" "}
                        <span className="text-[#D99722] font-bold">
                          ${chairObj?.pricePerDayInUSD || 0}
                        </span>{" "}
                        <span className="text-muted-foreground font-normal">/ day</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Schedule, Duration & Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Schedule Card */}
                  <div className="border border-border rounded-xl p-4 space-y-2 bg-muted/30">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>Rental Schedule</span>
                    </span>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date:</span>
                        <span className="font-semibold text-foreground">{formattedStart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End Date:</span>
                        <span className="font-semibold text-foreground">{formattedEnd}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border">
                        <span className="text-muted-foreground">Total Duration:</span>
                        <span className="font-bold text-foreground">
                          {rental.durationInDays || 1} day(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Card */}
                  <div className="border border-border rounded-xl p-4 space-y-2 bg-muted/30">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>Financial &amp; Payment</span>
                    </span>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Billed:</span>
                        <span className="font-bold text-[#D99722] text-sm">${chairPrice} USD</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Payment Status:</span>
                        <span className="font-semibold capitalize text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                          {rental.paymentStatus || "Paid"}
                        </span>
                      </div>
                      {rental.transaction && (
                        <div className="flex justify-between pt-1 border-t border-border items-center">
                          <span className="text-muted-foreground">Transaction:</span>
                          <span className="font-mono text-[10px] text-muted-foreground truncate max-w-[120px]">
                            {rental.transaction}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer / Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    {rental.createdAt && (
                      <span>
                        Requested on {new Date(rental.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    {/* Approve / Reject buttons if pending */}
                    {status === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => {
                            const id = rental._id;
                            setSelectedRentalDetails(null);
                            openConfirmation(id, "cancelled", chairName);
                          }}
                          className="px-4 py-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => {
                            const id = rental._id;
                            setSelectedRentalDetails(null);
                            openConfirmation(id, "confirmed", chairName);
                          }}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve Request</span>
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedRentalDetails(null)}
                      className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-accent text-xs font-medium transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
