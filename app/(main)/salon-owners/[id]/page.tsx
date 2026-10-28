"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  Instagram,
  CheckCircle2,
  XCircle,
  Share2,
  Armchair,
  DollarSign,
  ExternalLink,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import ChairImage from "@/components/shared/ChairImage";
import ShareModal from "@/components/shared/ShareModal";
import {
  useGetSingleCharRentalsQuery,
  useCreateChairRentalMutation,
} from "@/features/chairRental/chairRentalApi";
import { useGetSingleChairQuery } from "@/features/chair/chairApi";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkspaceDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rentalId = resolvedParams.id;

  // Redux auth state
  const token = useSelector((state: { auth?: { token?: string } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  // RTK Query: Check single chair rental first, fallback to single chair if needed
  const {
    data: rentalRes,
    isLoading: isRentalLoading,
    isError: isRentalError,
    refetch: refetchRental,
  } = useGetSingleCharRentalsQuery(rentalId, { skip: !rentalId });

  const {
    data: chairRes,
    isLoading: isChairLoading,
    refetch: refetchChair,
  } = useGetSingleChairQuery(rentalId, {
    skip: !rentalId || Boolean(rentalRes?.data),
  });

  const [createChairRental, { isLoading: isBookingLoading }] =
    useCreateChairRentalMutation();

  const rentalData = rentalRes?.data || null;
  const directChairData = chairRes?.data || null;

  // Resolved chair & salon objects
  const chair = rentalData?.chair || directChairData || null;
  const salon =
    (typeof rentalData?.salon === "object" && rentalData?.salon !== null
      ? rentalData.salon
      : typeof chair?.salon === "object" && chair?.salon !== null
      ? chair.salon
      : null) || null;
  const professional =
    typeof rentalData?.professional === "object" && rentalData?.professional !== null
      ? rentalData.professional
      : null;
  const pricing = rentalData?.pricing || null;

  // Build photo gallery strictly from chair & salon photos
  const galleryPhotos = useMemo(() => {
    const list: string[] = [];
    if (chair?.photo && typeof chair.photo === "string" && chair.photo.trim() && !chair.photo.includes("example.com")) {
      list.push(chair.photo.trim());
    }
    if (Array.isArray(salon?.photos)) {
      salon.photos.forEach((p: string) => {
        if (p && typeof p === "string" && p.trim() && !p.includes("example.com") && !list.includes(p.trim())) {
          list.push(p.trim());
        }
      });
    }
    if (salon?.logo && typeof salon.logo === "string" && salon.logo.trim() && !salon.logo.includes("example.com") && !list.includes(salon.logo.trim())) {
      list.push(salon.logo.trim());
    }
    return list;
  }, [chair?.photo, salon?.photos, salon?.logo]);

  const activePhoto = galleryPhotos[selectedPhotoIndex] || chair?.photo || salon?.logo || "";

  // Calculate rental days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  const dailyPrice =
    chair?.pricePerDayInUSD !== undefined && chair?.pricePerDayInUSD !== null
      ? chair.pricePerDayInUSD
      : pricing?.subtotal || pricing?.total || 45;

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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Full address formatter from API address object
  const formattedAddress = useMemo(() => {
    if (!salon?.address) return null;
    const parts = [
      salon.address.line1,
      salon.address.line2,
      salon.address.city,
      salon.address.state,
      salon.address.postalCode,
      salon.address.country,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : null;
  }, [salon?.address]);

  // Submit chair booking - same flow as professional workspace
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token && !user) {
      toast.info("Please log in to book a workspace station.");
      router.push(`/login?redirect=/salon-owners/${rentalId}`);
      return;
    }

    const targetChairId =
      chair?._id ||
      (typeof rentalData?.chair === "string" ? rentalData.chair : null) ||
      directChairData?._id;

    if (!targetChairId) {
      toast.error("Chair station information could not be determined.");
      return;
    }

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
        chair: targetChairId,
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
      setBookingSuccess(true);
      refetchRental();
      refetchChair();
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err?.data?.message || "Failed to submit booking request");
    }
  };

  const isLoading = isRentalLoading || (isChairLoading && !rentalData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4">
        <div className="relative w-16 h-16 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#D99722]/20 border-t-[#D99722] animate-spin" />
          <Armchair className="w-6 h-6 text-[#D99722] absolute inset-0 m-auto" />
        </div>
        <h2 className="text-base font-bold text-foreground">Loading Workspace Details...</h2>
        <p className="text-xs text-muted-foreground mt-1">Fetching response data from server</p>
      </div>
    );
  }

  if ((isRentalError && !chair) || (!rentalData && !directChairData)) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4">
        <div className="p-8 rounded-2xl bg-card border border-border max-w-md text-center shadow-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <XCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Workspace Not Found</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Could not fetch workspace details for this ID from the server.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                refetchRental();
                refetchChair();
              }}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold border border-border cursor-pointer transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/salon-owners"
              className="px-4 py-2 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold shadow-2xs transition-colors"
            >
              All Workspaces
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-border/40 bg-card/60 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground overflow-hidden">
            <Link href="/" className="hover:text-foreground transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/salon-owners" className="hover:text-foreground transition-colors shrink-0">
              Salon Owners
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
              {chair?.name || rentalData?.uid || rentalId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D99722]" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              href="/salon-owners"
              className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-xs font-semibold text-foreground flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Workspace Title Header */}
        <div className="space-y-3 mb-8">
          {chair?.name && (
            <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
              {chair.name}
            </h1>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {chair?.location && (
              <span className="flex items-center gap-1.5 text-foreground font-medium">
                <MapPin className="w-4 h-4 text-[#D99722]" />
                <span>{chair.location}</span>
              </span>
            )}
            {salon?.name && (
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#D99722]" />
                <span>
                  Host Salon: <strong className="text-foreground">{salon.name}</strong>
                </span>
              </span>
            )}
            {salon?.businessType && (
              <span className="px-2 py-0.5 rounded-md bg-accent text-foreground font-semibold">
                {salon.businessType}
              </span>
            )}
          </div>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =================================================================== */}
          {/* LEFT COLUMN: CHAIR & SALON DETAILS (col-span-12 lg:col-span-8)      */}
          {/* =================================================================== */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Showcase */}
            {galleryPhotos.length > 0 && (
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs space-y-3 p-3">
                <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-xl overflow-hidden bg-muted">
                  <ChairImage
                    src={activePhoto}
                    alt={chair?.name || salon?.name || "Workspace"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-bold">
                    {selectedPhotoIndex + 1} / {galleryPhotos.length}
                  </div>
                </div>

                {galleryPhotos.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                    {galleryPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          selectedPhotoIndex === idx
                            ? "border-[#D99722] shadow-sm scale-102"
                            : "border-border/60 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo}
                          alt={`Photo ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Chair & Station Details */}
            {chair && (
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-[#D99722]/10 text-[#D99722] flex items-center justify-center font-bold">
                    <Armchair className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Chair &amp; Station Details</h2>
                    {chair.name && (
                      <p className="text-xs text-muted-foreground">{chair.name}</p>
                    )}
                  </div>
                </div>

                {chair.description && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      Description
                    </span>
                    <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                      {chair.description}
                    </p>
                  </div>
                )}

                {/* Chair Specs Grid from API */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {chair.uid && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Chair UID</span>
                      <span className="text-sm font-bold text-foreground">{chair.uid}</span>
                    </div>
                  )}

                  {chair.location && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Station Location</span>
                      <span className="text-sm font-bold text-foreground truncate block">
                        {chair.location}
                      </span>
                    </div>
                  )}

                  {chair.pricePerDayInUSD !== undefined && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Daily Rate</span>
                      <span className="text-sm font-bold text-[#D99722]">
                        ${chair.pricePerDayInUSD} USD
                      </span>
                    </div>
                  )}

                  {chair.status && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Status</span>
                      <span className="text-sm font-bold capitalize text-foreground">
                        {chair.status}
                      </span>
                    </div>
                  )}

                  {chair.createdAt && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Created At</span>
                      <span className="text-xs font-medium text-foreground">
                        {formatDateTime(chair.createdAt)}
                      </span>
                    </div>
                  )}

                  {chair.updatedAt && (
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <span className="text-[11px] text-muted-foreground block">Updated At</span>
                      <span className="text-xs font-medium text-foreground">
                        {formatDateTime(chair.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Host Salon Details */}
            {salon && (
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted overflow-hidden relative border border-border shrink-0 shadow-2xs">
                      {salon.logo ? (
                        <Image
                          src={salon.logo}
                          alt={salon.name || "Salon"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#D99722]/15 text-[#D99722] font-bold">
                          <Building2 className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {salon.name && (
                        <h3 className="text-base sm:text-lg font-bold text-foreground">
                          {salon.name}
                        </h3>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {[salon.businessType, salon.uid].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  </div>

                  {salon._id && (
                    <Link
                      href={`/salons/${salon._id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-accent text-xs font-bold text-foreground transition-colors self-start sm:self-auto"
                    >
                      <span>Salon Details</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D99722]" />
                    </Link>
                  )}
                </div>

                {salon.description && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      About Salon
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                      {salon.description}
                    </p>
                  </div>
                )}

                {/* Salon Contact & Address Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {formattedAddress && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs">
                      <MapPin className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground block">Address</span>
                        <span className="text-muted-foreground">{formattedAddress}</span>
                      </div>
                    </div>
                  )}

                  {salon.phone && (
                    <a
                      href={`tel:${salon.phone}`}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs hover:border-[#D99722]/50 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground block">Phone</span>
                        <span className="text-muted-foreground">{salon.phone}</span>
                      </div>
                    </a>
                  )}

                  {salon.email && (
                    <a
                      href={`mailto:${salon.email}`}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs hover:border-[#D99722]/50 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-semibold text-foreground block">Email</span>
                        <span className="text-muted-foreground truncate block">{salon.email}</span>
                      </div>
                    </a>
                  )}

                  {salon.website && (
                    <a
                      href={salon.website.startsWith("http") ? salon.website : `https://${salon.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs hover:border-[#D99722]/50 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-semibold text-foreground block">Website</span>
                        <span className="text-muted-foreground truncate block">{salon.website}</span>
                      </div>
                    </a>
                  )}

                  {salon.instagram && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs">
                      <Instagram className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-semibold text-foreground block">Instagram</span>
                        <span className="text-muted-foreground truncate block">{salon.instagram}</span>
                      </div>
                    </div>
                  )}

                  {Array.isArray(salon.location?.coordinates) && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-border text-xs">
                      <MapPin className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-semibold text-foreground block">Coordinates</span>
                        <span className="text-muted-foreground truncate block">
                          Lat: {salon.location.coordinates[1]}, Lng: {salon.location.coordinates[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Availability Schedule */}
                {Array.isArray(salon.availability) && salon.availability.length > 0 && (
                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>Salon Operating Schedule</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {salon.availability.map((av: any, i: number) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-background border border-border text-[11px] flex flex-col justify-between"
                        >
                          <span className="font-bold text-foreground">{av.day}</span>
                          <span
                            className={
                              av.isAvailable
                                ? "text-muted-foreground font-medium"
                                : "text-rose-500 font-semibold"
                            }
                          >
                            {av.isAvailable ? `${av.openTime} - ${av.closeTime}` : "Closed"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: BOOKING FLOW & RESERVATION CARD (col-span-12 lg:4)   */}
          {/* =================================================================== */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D99722]/5 rounded-bl-full pointer-events-none" />

              {/* Price Header */}
              <div className="border-b border-border pb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Rental Rate
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-3xl sm:text-4xl text-[#D99722]">
                    ${dailyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/ day</span>
                </div>
              </div>

              {/* Interactive Booking Form Flow */}
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-bold text-lg text-foreground">
                    Booking Request Sent!
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Your workspace reservation has been submitted successfully.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(false)}
                    className="mt-2 px-4 py-2 bg-[#D99722] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Book Another Date
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D99722]" />
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
                        className="w-full bg-accent/50 border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-[#D99722] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D99722]" />
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
                        className="w-full bg-accent/50 border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-[#D99722] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="p-4 rounded-xl bg-accent/30 border border-border space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>
                        ${dailyPrice} × {rentalDays} {rentalDays === 1 ? "day" : "days"}
                      </span>
                      <span className="font-semibold text-foreground">
                        ${estimatedSubtotal}
                      </span>
                    </div>

                    <div className="border-t border-border pt-2.5 flex items-center justify-between text-sm font-bold text-foreground">
                      <span>Total Estimated Cost</span>
                      <span className="font-bold text-lg text-[#D99722]">
                        ${estimatedTotal} USD
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isBookingLoading}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
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
              )}

              {/* Salon Profile Link & Share Action */}
              <div className="space-y-2 pt-1 border-t border-border/50">
                {salon?._id && (
                  <Link
                    href={`/salons/${salon._id}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-border bg-background hover:bg-accent text-xs font-semibold text-foreground text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#D99722]" />
                    <span>View Salon Profile</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full py-2 px-4 rounded-xl border border-border bg-background hover:bg-accent text-xs font-semibold text-foreground text-center transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#D99722]" />
                  <span>Share This Workspace</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={chair?.name || salon?.name || "Workspace"}
        subtitle={formattedAddress || chair?.location || ""}
      />
    </div>
  );
}
