"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Armchair,
  Building2,
  MapPin,
  Search,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Heart,
  Star,
  Loader2,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getToken, getUser } from "@/utils/storage";
import ChairImage from "@/components/shared/ChairImage";
import { useGetAllChairsQuery } from "@/features/chair/chairApi";
import { useCreateChairRentalMutation } from "@/features/chairRental/chairRentalApi";

export default function WorkspacesPage() {
  const router = useRouter();
  const token = useSelector((state: { auth?: { token?: string } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Quick booking modal state
  const [selectedChair, setSelectedChair] = useState<any | null>(null);
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

  // Fetch all chairs from API using useGetAllChairsQuery with searchTerm and static active status
  const { data: chairsRes, isLoading, isFetching, refetch } = useGetAllChairsQuery({
    page,
    limit: 12,
    searchTerm: searchTerm.trim() ? searchTerm.trim() : undefined,
    status: "active",
  });

  const [createChairRental, { isLoading: isBookingLoading }] = useCreateChairRentalMutation();

  const rawChairs = Array.isArray(chairsRes?.data) ? chairsRes.data : [];
  const pagination = chairsRes?.pagination || {
    total: rawChairs.length,
    limit: 12,
    page: 1,
    totalPage: 1,
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Client-side filtering (ensuring only active chairs and matching search term)
  const filteredChairs = useMemo(() => {
    let result = [...rawChairs];

    // Filter for active chairs
    result = result.filter(
      (item: any) => (item.status || item.chair?.status || "active").toLowerCase() === "active"
    );

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((item: any) => {
        const chairName = (item.name || item.chair?.name || "").toLowerCase();
        const chairLocation = (item.location || item.chair?.location || "").toLowerCase();
        const salonName = (item.salon?.name || "").toLowerCase();
        const salonEmail = (item.salon?.email || "").toLowerCase();
        const uid = (item.uid || item.chair?.uid || "").toLowerCase();
        const desc = (item.description || item.chair?.description || "").toLowerCase();
        return (
          chairName.includes(q) ||
          chairLocation.includes(q) ||
          salonName.includes(q) ||
          salonEmail.includes(q) ||
          uid.includes(q) ||
          desc.includes(q)
        );
      });
    }

    return result;
  }, [rawChairs, searchTerm]);

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const [sY, sM, sD] = start.split("-").map(Number);
    const [eY, eM, eD] = end.split("-").map(Number);
    if (!sY || !sM || !sD || !eY || !eM || !eD) return 1;

    const sUTC = Date.UTC(sY, sM - 1, sD);
    const eUTC = Date.UTC(eY, eM - 1, eD);
    const diffTime = eUTC - sUTC;
    if (diffTime < 0) return 1;

    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Inclusive: e.g. 31st to 31st = 1 day, 31st to 1st = 2 days
  };

  const rentalDays = calculateDays(startDate, endDate);
  const selectedDailyPrice =
    selectedChair?.pricePerDayInUSD ||
    selectedChair?.chair?.pricePerDayInUSD ||
    selectedChair?.pricing?.total ||
    45;
  const estimatedSubtotal = selectedDailyPrice * rentalDays;
  const platformFee = Math.round(estimatedSubtotal * 0.10 * 100) / 100;
  const estimatedTotal = Math.round((estimatedSubtotal + platformFee) * 100) / 100;

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

  const handleBookChairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChair) return;

    const activeToken = token || (typeof window !== "undefined" ? getToken() : null);
    const activeUser = user || (typeof window !== "undefined" ? getUser() : null);

    if (!activeToken && !activeUser) {
      toast.info("Please log in to book a workspace.");
      router.push(`/login?redirect=/workspaces/${selectedChair._id}`);
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

    const chairIdToBook =
      selectedChair._id ||
      selectedChair.chair?._id ||
      (typeof selectedChair.chair === "string" ? selectedChair.chair : null);

    try {
      const payload = {
        chair: chairIdToBook,
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
      refetch();

      setTimeout(() => {
        setSelectedChair(null);
        setBookingSuccess(false);
      }, 1500);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit booking request");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* =========================================================================
          FIGMA HERO SECTION (Matching Home & Services Page Arched Frame)
      ========================================================================= */}
      <section className="w-full relative bg-white dark:bg-[#121214] border-b border-border/40 overflow-hidden transition-colors duration-200">
        {/* Subtle Animated Ambient Glow in Background */}
        <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* Desktop Golden Arc Frame Pinned to Viewport Right-0 */}
        <div className="hidden lg:flex absolute inset-y-0 -top-[6px] -bottom-[6px] right-0 w-[calc(48vw)] xl:w-[calc(50vw)] rounded-l-full border-l-[22px] xl:border-l-[26px] border-t-[3.5px] border-b-[3.5px] border-[#D99722] shadow-2xl overflow-hidden bg-[#121110] items-stretch z-0">
          <div className="w-full relative overflow-hidden h-full">
            <motion.div
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/hero/images.png"
                alt="The Cloud Salon Dedicated Workspaces & Chair Rentals"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Hero Left Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-14 lg:py-16 min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] xl:min-h-[500px] flex flex-col justify-center">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Workspaces</span>
          </div>

          <div className="max-w-2xl space-y-4">
            {/* Tagline Ribbon */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]">
              <span className="w-7 h-[2px] bg-[#D99722] inline-block" />
              <span>SALON OWNER WORKSPACES &amp; CHAIR RENTALS</span>
            </div>

            {/* Headline */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-[#1C1C1E] dark:text-white">
              Find your workspace. <br />
              <span className="text-[#D99722]">Grow your business.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-normal max-w-xl leading-relaxed">
              Find and book dedicated salon chairs, barber booths, and private workspaces hosted by certified salon owners.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-8 pt-2 max-w-3xl">
            <div className="bg-card border border-border shadow-xl rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-accent/40 rounded-xl border border-border/50 focus-within:border-[#D99722] focus-within:bg-background transition-all">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by salon name, chair name, or location..."
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                className="px-7 py-3 rounded-xl bg-[#D99722] hover:bg-[#C2841B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
              >
                <span>Find Workspaces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-[#D99722]" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Available Work Spaces ({filteredChairs.length})
            </h2>
          </div>
          {isFetching && (
            <span className="text-xs text-[#D99722] animate-pulse">Updating...</span>
          )}
        </div>

        {/* Workspaces Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-card border border-border rounded-lg overflow-hidden h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredChairs.length === 0 ? (
          <div className="p-16 text-center bg-card border border-border rounded-xl flex flex-col items-center justify-center space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
              <Armchair className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                No workspaces found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                No workspaces matched your search criteria. Please adjust your search keywords.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredChairs.map((item: any) => {
              const isFav = favorites.includes(item._id);
              const chair = item.chair || item;
              const salonObj = typeof item.salon === "object" ? item.salon : null;
              const chairName = item.name || chair.name || "Salon Work Space";
              const salonName = salonObj?.name || "Salon Studio";
              const category = salonObj?.businessType || "Hair & Beauty";
              const rating = salonObj?.avgRating || 5.0;
              const reviewCount = salonObj?.totalReviews || 0;
              const pricePerDay =
                item.pricePerDayInUSD || chair.pricePerDayInUSD || item.pricing?.total || 45;

              const imageSrc =
                item.photo ||
                chair.photo ||
                salonObj?.photos?.[0] ||
                salonObj?.logo ||
                "";

              const locationStr =
                item.location ||
                chair.location ||
                [salonObj?.address?.line1, salonObj?.address?.city].filter(Boolean).join(", ") ||
                "Ground Floor Main Station";

              const descriptionStr =
                item.description || chair.description || "";

              return (
                <div
                  key={item._id}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-[#D99722]/50 group"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-accent overflow-hidden">
                    <Link href={`/workspaces/${item._id}`} className="block w-full h-full">
                      <ChairImage
                        src={imageSrc}
                        alt={chairName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        showLabel
                      />
                    </Link>

                    {/* Status Badge */}
                    <span className="absolute top-3 left-3 bg-background/85 backdrop-blur-xs text-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-xs border border-border capitalize">
                      {item.status || chair.status || "Active"}
                    </span>

                    {/* Heart Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item._id)}
                      aria-label="Save workspace to favorites"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/85 backdrop-blur-xs flex items-center justify-center text-[#D99722] hover:bg-background transition-all cursor-pointer shadow-xs border border-border"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? "fill-[#D99722] text-[#D99722]" : "text-[#D99722]"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Title & Price Row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link href={`/workspaces/${item._id}`}>
                            <h3 className="font-bold text-lg sm:text-xl text-foreground leading-tight hover:text-[#D99722] transition-colors truncate">
                              {chairName}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 font-medium truncate">
                            <Building2 className="w-3 h-3 text-[#D99722]" shrink-0 />
                            <span className="truncate">{salonName}</span>
                          </div>
                        </div>

                        <span className="font-bold text-lg sm:text-xl text-[#D99722] shrink-0">
                          ${pricePerDay}
                          <span className="text-xs text-muted-foreground font-normal">
                            /day
                          </span>
                        </span>
                      </div>

                      {/* Category */}
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {category}
                      </p>

                      {/* Description */}
                      {descriptionStr && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {descriptionStr}
                        </p>
                      )}

                      {/* Star Rating Row */}
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <div className="flex items-center gap-0.5 text-[#D99722]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722]"
                            />
                          ))}
                        </div>
                        <span className="text-foreground font-medium ml-1">
                          {rating} ({reviewCount})
                        </span>
                      </div>

                      {/* Location Row */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        <span className="line-clamp-1">{locationStr}</span>
                      </div>
                    </div>

                    {/* Book Work Space Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/workspaces/${item._id}`}
                        className="w-full block text-center bg-[#D99722] hover:bg-[#C2841B] active:scale-[0.98] text-white py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                      >
                        Book Work Space
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Section */}
        {pagination.totalPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-border/40">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors cursor-pointer"
            >
              Previous
            </button>

            <span className="text-xs font-medium text-muted-foreground px-3">
              Page <strong className="text-foreground">{page}</strong> of{" "}
              <strong className="text-foreground">{pagination.totalPage}</strong>
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPage))}
              disabled={page >= pagination.totalPage}
              className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Book Work Space Dialog Modal */}
      {selectedChair && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 space-y-5 text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="space-y-0.5">
                <h3 className="font-bold text-xl text-foreground">
                  Book {selectedChair.name || selectedChair.chair?.name || "Workspace"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {typeof selectedChair.salon === "object"
                    ? selectedChair.salon?.name
                    : "Salon"}{" "}
                  · ${selectedDailyPrice}/day
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChair(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-foreground">
                  Booking Request Sent!
                </h4>
                <p className="text-xs text-muted-foreground">
                  Your workspace booking has been created.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookChairSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Start Date
                  </label>
                  <div className="relative">
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
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      required
                    />
                    <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    End Date
                  </label>
                  <div className="relative">
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
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      required
                    />
                    <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-accent/70 border border-border rounded-lg p-3 space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground/70" />
                      <span>Duration</span>
                    </span>
                    <span className="font-medium text-foreground">
                      {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Rate (${selectedDailyPrice} × {rentalDays} {rentalDays === 1 ? "day" : "days"})</span>
                    <span className="font-medium text-foreground">
                      ${estimatedSubtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D99722]" />
                      <span>Platform Fee (10%)</span>
                    </span>
                    <span className="font-semibold text-foreground">
                      ${platformFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground text-sm">
                    <span>Total Amount</span>
                    <span className="font-bold text-[#D99722]">
                      ${estimatedTotal.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedChair(null)}
                    disabled={isBookingLoading}
                    className="flex-1 bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80 py-2.5 rounded-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBookingLoading}
                    className="flex-1 bg-[#D99722] hover:bg-[#C2841B] text-white py-2.5 rounded-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isBookingLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Confirm Booking</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
