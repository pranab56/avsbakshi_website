"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, AlertCircle, Armchair, Building2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyRentalsQuery,
  useUpdateChairRentalMutation,
} from "@/features/chairRental/chairRentalApi";

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
  paymentStatus?: string;
  status?: string;
  createdAt?: string;
  uid?: string;
}

export default function MyChairRentalsPage() {
  const {
    data: rentalsRes,
    isLoading: isRentalsLoading,
    isError,
    error,
    refetch,
  } = useGetMyRentalsQuery({});

  const [updateChairRental, { isLoading: isUpdating }] = useUpdateChairRentalMutation();

  const rentalsList: MyRentalItem[] = Array.isArray(rentalsRes?.data)
    ? rentalsRes.data
    : Array.isArray(rentalsRes)
    ? rentalsRes
    : [];

  const handleStatusUpdate = async (rentalId: string, newStatus: string) => {
    try {
      const res = await updateChairRental({
        chairRentalId: rentalId,
        data: { status: newStatus },
      }).unwrap();
      const actionText = newStatus === "confirmed" ? "approved" : "cancelled";
      toast.success(res?.message || `Rental request ${actionText} successfully!`);
    } catch (err: any) {
      console.error("Failed to update status:", err);
      toast.error(err?.data?.message || err?.message || "Failed to update rental status.");
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          My Chair Rentals
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          View your requested and active chair rentals
        </p>
      </div>

      {/* Main Content */}
      {isRentalsLoading ? (
        <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
          <p className="text-sm text-muted-foreground">Loading your chair rentals...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            {(error as any)?.data?.message || "Failed to load your chair rentals."}
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
              No chair rentals requested
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              You haven&apos;t rented any salon chairs yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {rentalsList.map((rental) => {
            const chairObj = rental.chair;
            const salonObj = typeof rental.salon === "object" ? rental.salon : null;

            const chairName = chairObj?.name || "Barber Chair";
            const salonName = salonObj?.name || "Salon Space";
            const img =
              chairObj?.photo ||
              salonObj?.logo ||
              "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80";

            const startStr = rental.startDate
              ? new Date(rental.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            const endStr = rental.endDate
              ? new Date(rental.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            const statusStr = rental.status || "pending";

            return (
              <div
                key={rental._id}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs hover:border-[#D99722]/40 transition-colors"
              >
                {/* Left: Chair & Salon Info */}
                <div className="flex items-start gap-4 max-w-xl">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-secondary border border-border shrink-0">
                    <Image
                      src={img}
                      alt={chairName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-lg text-foreground">
                        {chairName}
                      </h3>
                      {rental.uid && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono rounded">
                          {rental.uid}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Building2 className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>{salonName}</span>
                      {salonObj?.email && <span>({salonObj.email})</span>}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap pt-0.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>
                          {startStr} – {endStr} ({rental.durationInDays || 1} days)
                        </span>
                      </div>
                      {chairObj?.location && (
                        <span className="px-2.5 py-0.5 bg-secondary text-muted-foreground text-[11px] rounded-md">
                          {chairObj.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Pricing & Actions */}
                <div className="flex items-center gap-5 justify-between md:justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border">
                  <div className="text-right">
                    <div className="font-serif italic font-normal text-xl text-foreground">
                      ${rental.pricing?.total || 0}
                      <span className="text-xs not-italic font-sans text-muted-foreground"> total</span>
                    </div>
                    <span
                      className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-md capitalize border mt-1 ${
                        statusStr.toLowerCase() === "confirmed" || statusStr.toLowerCase() === "approved"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : statusStr.toLowerCase() === "cancelled" || statusStr.toLowerCase() === "rejected"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}
                    >
                      {statusStr}
                    </span>
                  </div>

                  {statusStr.toLowerCase() === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(rental._id, "confirmed")}
                        className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve Request</span>
                      </button>

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(rental._id, "cancelled")}
                        className="px-3 py-1.5 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Request</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
