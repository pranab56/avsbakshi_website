"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Heart, Star, MapPin, X, Calendar, CheckCircle2, Loader2, AlertCircle, Armchair, Building2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllChairRentalsQuery,
  useGetMyRentalsQuery,
  useCreateChairRentalMutation,
  useUpdateChairRentalMutation,
} from "@/features/chairRental/chairRentalApi";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";

interface SalonAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface SalonInfo {
  _id?: string;
  name?: string;
  businessType?: string;
  description?: string;
  logo?: string;
  photos?: string[];
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  address?: SalonAddress;
  totalReviews?: number;
  avgRating?: number;
  uid?: string;
}

interface ChairRentalItem {
  _id: string;
  name: string;
  description?: string;
  photo?: string;
  location?: string;
  pricePerDayInUSD: number;
  status?: string;
  salon?: SalonInfo | string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  uid?: string;
}

interface BookingRecord {
  _id: string;
  chair?: ChairRentalItem | string;
  salon?: SalonInfo | string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  pricePerDayInUSD?: number;
  pricing?: {
    total?: number;
    currency?: string;
  };
  status?: string;
  createdAt?: string;
  uid?: string;
}

export default function ProfessionalChairRentalPage() {
  const router = useRouter();
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, { skip: !user });
  const profileData = profileResponse?.data;
  const isSalonOwner = Boolean(profileData?.isSalonOwner ?? user?.isSalonOwner);

  useEffect(() => {
    if (!isProfileLoading && isSalonOwner) {
      router.replace("/professional/my-chair-rentals");
    }
  }, [isSalonOwner, isProfileLoading, router]);

  const [activeTab, setActiveTab] = useState<"browse" | "bookings">("browse");
  const [favorites, setFavorites] = useState<string[]>([]);

  // API Queries & Mutations
  const {
    data: allChairsRes,
    isLoading: isLoadingChairs,
    isError: isErrorChairs,
    error: errorChairs,
    refetch: refetchChairs,
  } = useGetAllChairRentalsQuery({}, { skip: isSalonOwner });

  const {
    data: myRentalsRes,
    isLoading: isLoadingRentals,
    refetch: refetchMyRentals,
  } = useGetMyRentalsQuery({}, { skip: isSalonOwner });

  const [createChairRental, { isLoading: isBookingLoading }] = useCreateChairRentalMutation();
  const [updateChairRental, { isLoading: isUpdating }] = useUpdateChairRentalMutation();

  // Extract data lists from API responses
  const chairsList: ChairRentalItem[] = Array.isArray(allChairsRes?.data)
    ? allChairsRes.data
    : Array.isArray(allChairsRes)
      ? allChairsRes
      : [];

  const myBookingsList: BookingRecord[] = Array.isArray(myRentalsRes?.data)
    ? myRentalsRes.data
    : Array.isArray(myRentalsRes)
      ? myRentalsRes
      : [];

  // Modal State for Booking a Chair
  const [selectedChair, setSelectedChair] = useState<ChairRentalItem | null>(null);

  const getTodayString = () => new Date().toISOString().split("T")[0];
  const getFutureString = (daysAhead = 2) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(getTodayString());
  const [endDate, setEndDate] = useState(getFutureString(2));
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const rentalDays = calculateDays(startDate, endDate);
  const estimatedTotal = (selectedChair?.pricePerDayInUSD || 0) * rentalDays;

  const handleBookChairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChair) return;

    const salonId =
      typeof selectedChair.salon === "object"
        ? selectedChair.salon?._id
        : selectedChair.salon;

    const payload = {
      chair: selectedChair._id,
      salon: salonId,
      startDate,
      endDate,
    };

    try {
      const res = await createChairRental(payload).unwrap();
      toast.success(res?.message || "Chair booking request sent successfully!");
      setBookingSuccess(true);
      refetchMyRentals();
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedChair(null);
        setActiveTab("bookings");
      }, 1200);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(
        err?.data?.message || err?.message || "Failed to submit booking request."
      );
    }
  };

  if (isProfileLoading || isSalonOwner) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Chair Rental
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          Find a workspace when you need it
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border flex items-center gap-8 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("browse")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${activeTab === "browse"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Browse Chairs
          {activeTab === "browse" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`pb-2.5 font-medium transition-all cursor-pointer relative ${activeTab === "bookings"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
            }`}
        >
          My Bookings ({myBookingsList.length})
          {activeTab === "bookings" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Browse Chairs */}
      {activeTab === "browse" && (
        <>
          {isLoadingChairs ? (
            <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
              <p className="text-sm text-muted-foreground">Loading available chairs...</p>
            </div>
          ) : isErrorChairs ? (
            <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center space-y-3">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm font-medium text-destructive">
                {(errorChairs as any)?.data?.message || "Failed to load chairs."}
              </p>
              <button
                type="button"
                onClick={() => refetchChairs()}
                className="px-4 py-2 bg-secondary text-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : chairsList.length === 0 ? (
            <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <Armchair className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  No chairs available
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  There are no salon chairs available for rental at the moment. Please check back later.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {chairsList.map((item) => {
                const isFav = favorites.includes(item._id);
                const salonObj = typeof item.salon === "object" ? item.salon : null;
                const imageSrc =
                  item.photo ||
                  salonObj?.photos?.[0] ||
                  salonObj?.logo ||
                  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80";

                const salonName = salonObj?.name || "Salon Space";
                const category = salonObj?.businessType || "Hair & Beauty";
                const rating = salonObj?.avgRating || 5.0;
                const reviewCount = salonObj?.totalReviews || 0;

                const locationStr =
                  item.location ||
                  [salonObj?.address?.line1, salonObj?.address?.city, salonObj?.address?.country]
                    .filter(Boolean)
                    .join(", ") ||
                  "Main Location";

                return (
                  <div
                    key={item._id}
                    className="bg-card border border-border rounded-lg overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-primary/50"
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-56 bg-accent">
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />

                      {/* Open / Status Badge */}
                      <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-xs text-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-xs border border-border capitalize">
                        {item.status || "Available"}
                      </span>

                      {/* Heart Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item._id)}
                        aria-label="Save chair to favorites"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-xs flex items-center justify-center text-primary hover:bg-background transition-all cursor-pointer shadow-xs border border-border"
                      >
                        <Heart
                          className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : "text-primary"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        {/* Title & Price Row */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 font-medium">
                              <Building2 className="w-3 h-3 text-[#D99722]" />
                              <span>{salonName}</span>
                            </div>
                          </div>
                          <span className="font-serif italic font-bold text-lg sm:text-xl text-primary shrink-0">
                            ${item.pricePerDayInUSD}
                            <span className="text-xs not-italic font-sans text-muted-foreground font-normal">
                              /day
                            </span>
                          </span>
                        </div>

                        {/* Category */}
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {category}
                        </p>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {/* Star Rating Row */}
                        <div className="flex items-center gap-1 text-xs sm:text-sm">
                          <div className="flex items-center gap-0.5 text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5 fill-primary text-primary"
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

                      {/* Book Chair Action */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedChair(item)}
                          className="w-full text-center bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground py-2.5 rounded-sm font-medium text-xs sm:text-sm transition-all cursor-pointer"
                        >
                          Book Chair
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Tab 2: My Bookings */}
      {activeTab === "bookings" && (
        <div className="space-y-4 pt-2 max-w-5xl">
          {isLoadingRentals ? (
            <div className="p-12 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
              <p className="text-sm text-muted-foreground">Loading your bookings...</p>
            </div>
          ) : myBookingsList.length > 0 ? (
            myBookingsList.map((booking) => {
              const chairObj = typeof booking.chair === "object" ? booking.chair : null;
              const salonObj = typeof booking.salon === "object" ? booking.salon : null;

              const title = chairObj?.name || salonObj?.name || "Chair Rental";
              const salonName = salonObj?.name || "Salon";

              const img =
                chairObj?.photo ||
                salonObj?.photos?.[0] ||
                salonObj?.logo ||
                "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80";

              const formattedStart = booking.startDate
                ? new Date(booking.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
                : "";
              const formattedEnd = booking.endDate
                ? new Date(booking.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
                : "";
              const dateRangeStr =
                formattedStart && formattedEnd
                  ? `${formattedStart} – ${formattedEnd}`
                  : "Rental Booking";

              const priceStr = booking.pricing?.total !== undefined
                ? `$${booking.pricing.total}`
                : booking.totalPrice !== undefined
                ? `$${booking.totalPrice}`
                : booking.pricePerDayInUSD !== undefined
                ? `$${booking.pricePerDayInUSD}/day`
                : "N/A";

              const statusStr = booking.status || "pending";

              return (
                <div
                  key={booking._id}
                  className="bg-card border border-border rounded-lg p-4 sm:p-5 flex items-center justify-between shadow-xs hover:border-primary/50 transition-all"
                >
                  {/* Left Side: Thumbnail & Title */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-accent shrink-0 border border-border">
                      <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="space-y-0.5 sm:space-y-1">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-foreground leading-tight">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                        {salonName} · {dateRangeStr}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Status Badge & Total Price */}
                  <div className="text-right space-y-1 sm:space-y-2">
                    <div>
                      <span
                        className={`inline-block text-xs font-medium px-3 py-0.5 rounded-full border capitalize ${statusStr.toLowerCase() === "confirmed" || statusStr.toLowerCase() === "active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : statusStr.toLowerCase() === "pending"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}
                      >
                        {statusStr}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-lg sm:text-xl text-foreground">
                      {priceStr}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-accent/60 border border-border rounded-lg p-12 text-center text-muted-foreground space-y-2">
              <p className="font-serif text-lg text-foreground">No active chair bookings found.</p>
              <p className="text-xs">Browse chairs and select dates to book a station.</p>
            </div>
          )}
        </div>
      )}

      {/* Book Chair Dialog Modal */}
      {selectedChair && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 space-y-5 text-foreground">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="space-y-0.5">
                <h3 className="font-serif font-bold text-xl text-foreground">
                  Book {selectedChair.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {typeof selectedChair.salon === "object" ? selectedChair.salon?.name : "Salon"} · ${selectedChair.pricePerDayInUSD}/day
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
                <h4 className="font-serif font-bold text-lg text-foreground">
                  Booking Request Sent!
                </h4>
                <p className="text-xs text-muted-foreground">
                  Redirecting to your bookings...
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
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
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
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-accent border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
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
                      ${selectedChair.pricePerDayInUSD} / day
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
                    <span className="font-serif text-primary">
                      ${estimatedTotal}
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
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
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

