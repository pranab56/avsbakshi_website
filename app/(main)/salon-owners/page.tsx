"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
  DollarSign,
  User,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  Heart,
  Star,
  Loader2,
  ChevronDown,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import ChairImage from "@/components/shared/ChairImage";
import {
  useGetAllChairRentalsQuery,
  useCreateChairRentalMutation,
} from "@/features/chairRental/chairRentalApi";

const sortOptions = [
  { value: "default", label: "Default Sort" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

export default function SalonOwnersPage() {
  const router = useRouter();
  const token = useSelector((state: { auth?: { token?: string } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSortOption =
    sortOptions.find((o) => o.value === sortBy) || sortOptions[0];

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

  // Fetch chair rentals from API
  const { data: rentalsRes, isLoading, isFetching, refetch } = useGetAllChairRentalsQuery({
    page,
    limit: 12,
    searchTerm: searchTerm.trim() ? searchTerm.trim() : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const [createChairRental, { isLoading: isBookingLoading }] = useCreateChairRentalMutation();

  const rawRentals = Array.isArray(rentalsRes?.data) ? rentalsRes.data : [];
  const pagination = rentalsRes?.pagination || {
    total: rawRentals.length,
    limit: 12,
    page: 1,
    totalPage: 1,
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Client-side filtering & sorting
  const filteredRentals = useMemo(() => {
    let result = [...rawRentals];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((item: any) => {
        const chairName = item.chair?.name?.toLowerCase() || item.name?.toLowerCase() || "";
        const chairLocation = item.chair?.location?.toLowerCase() || item.location?.toLowerCase() || "";
        const salonName = item.salon?.name?.toLowerCase() || "";
        const salonEmail = item.salon?.email?.toLowerCase() || "";
        const uid = (item.uid || item.chair?.uid || "").toLowerCase();
        return (
          chairName.includes(q) ||
          chairLocation.includes(q) ||
          salonName.includes(q) ||
          salonEmail.includes(q) ||
          uid.includes(q)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (item: any) =>
          item.status?.toLowerCase() === statusFilter.toLowerCase() ||
          item.chair?.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (sortBy === "price-low") {
      result.sort((a: any, b: any) => {
        const priceA = a.chair?.pricePerDayInUSD || a.pricePerDayInUSD || a.pricing?.total || 0;
        const priceB = b.chair?.pricePerDayInUSD || b.pricePerDayInUSD || b.pricing?.total || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a: any, b: any) => {
        const priceA = a.chair?.pricePerDayInUSD || a.pricePerDayInUSD || a.pricing?.total || 0;
        const priceB = b.chair?.pricePerDayInUSD || b.pricePerDayInUSD || b.pricing?.total || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "newest") {
      result.sort(
        (a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    return result;
  }, [rawRentals, searchTerm, statusFilter, sortBy]);

  const totalCount = pagination.total || filteredRentals.length;

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const rentalDays = calculateDays(startDate, endDate);
  const selectedDailyPrice =
    selectedChair?.chair?.pricePerDayInUSD ||
    selectedChair?.pricePerDayInUSD ||
    selectedChair?.pricing?.total ||
    45;
  const estimatedTotal = selectedDailyPrice * rentalDays;

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

    if (!token && !user) {
      toast.info("Please log in to book a workspace.");
      router.push(`/login?redirect=/salon-owners/${selectedChair._id}`);
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
      selectedChair.chair?._id ||
      (typeof selectedChair.chair === "string" ? selectedChair.chair : null) ||
      selectedChair._id;

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
      {/* Header Section matching professional workspace styling */}
      <section className="relative overflow-hidden bg-gradient-to-b from-card via-card/70 to-background border-b border-border/40 pt-10 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99722]/10 border border-[#D99722]/25 text-[#D99722] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon Owner Workspaces</span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Work Space
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide max-w-2xl leading-relaxed">
            Find and book dedicated salon chairs, barber booths, and private workspaces hosted by certified salon owners.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by salon name, chair name, or location..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D99722]/40"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-background rounded-xl p-1 border border-border">
                {["all", "active", "pending", "confirmed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${statusFilter === st
                        ? "bg-[#D99722] text-white shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {st === "all" ? "All" : st}
                  </button>
                ))}
              </div>

              {/* Modern Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                  className="h-9 px-3.5 rounded-xl bg-background border border-border hover:border-[#D99722]/50 text-xs font-semibold text-foreground flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#D99722]" />
                  <span>{currentSortOption.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isSortOpen ? "rotate-180 text-[#D99722]" : ""
                      }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-0.5">
                    {sortOptions.map((opt) => {
                      const isSelected = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${isSelected
                              ? "bg-[#D99722]/10 text-[#D99722] font-bold"
                              : "text-foreground hover:bg-accent font-medium"
                            }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#D99722]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reset button only when search query is entered (never for status tabs) */}
              {searchTerm.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="px-2.5 py-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Search</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-[#D99722]" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Available Work Spaces ({filteredRentals.length})
            </h2>
          </div>
          {isFetching && (
            <span className="text-xs text-[#D99722] animate-pulse">Updating...</span>
          )}
        </div>

        {/* Workspaces Grid matching Professional Workspace cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-card border border-border rounded-lg overflow-hidden h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredRentals.length === 0 ? (
          <div className="p-16 text-center bg-card border border-border rounded-xl flex flex-col items-center justify-center space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
              <Armchair className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                No workspaces found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                No workspaces matched your search criteria. Please adjust your filters or search keywords.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRentals.map((item: any) => {
              const isFav = favorites.includes(item._id);
              const chair = item.chair || {};
              const salonObj = typeof item.salon === "object" ? item.salon : null;
              const chairName = chair.name || item.name || "Salon Work Space";
              const salonName = salonObj?.name || "Salon Studio";
              const category = salonObj?.businessType || "Hair & Beauty";
              const rating = salonObj?.avgRating || 5.0;
              const reviewCount = salonObj?.totalReviews || 0;
              const pricePerDay =
                chair.pricePerDayInUSD || item.pricePerDayInUSD || item.pricing?.total || 45;

              const imageSrc =
                chair.photo ||
                item.photo ||
                salonObj?.photos?.[0] ||
                salonObj?.logo ||
                "";

              const locationStr =
                chair.location ||
                item.location ||
                [salonObj?.address?.line1, salonObj?.address?.city].filter(Boolean).join(", ") ||
                "Ground Floor Main Station";

              const descriptionStr =
                chair.description || item.description || "";

              return (
                <div
                  key={item._id}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-[#D99722]/50 group"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-accent overflow-hidden">
                    <Link href={`/salon-owners/${item._id}`} className="block w-full h-full">
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
                      {item.status || chair.status || "Available"}
                    </span>

                    {/* Heart Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item._id)}
                      aria-label="Save workspace to favorites"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/85 backdrop-blur-xs flex items-center justify-center text-[#D99722] hover:bg-background transition-all cursor-pointer shadow-xs border border-border"
                    >
                      <Heart
                        className={`w-4 h-4 ${isFav ? "fill-[#D99722] text-[#D99722]" : "text-[#D99722]"
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
                          <Link href={`/salon-owners/${item._id}`}>
                            <h3 className="font-bold text-lg sm:text-xl text-foreground leading-tight hover:text-[#D99722] transition-colors truncate">
                              {chairName}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 font-medium truncate">
                            <Building2 className="w-3 h-3 text-[#D99722] shrink-0" />
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

                      {/* Description (if present) */}
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
                        href={`/salon-owners/${item._id}`}
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

      {/* Book Work Space Dialog Modal - identical to professional workspace */}
      {selectedChair && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 space-y-5 text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="space-y-0.5">
                <h3 className="font-bold text-xl text-foreground">
                  Book {selectedChair.chair?.name || selectedChair.name}
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
                <div className="bg-accent/70 border border-border rounded-lg p-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Daily Rate</span>
                    <span className="font-medium text-foreground">
                      ${selectedDailyPrice} / day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration</span>
                    <span className="font-medium text-foreground">
                      {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                  <div className="border-t border-border pt-1 mt-1 flex justify-between font-semibold text-foreground text-sm">
                    <span>Total Estimated</span>
                    <span className="font-bold text-[#D99722]">
                      ${estimatedTotal} USD
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
