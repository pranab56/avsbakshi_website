"use client";

import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Building2,
  Users,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Share2,
  Heart,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { getSalonById, getProfessionalsBySalon } from "@/lib/data/marketplaceData";
import { useGetSingleSalonQuery } from "@/features/salon/salonApi";
import { useGetProfessionalsBySalonIdQuery } from "@/features/profesional/profesionalApi";
import { useAddAndRemoveWishListMutation } from "@/features/wishlist/wishlistApi";
import { useGetAllReviewsQuery } from "@/features/review/reviewApi";
import ShareModal from "@/components/shared/ShareModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SalonTab = "team" | "about" | "reviews" | "gallery";

function formatTimeWithAMPM(timeStr?: string): string {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase().includes("am") || trimmed.toLowerCase().includes("pm")) {
    return trimmed;
  }
  const parts = trimmed.split(":");
  if (parts.length < 2) return trimmed;

  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];

  if (isNaN(hours)) return trimmed;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${formattedHours}:${minutes} ${ampm}`;
}

export default function SalonDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const salonId = resolvedParams.id;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data: singleSalonRes, isLoading } = useGetSingleSalonQuery({ id: salonId }, { skip: !salonId });
  const apiSalonData = singleSalonRes?.data;

  // Fetch live team members for this salon
  const { data: prosBySalonRes, isLoading: isProsLoading } = useGetProfessionalsBySalonIdQuery(
    { salonId },
    { skip: !salonId }
  );

  // Fetch reviews for this salon
  const { data: reviewsRes, isLoading: isReviewsLoading } = useGetAllReviewsQuery(
    salonId ? { entity: salonId } : {}
  );
  const rawReviews = Array.isArray(reviewsRes?.data) ? reviewsRes.data : [];
  const salonReviews = rawReviews.filter(
    (r: any) =>
      r.entity?._id === salonId ||
      r.entity === salonId ||
      (r.entityType === "salon" && (!r.entity || r.entity?._id === salonId))
  );

  const [activeTab, setActiveTab] = useState<SalonTab>("team");
  const tabsSectionRef = useRef<HTMLElement>(null);

  const handleBookAppointmentClick = () => {
    setActiveTab("team");
    setTimeout(() => {
      if (tabsSectionRef.current) {
        const navbarOffset = 90;
        const targetTop =
          tabsSectionRef.current.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
      }
    }, 50);
  };

  const mockSalon = getSalonById(salonId) || getSalonById(101);
  const mockProfessionals = getProfessionalsBySalon(salonId) || getProfessionalsBySalon(101) || [];

  const apiTeamMembers = Array.isArray(prosBySalonRes?.data)
    ? prosBySalonRes.data.map((item: any) => {
      const pro = item.professional || {};
      const roleRef = pro.roleRef || {};
      const firstName = pro.firstName || "";
      const lastName = pro.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim() || pro.name || "Specialist";

      const avatarUrl =
        pro.image && pro.image.trim() !== ""
          ? pro.image
          : Array.isArray(roleRef.photos) && roleRef.photos.length > 0 && roleRef.photos[0]
            ? roleRef.photos[0]
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

      return {
        id: pro._id || item._id,
        name: fullName,
        role: roleRef.title || pro.role || "Specialist",
        avatar: avatarUrl,
        rating: roleRef.avgRating !== undefined ? roleRef.avgRating : (pro.avgRating || 5.0),
        reviewsCount: roleRef.totalReviews !== undefined ? roleRef.totalReviews : (pro.totalReviews || 0),
        location: pro.address?.city || item.salon?.address?.city || "",
      };
    })
    : [];

  const teamMembers = apiTeamMembers.length > 0 ? apiTeamMembers : mockProfessionals;

  const salon = apiSalonData
    ? {
      id: apiSalonData._id,
      name: apiSalonData.name,
      salonType: apiSalonData.businessType || "Hair & Beauty Salon",
      category: apiSalonData.businessType || "Beauty & Spa Studio",
      rating: apiSalonData.avgRating || 5.0,
      reviews: apiSalonData.totalReviews || 0,
      location: apiSalonData.address ? `${apiSalonData.address.line1 ? apiSalonData.address.line1 + ", " : ""}${apiSalonData.address.city || ""}` : mockSalon?.location || "Dhaka, Bangladesh",
      address: apiSalonData.address ? `${apiSalonData.address.line1 || ""}${apiSalonData.address.line2 ? ", " + apiSalonData.address.line2 : ""}, ${apiSalonData.address.city || ""}, ${apiSalonData.address.country || ""}` : mockSalon?.address || "",
      phone: apiSalonData.phone || mockSalon?.phone || "+880 1700-000000",
      email: apiSalonData.email || "",
      website: apiSalonData.website || "",
      instagram: apiSalonData.instagram || "",
      badge: apiSalonData.status === "active" ? "Open Today" : "Verified Salon",
      tags: [apiSalonData.businessType || "Beauty", apiSalonData.address?.city || "Salon"],
      img: apiSalonData.logo || apiSalonData.photos?.[0] || mockSalon?.img || "",
      description: apiSalonData.description || mockSalon?.description || "",
      amenities: mockSalon?.amenities || ["Free Wi-Fi", "Coffee & Tea Lounge", "Private Rooms", "Card Accepted"],
      photos: Array.isArray(apiSalonData.photos) && apiSalonData.photos.length > 0 ? apiSalonData.photos : mockSalon?.photos || [],
      createdBy: apiSalonData.createdBy,
    }
    : mockSalon;

  const [isFavorite, setIsFavorite] = useState(false);

  const apiSalonWishlistStatus =
    apiSalonData?.isWishlist ??
    apiSalonData?.salon?.isWishlist ??
    singleSalonRes?.data?.isWishlist;

  useEffect(() => {
    if (apiSalonWishlistStatus !== undefined) {
      setIsFavorite(Boolean(apiSalonWishlistStatus));
    }
  }, [apiSalonWishlistStatus]);
  const router = useRouter();

  const token = useSelector((state: { auth?: { token?: string | null } }) => state.auth?.token);
  const [addAndRemoveWishList, { isLoading: isWishlistLoading }] = useAddAndRemoveWishListMutation();

  const handleWishlistToggle = async () => {
    if (!token) {
      toast.error("Please log in to add to wishlist");
      return;
    }
    if (!salonId) return;

    try {
      const res = await addAndRemoveWishList({
        entityType: "salon",
        entity: salonId,
      }).unwrap();
      setIsFavorite(!isFavorite);
      toast.success(res?.message || "Wishlist updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update wishlist");
    }
  };

  // Structured schedule parsing
  const defaultSchedule = [
    { day: "Monday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Tuesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Wednesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Thursday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Friday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
    { day: "Saturday", openTime: "09:00", closeTime: "18:00", isAvailable: true },
    { day: "Sunday", openTime: "00:00", closeTime: "00:00", isAvailable: false },
  ];

  const scheduleList =
    Array.isArray(apiSalonData?.availability) && apiSalonData.availability.length > 0
      ? apiSalonData.availability
      : defaultSchedule;

  const currentDayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaySchedule = scheduleList.find(
    (item: any) => item.day?.toLowerCase() === currentDayName.toLowerCase()
  );

  const todayHoursSummary = todaySchedule
    ? todaySchedule.isAvailable
      ? `Today: ${formatTimeWithAMPM(todaySchedule.openTime || "09:00")} - ${formatTimeWithAMPM(todaySchedule.closeTime || "19:00")}`
      : "Today: Closed"
    : "Mon-Sat: 09:00 AM - 07:00 PM";

  if (!salon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Salon not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 select-none">
      {/* Top Navigation Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <p
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D99722]" />
            <span>Back to All Salons</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${isFavorite
                ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                : "bg-accent text-muted-foreground hover:text-foreground border-border"
                }`}
            >
              {isWishlistLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl bg-accent text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
              aria-label="Share salon page"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Business Profile Header Section (Clean layout without cover image) */}
      <section className="bg-card border-b border-border py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
                {/* Business Profile Picture / Logo Container */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#D99722]/30 shadow-md shrink-0 bg-muted">
                  <ChairImage
                    src={salon.img}
                    alt={salon.name}
                    size="lg"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#D99722]/15 text-[#D99722] font-bold text-[10px] px-3 py-1 rounded-full border border-[#D99722]/30 uppercase tracking-widest flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>{salon.salonType}</span>
                    </span>
                    <span className="bg-emerald-500/15 text-emerald-500 font-bold text-[10px] px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{salon.badge || "Verified Salon"}</span>
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    {salon.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#D99722] text-[#D99722]" />
                      <span className="font-bold text-foreground">{salon.rating}</span>
                      <span>({salon.reviews} reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{salon.address || salon.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleBookAppointmentClick}
                  className="w-full md:w-auto px-7 py-3.5 bg-[#D99722] hover:bg-[#C2841B] active:scale-95 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-border/60 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/40">
                <div className="w-9 h-9 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-foreground">Opening Hours</div>
                  <div className="text-muted-foreground text-[11px] truncate font-medium">{todayHoursSummary}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/40">
                <div className="w-9 h-9 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-foreground">Contact Salon</div>
                  <div className="text-muted-foreground text-[11px] truncate font-medium">{salon.phone || "+880 1700-000000"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/40">
                <div className="w-9 h-9 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-foreground">Team Size</div>
                  <div className="text-muted-foreground text-[11px] truncate font-medium">
                    {isProsLoading
                      ? "Loading Specialists..."
                      : `${teamMembers.length} Licensed Specialist${teamMembers.length === 1 ? "" : "s"}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Navigation Tabs */}
      <section ref={tabsSectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-border gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: "team", label: `Team Members (${teamMembers.length})` },
              { id: "about", label: "About & Operating Hours" },
              { id: "reviews", label: `Reviews (${salonReviews.length})` },
              { id: "gallery", label: `Gallery (${(salon.photos || []).length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SalonTab)}
                className={`py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${activeTab === tab.id
                  ? "border-[#D99722] text-[#D99722]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: TEAM MEMBERS / PROFESSIONALS */}
          {activeTab === "team" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-foreground">Meet the Specialists at {salon.name}</h3>
              {isProsLoading ? (
                <div className="py-8 text-center text-xs text-muted-foreground">Loading team members...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((pro: any) => (
                    <div
                      key={pro.id}
                      className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-border bg-muted">
                          <ChairImage
                            src={pro.avatar}
                            alt={pro.name}
                            size="md"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{pro.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{pro.role}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs">
                            <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722]" />
                            <span className="font-bold text-foreground">{pro.rating}</span>
                            <span className="text-muted-foreground text-[11px]">({pro.reviewsCount})</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
                        <Link
                          href={`/professionals/${pro.id}`}
                          className="py-2.5 text-center bg-accent hover:bg-accent/80 text-foreground font-semibold text-xs rounded-xl border border-border transition-colors block"
                        >
                          Profile
                        </Link>

                        <Link
                          href={`/book/1?proId=${pro.id}&salonId=${salon.id}`}
                          className="py-2.5 text-center bg-[#D99722] hover:bg-[#C2841B] text-white font-bold text-xs rounded-xl transition-colors block"
                        >
                          Book With Pro
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ABOUT & OPERATING HOURS */}
          {activeTab === "about" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in duration-200">
              <div className="md:col-span-8 space-y-6">
                <div className="bg-card rounded-2xl p-6 border border-border space-y-3 shadow-xs">
                  <h3 className="text-sm font-bold text-foreground">About {salon.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {salon.description || "A premier luxury salon offering world-class beauty, hair, and esthetic services in a tranquil, state-of-the-art environment."}
                  </p>
                </div>

                {/* Structured Weekly Operating Hours Section */}
                <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border space-y-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-border/60 pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#D99722]" />
                        <span>Weekly Operating Hours</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Standard business schedule and operating hours
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      Open Days
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {scheduleList.map((item: any, idx: number) => {
                      const isToday = item.day?.toLowerCase() === currentDayName.toLowerCase();
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${isToday
                            ? "bg-[#D99722]/10 border-[#D99722]/40 shadow-xs"
                            : item.isAvailable
                              ? "bg-accent/30 border-border"
                              : "bg-muted/40 border-border/40 opacity-60"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {item.isAvailable ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 ml-1 mr-1" />
                            )}
                            <span className="text-xs font-bold text-foreground flex items-center gap-2">
                              {item.day}
                              {isToday && (
                                <span className="text-[9px] font-extrabold text-[#D99722] bg-[#D99722]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Today
                                </span>
                              )}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-muted-foreground">
                            {item.isAvailable
                              ? `${formatTimeWithAMPM(item.openTime || "09:00")} - ${formatTimeWithAMPM(item.closeTime || "19:00")}`
                              : "Closed"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-foreground">Salon Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(salon.amenities || ["Free Wi-Fi", "Espresso & Drinks Bar", "Private Rooms", "Wheelchair Accessible", "Cards Accepted"]).map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground bg-accent/60 p-3 rounded-xl border border-border/40">
                        <CheckCircle2 className="w-4 h-4 text-[#D99722]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-6">
                <div className="bg-card rounded-2xl p-6 border border-border space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-foreground">Contact & Location</h3>
                  <div className="space-y-3.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D99722] shrink-0 mt-0.5" />
                      <span>{salon.address || salon.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D99722] shrink-0" />
                      <span>{salon.phone || "+880 1700-000000"}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#D99722] shrink-0" />
                      <span>{todayHoursSummary}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Reviews Summary Banner */}
              <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                      {salon.rating || 5.0}
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[#D99722]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(salon.rating || 5)
                                ? "fill-[#D99722]"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on {salonReviews.length || salon.reviews || 0} verified client review{salonReviews.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3.5 py-1.5 rounded-full border border-emerald-500/20 text-xs font-bold self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>98% of clients recommend this salon</span>
                </div>
              </div>

              {/* Reviews List */}
              {isReviewsLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((n) => (
                    <div key={n} className="bg-card rounded-2xl h-32 border border-border animate-pulse" />
                  ))}
                </div>
              ) : salonReviews.length > 0 ? (
                <div className="space-y-4">
                  {salonReviews.map((rev: any, idx: number) => {
                    const user = rev.user || {};
                    const reviewerName =
                      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Verified Client";
                    const userImg =
                      user.image && typeof user.image === "string" && user.image.trim() !== ""
                        ? user.image
                        : "";
                    const revRating = typeof rev.rating === "number" ? rev.rating : 5;
                    const createdAtStr = rev.createdAt
                      ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recent Visit";

                    return (
                      <div
                        key={rev._id || idx}
                        className="bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-xs space-y-3 hover:border-border/80 transition-all"
                      >
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-accent shrink-0 border border-border flex items-center justify-center">
                              {userImg ? (
                                <img
                                  src={userImg}
                                  alt={reviewerName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="font-bold text-xs bg-[#D99722]/15 text-[#D99722] w-full h-full flex items-center justify-center">
                                  {reviewerName.slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-foreground">
                                  {reviewerName}
                                </h4>
                                <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  Verified Client
                                </span>
                              </div>
                              <span className="text-[11px] text-muted-foreground">
                                {createdAtStr}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 bg-accent/60 px-2.5 py-1 rounded-full text-xs font-bold text-foreground border border-border/40">
                            <Star className="w-3.5 h-3.5 fill-[#D99722] text-[#D99722]" />
                            <span>{revRating}</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {rev.comment || "Exceptional service! Highly recommended."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-10 text-center border border-border space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto text-[#D99722]">
                    <Star className="w-6 h-6 fill-[#D99722]" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">No Reviews Yet</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Be the first client to book and review {salon.name}. Your feedback helps our community!
                  </p>
                  <Link
                    href={`/book/1?salonId=${salon.id}`}
                    className="inline-block mt-2 px-5 py-2.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Book Appointment & Review
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card rounded-2xl p-6 border border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D99722]" />
                    <span>Salon Gallery & Atmosphere</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Explore inside {salon.name}’s styling chairs, private treatment suites, and grooming areas
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-foreground border border-border/60 self-start sm:self-auto">
                  {(salon.photos || []).length} Photo{(salon.photos || []).length === 1 ? "" : "s"}
                </span>
              </div>

              {(salon.photos || []).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {salon.photos.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-muted shadow-xs hover:border-[#D99722]/50 transition-all cursor-pointer"
                    >
                      <ChairImage
                        src={url}
                        alt={`${salon.name} Photo ${idx + 1}`}
                        size="lg"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-3">
                        <span className="text-[11px] font-semibold text-white">
                          Photo {idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-10 text-center border border-border space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto text-muted-foreground">
                    <Building2 className="w-6 h-6 text-[#D99722]" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">No Photos Uploaded</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    This salon has not uploaded gallery photos yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={salon.name}
        subtitle={`${(salon as any).salonType || (salon as any).businessType || "Hair & Beauty Salon"}${salon.location ? ` • ${salon.location}` : ""}`}
        image={(salon as any).img}
      />
    </div>
  );
}
