"use client";

import { useState } from "react";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import { Loader2, AlertCircle, Armchair, Building2, Calendar, CheckCircle, XCircle } from "lucide-react";
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
  professional?: string;
  startDate?: string;
  endDate?: string;
  durationInDays?: number;
  pricing?: {
    total?: number;
    currency?: string;
  };
  totalPrice?: number;
  pricePerDayInUSD?: number;
  status?: string;
  createdAt?: string;
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

  const rentalsList: MyRentalItem[] = Array.isArray(rentalsData?.data)
    ? rentalsData.data
    : Array.isArray(rentalsData)
      ? rentalsData
      : [];

  const handleStatusUpdate = async (rentalId: string, status: "confirmed" | "cancelled") => {
    try {
      await updateChairRental({
        chairRentalId: rentalId,
        status,
      }).unwrap();
      toast.success(
        status === "confirmed"
          ? "Work space rental approved successfully"
          : "Work space rental rejected successfully"
      );
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
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
        <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
          <p className="text-sm text-muted-foreground">Loading your workspaces...</p>
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

                    {/* Admin Action Buttons if Pending */}
                    {status === "pending" && (
                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => openConfirmation(rental._id, "confirmed", chairName)}
                          className="p-1.5 rounded-md hover:bg-emerald-500/10 text-emerald-600 transition-colors cursor-pointer border border-border disabled:opacity-50"
                          title="Approve Request"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => openConfirmation(rental._id, "cancelled", chairName)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors cursor-pointer border border-border disabled:opacity-50"
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
              className={`px-5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 ${
                modalState.action === "confirmed"
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
    </div>
  );
}
