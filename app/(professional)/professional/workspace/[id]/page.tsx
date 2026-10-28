"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Star,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  Instagram,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import ChairImage from "@/components/shared/ChairImage";
import { useGetSingleChairQuery } from "@/features/chair/chairApi";
import { useCreateChairRentalMutation } from "@/features/chairRental/chairRentalApi";

interface WorkspaceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function WorkspaceDetailPage({ params }: WorkspaceDetailPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const chairId = resolvedParams.id;

  // RTK Query hooks
  const {
    data: chairRes,
    isLoading: isChairLoading,
    isError: isChairError,
    error: chairError,
    refetch,
  } = useGetSingleChairQuery(chairId, { skip: !chairId });

  const [createChairRental, { isLoading: isBookingLoading }] =
    useCreateChairRentalMutation();

  const chairData = chairRes?.data;
  const salon =
    typeof chairData?.salon === "object" && chairData?.salon !== null
      ? chairData.salon
      : null;

  // Timezone-safe local client date strings (YYYY-MM-DD)
  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFutureString = (daysAhead = 2) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getTodayString());
  const [endDate, setEndDate] = useState(getFutureString(2));
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Calculate rental days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  const dailyPrice = chairData?.pricePerDayInUSD || 0;
  const estimatedSubtotal = dailyPrice * rentalDays;
  const estimatedTotal = estimatedSubtotal;

  const formatStartDateISO = (dateStr: string) => {
    try {
      if (dateStr.includes("T")) return new Date(dateStr).toISOString();
      return new Date(`${dateStr}T09:00:00.000Z`).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const formatEndDateISO = (dateStr: string) => {
    try {
      if (dateStr.includes("T")) return new Date(dateStr).toISOString();
      return new Date(`${dateStr}T18:00:00.000Z`).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  // Submit chair booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chairData) return;

    const today = getTodayString();
    if (startDate < today) {
      toast.error("Start date cannot be in the past");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    try {
      const payload = {
        chair: chairData._id,
        startDate: formatStartDateISO(startDate),
        endDate: formatEndDateISO(endDate),
      };

      const res = await createChairRental(payload).unwrap();
      const checkoutUrl =
        res?.data?.paymentData?.url ||
        res?.data?.checkoutUrl ||
        res?.data?.paymentUrl;

      if (checkoutUrl) {
        toast.success(res?.message || "Redirecting to payment checkout...");
        window.location.href = checkoutUrl;
        return;
      }

      toast.success(res?.message || "Work space booking request sent successfully!");
      router.push("/professional/workspace");
    } catch (err: any) {
      console.error("Booking submission error:", err);
      toast.error(err?.data?.message || "Failed to submit booking request");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Work space link copied to clipboard!");
    }
  };

  // Loading state
  if (isChairLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-muted/70 dark:bg-zinc-800/70 rounded" />
          <div className="h-4 w-4 bg-muted/40 dark:bg-zinc-800/40 rounded" />
          <div className="h-4 w-36 bg-muted/70 dark:bg-zinc-800/70 rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-80 w-full rounded-2xl bg-muted/70 dark:bg-zinc-800/70" />
            <div className="space-y-3">
              <div className="h-8 w-64 bg-muted/70 dark:bg-zinc-800/70 rounded" />
              <div className="h-4 w-96 bg-muted/50 dark:bg-zinc-800/50 rounded" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="h-96 w-full rounded-2xl bg-muted/70 dark:bg-zinc-800/70" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isChairError || !chairData) {
    return (
      <div className="p-12 text-center bg-card border border-border rounded-2xl max-w-xl mx-auto space-y-4 my-8">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
          <XCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Work Space Not Found
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {(chairError as any)?.data?.message ||
            "The requested workspace chair could not be loaded or is no longer available."}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/professional/workspace"
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold"
          >
            Browse Work Spaces
          </Link>
        </div>
      </div>
    );
  }

  // Prepare photos gallery
  const allPhotos: string[] = [];
  if (chairData.photo) allPhotos.push(chairData.photo);
  if (Array.isArray(salon?.photos)) {
    salon.photos.forEach((p: string) => {
      if (p && !allPhotos.includes(p)) allPhotos.push(p);
    });
  }

  const activePhoto = allPhotos[selectedPhotoIndex] || allPhotos[0] || chairData.photo;

  const addressParts = salon?.address
    ? [
        salon.address.line1,
        salon.address.city,
        salon.address.state,
        salon.address.postalCode,
        salon.address.country,
      ].filter(Boolean)
    : [];

  const hasContactInfo = Boolean(
    salon && (salon.email || salon.phone || salon.website || salon.instagram)
  );

  const hasSalonDetails = Boolean(
    salon &&
      (salon.name ||
        salon.logo ||
        salon.description ||
        addressParts.length > 0 ||
        hasContactInfo ||
        (Array.isArray(salon.availability) && salon.availability.length > 0))
  );

  return (
    <div className="space-y-6 pb-20 font-sans text-foreground">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/professional/workspace"
            className="flex items-center gap-1 hover:text-foreground transition-colors font-medium cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Work Spaces</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
            {chairData.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Side Salon & Chair Details (lg:col-span-8), Right Side Booking (lg:col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =================================================================== */}
        {/* LEFT COLUMN: SALON & CHAIR DETAILS (col-span-12 lg:col-span-8)      */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. CHAIR SHOWCASE HERO CARD */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs space-y-6 p-6 sm:p-8">
            {/* Header info with badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    {chairData.name}
                  </h1>
                  {chairData.uid && (
                    <span className="px-2.5 py-0.5 rounded-md bg-accent border border-border text-[11px] font-mono text-muted-foreground font-semibold">
                      {chairData.uid}
                    </span>
                  )}
                  {chairData.status && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 capitalize">
                      {chairData.status}
                    </span>
                  )}
                </div>

                {salon && (salon.name || salon.businessType) && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4 text-primary" />
                    {salon.name && (
                      <span className="font-semibold text-foreground">
                        {salon.name}
                      </span>
                    )}
                    {salon.name && salon.businessType && <span>•</span>}
                    {salon.businessType && <span>{salon.businessType}</span>}
                  </div>
                )}
              </div>

              {/* Price display */}
              {chairData?.pricePerDayInUSD !== undefined && chairData?.pricePerDayInUSD !== null && (
                <div className="sm:text-right shrink-0">
                  <span className="font-bold text-3xl sm:text-4xl text-primary">
                    ${chairData.pricePerDayInUSD}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-1">
                    / day
                  </span>
                </div>
              )}
            </div>

            {/* Featured Image Viewer */}
            <div className="space-y-3">
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-accent border border-border">
                {activePhoto ? (
                  <Image
                    src={activePhoto}
                    alt={chairData.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <ChairImage src={null} alt={chairData.name} size="lg" />
                )}
              </div>

              {/* Thumbnails row if multiple photos */}
              {allPhotos.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                  {allPhotos.map((photoUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={photoUrl}
                        alt={`Photo thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chair Location inside Salon & Description */}
            <div className="space-y-4 pt-2">
              {chairData.location && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-accent/40 p-3 rounded-xl border border-border">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium text-foreground">Station Location:</span>
                  <span>{chairData.location}</span>
                </div>
              )}

              {chairData.description && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Description
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {chairData.description}
                  </p>
                </div>
              )}

              {/* Dynamic highlights/amenities only if returned from API */}
              {Array.isArray(chairData.amenities || chairData.features) &&
                (chairData.amenities || chairData.features).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {(chairData.amenities || chairData.features).map(
                      (perk: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-accent/30 border border-border text-xs text-foreground font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{perk}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          </div>

          {/* 2. SALON DETAILS CARD (Only if salon info exists in API) */}
          {hasSalonDetails && salon && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
              {/* Salon Header with Logo */}
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div className="flex items-center gap-4">
                  {salon.logo ? (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-accent border border-border shrink-0 shadow-xs">
                      <Image
                        src={salon.logo}
                        alt={salon.name || "Salon logo"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : salon.name ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-accent border border-border shrink-0 shadow-xs flex items-center justify-center text-primary font-bold text-2xl">
                      {salon.name[0]}
                    </div>
                  ) : null}

                  <div>
                    <div className="flex items-center gap-2">
                      {salon.name && (
                        <h2 className="text-2xl font-bold text-foreground">
                          {salon.name}
                        </h2>
                      )}
                      {salon.uid && (
                        <span className="px-2 py-0.5 rounded-md bg-accent text-[10px] font-mono font-semibold text-muted-foreground">
                          {salon.uid}
                        </span>
                      )}
                    </div>
                    {salon.businessType && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {salon.businessType}
                      </p>
                    )}

                    {/* Ratings (Only if present in API response) */}
                    {typeof salon.avgRating === "number" && salon.avgRating > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-foreground mt-1">
                        <div className="flex items-center text-primary">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.round(salon.avgRating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold">{salon.avgRating}</span>
                        {typeof salon.totalReviews === "number" && (
                          <span className="text-muted-foreground">
                            ({salon.totalReviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Salon Description */}
              {salon.description && (
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    About the Salon
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {salon.description}
                  </p>
                </div>
              )}

              {/* Address / Location Section */}
              {addressParts.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    Address &amp; Location
                  </h3>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/40 border border-border">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs sm:text-sm">
                      {salon.address?.line1 && (
                        <p className="font-bold text-foreground">
                          {salon.address.line1}
                        </p>
                      )}
                      {salon.address?.line2 && (
                        <p className="text-muted-foreground text-xs font-medium">
                          {salon.address.line2}
                        </p>
                      )}
                      <p className="text-muted-foreground">
                        {[
                          salon.address?.city,
                          salon.address?.state,
                          salon.address?.postalCode,
                          salon.address?.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information Grid */}
              {hasContactInfo && (
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    Salon Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {salon.email && (
                      <a
                        href={`mailto:${salon.email}`}
                        className="p-3 rounded-xl bg-accent/30 border border-border flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{salon.email}</span>
                      </a>
                    )}

                    {salon.phone && (
                      <a
                        href={`tel:${salon.phone}`}
                        className="p-3 rounded-xl bg-accent/30 border border-border flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{salon.phone}</span>
                      </a>
                    )}

                    {salon.website && (
                      <a
                        href={
                          salon.website.startsWith("http")
                            ? salon.website
                            : `https://${salon.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-accent/30 border border-border flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{salon.website}</span>
                      </a>
                    )}

                    {salon.instagram && (
                      <div className="p-3 rounded-xl bg-accent/30 border border-border flex items-center gap-2.5 text-muted-foreground">
                        <Instagram className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{salon.instagram}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Operating Hours / Weekly Availability */}
              {Array.isArray(salon.availability) && salon.availability.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      Business Operating Hours
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {salon.availability.map((sched: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-accent/30 border border-border"
                      >
                        <span className="font-semibold text-foreground">
                          {sched.day}
                        </span>
                        {sched.isAvailable ? (
                          <span className="text-muted-foreground font-mono">
                            {sched.openTime} – {sched.closeTime}
                          </span>
                        ) : (
                          <span className="text-destructive font-medium text-[11px]">
                            Closed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: BOOKING SUMMARY CARD (col-span-12 lg:col-span-4)      */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
            {/* Price Header */}
            <div className="border-b border-border pb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Rental Rate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-3xl sm:text-4xl text-primary">
                  ${chairData.pricePerDayInUSD}
                </span>
                <span className="text-sm text-muted-foreground">/ day</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date pickers */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayString()}
                    value={startDate}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      if (!newStart) return;
                      setStartDate(newStart);
                      if (newStart > endDate) {
                        setEndDate(newStart);
                      }
                    }}
                    required
                    className="w-full bg-accent/50 border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>End Date</span>
                  </label>
                  <input
                    type="date"
                    min={startDate || getTodayString()}
                    value={endDate}
                    onChange={(e) => {
                      const newEnd = e.target.value;
                      if (!newEnd) return;
                      if (newEnd < startDate) {
                        setEndDate(startDate);
                      } else {
                        setEndDate(newEnd);
                      }
                    }}
                    required
                    className="w-full bg-accent/50 border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-xl bg-accent/30 border border-border space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    ${chairData.pricePerDayInUSD} × {rentalDays}{" "}
                    {rentalDays === 1 ? "day" : "days"}
                  </span>
                  <span className="font-semibold text-foreground">
                    ${estimatedSubtotal}
                  </span>
                </div>

                <div className="border-t border-border pt-2.5 flex items-center justify-between text-sm font-bold text-foreground">
                  <span>Total Estimated Cost</span>
                  <span className="font-bold text-lg text-primary">
                    ${estimatedTotal}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isBookingLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isBookingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Book Work Space</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
