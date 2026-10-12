"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, CheckCircle2, Heart, ArrowLeft, Share2, Sparkles, Building2, Star, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useAddAndRemoveWishListMutation } from "@/features/wishlist/wishlistApi";
import ShareModal from "@/components/shared/ShareModal";
import ChairImage from "@/components/shared/ChairImage";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export type DetailTabType = "services" | "about" | "portfolio" | "reviews";

interface HeaderProps {
  activeTab: DetailTabType;
  setActiveTab: (tab: DetailTabType) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  proData?: any;
}

export default function Header({
  activeTab,
  setActiveTab,
  isLiked,
  setIsLiked,
  proData,
}: HeaderProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const token = useSelector((state: { auth?: { token?: string | null } }) => state.auth?.token);
  const [addAndRemoveWishList, { isLoading: isWishlistLoading }] = useAddAndRemoveWishListMutation();
  const router = useRouter();

  const name = proData?.name || "Rahad Dev";
  const avatar =
    proData?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
  const title = proData?.title || "Master Barber & Grooming Specialist";
  const experienceYears = proData?.experienceYears
    ? `${proData.experienceYears} years experience`
    : "7 years experience";
  const rating = proData?.rating !== undefined ? proData.rating : 5.0;
  const reviewsCount = proData?.reviewsCount || 0;
  const location = proData?.location || "Springfield, Oregon";
  const startingPrice = proData?.startingPrice || 35;
  const isVerified = proData?.isVerified ?? true;
  const proId = proData?.id || proData?._id;

  const handleWishlistToggle = async () => {
    if (!token) {
      toast.error("Please log in to add to wishlist");
      return;
    }
    if (!proId) return;

    try {
      const res = await addAndRemoveWishList({
        entityType: "user",
        entity: proId,
      }).unwrap();
      setIsLiked(!isLiked);
      toast.success(res?.message || "Wishlist updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update wishlist");
    }
  };

  return (
    <>
      {/* Top Sticky Navigation Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <p
            onClick={() => router.back()}
            className="inline-flex items-center cursor-pointer gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D99722]" />
            <span>Back to Professionals</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${isLiked
                ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                : "bg-accent text-muted-foreground hover:text-foreground border-border"
                }`}
            >
              {isWishlistLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl bg-accent text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
              aria-label="Share professional profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Header Card (Clean layout matching Salon page style, without cover image) */}
      <section className="bg-card border-b border-border py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
                {/* Profile Avatar */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-border shadow-sm shrink-0 bg-muted">
                  <ChairImage
                    src={avatar}
                    alt={name}
                    size="lg"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#D99722]/15 text-[#D99722] font-bold text-[10px] px-3 py-1 rounded-full border border-[#D99722]/30 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{title}</span>
                    </span>
                    {isVerified && (
                      <span className="bg-emerald-500/15 text-emerald-500 font-bold text-[10px] px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        VERIFIED
                      </span>
                    )}
                    {proData?.isSalonOwner && (
                      <span className="bg-amber-500/15 text-amber-500 font-bold text-[10px] px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        SALON OWNER
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    {name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#D99722] text-[#D99722]" />
                      <span className="font-bold text-foreground">{rating}</span>
                      <span>({reviewsCount} reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{location}</span>
                    </div>
                    <span>•</span>
                    <span className="font-semibold text-foreground">
                      Starting from ${startingPrice}
                    </span>
                  </div>

                  {proData?.salonName && (
                    <div className="pt-1">
                      <Link
                        href={`/salons/${proData.salonId}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#D99722] hover:underline font-bold"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Associated with {proData.salonName}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href={`/book/1?proId=${proId}`}
                  className="w-full md:w-auto px-7 py-3.5 bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-bold rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-border pt-2 text-xs font-bold overflow-x-auto scrollbar-none whitespace-nowrap">
            {[
              { id: "services", label: "Services" },
              { id: "about", label: "About Specialist" },
              { id: "portfolio", label: "Portfolio Showcase" },
              { id: "reviews", label: `Reviews (${reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DetailTabType)}
                className={`py-3 transition-all border-b-2 cursor-pointer ${activeTab === tab.id
                  ? "border-[#D99722] text-[#D99722]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={name}
        subtitle={`${title}${proData?.salonName ? ` • ${proData.salonName}` : ""}`}
        image={avatar}
      />
    </>
  );
}
