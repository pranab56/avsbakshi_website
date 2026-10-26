"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header, { DetailTabType } from "@/components/professional-detail/Header";
import AboutTab from "@/components/professional-detail/AboutTab";
import ServicesTab from "@/components/professional-detail/ServicesTab";
import PortfolioTab from "@/components/professional-detail/PortfolioTab";
import ReviewsTab from "@/components/professional-detail/ReviewsTab";
import { useGetSingleProfessionalQuery } from "@/features/profesional/profesionalApi";

function ProfessionalDetailsContent({ professionalId }: { professionalId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = (searchParams.get("tab") as DetailTabType) || "services";
  const activeTab: DetailTabType = ["services", "about", "portfolio", "reviews"].includes(rawTab)
    ? rawTab
    : "services";

  const handleTabChange = (newTab: DetailTabType) => {
    router.push(`/professionals/${professionalId}?tab=${newTab}`, { scroll: false });
  };

  const [isLiked, setIsLiked] = useState(false);

  const { data: singleProRes, isLoading } = useGetSingleProfessionalQuery(
    { professionalId },
    { skip: !professionalId }
  );

  const rawItem = Array.isArray(singleProRes?.data) ? singleProRes.data[0] : singleProRes?.data;
  const proObj = rawItem?.professional || {};
  const roleRef = proObj?.roleRef || {};
  const salonObj = rawItem?.salon || {};

  const apiWishlistStatus =
    proObj?.isWishlist ??
    rawItem?.isWishlist ??
    roleRef?.isWishlist ??
    salonObj?.isWishlist;

  useEffect(() => {
    if (apiWishlistStatus !== undefined) {
      setIsLiked(Boolean(apiWishlistStatus));
    }
  }, [apiWishlistStatus]);

  const fullName =
    `${proObj.firstName || ""} ${proObj.lastName || ""}`.trim() ||
    "Professional Specialist";

  const locationStr =
    salonObj.address?.city || proObj.address?.city
      ? `${salonObj.address?.city || proObj.address?.city}${
          salonObj.address?.state || proObj.address?.state
            ? ", " + (salonObj.address?.state || proObj.address?.state)
            : ""
        }`
      : (salonObj.location || proObj.location || "");

  const proData = rawItem
    ? {
        id: proObj._id || rawItem._id || professionalId,
        name: fullName,
        title: roleRef.title || proObj.role || "Specialist",
        quote: roleRef.quote || "",
        bio: roleRef.bio || "",
        experienceYears: roleRef.experienceYears || 0,
        specialties: Array.isArray(roleRef.specialties) ? roleRef.specialties : [],
        photos: Array.isArray(roleRef.photos) ? roleRef.photos : [],
        startingPrice: roleRef.startingPriceInUSD || 0,
        reviewsCount: roleRef.totalReviews || salonObj.totalReviews || 0,
        rating: roleRef.avgRating || salonObj.avgRating || 0,
        availability: Array.isArray(salonObj.availability)
          ? salonObj.availability
          : Array.isArray(proObj.availability)
          ? proObj.availability
          : [],
        isVerified: roleRef.isVerified ?? true,
        isSalonOwner: proObj.isSalonOwner,
        avatar:
          [proObj.image, roleRef.photos?.[0], salonObj.logo].find(
            (url) => typeof url === "string" && url.trim().length > 0 && !url.includes("example.com")
          ) || "",
        location: locationStr,
        salonName: salonObj.name,
        salonId: salonObj._id,
        email: proObj.email || salonObj.email,
        phone: proObj.phone || salonObj.phone,
      }
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background py-16 px-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
        <p className="text-sm font-medium text-muted-foreground">Loading professional details...</p>
      </div>
    );
  }

  if (!proData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background py-16 px-4">
        <div className="bg-card rounded-2xl border border-border p-8 text-center max-w-md w-full space-y-3 shadow-sm">
          <p className="text-base font-bold text-foreground">No Professional Data Available</p>
          <p className="text-xs text-muted-foreground">The requested professional details could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground select-none">
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        proData={proData}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-8">
        {activeTab === "services" && <ServicesTab professionalId={professionalId} />}
        {activeTab === "about" && <AboutTab proData={proData} />}
        {activeTab === "portfolio" && <PortfolioTab proData={proData} />}
        {activeTab === "reviews" && <ReviewsTab proData={proData} />}
      </section>
    </div>
  );
}

export default function ProfessionalDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const professionalId = resolvedParams.id;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-background py-16 px-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Loading professional details...</p>
        </div>
      }
    >
      <ProfessionalDetailsContent professionalId={professionalId} />
    </Suspense>
  );
}
