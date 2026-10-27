"use client";

import Image from "next/image";
import { Star, CheckCircle2, Loader2, MessageSquare, Award, ThumbsUp } from "lucide-react";
import { useGetMyReviewsQuery } from "@/features/review/reviewApi";
import { ListSkeleton } from "@/components/ui/skeleton";

export default function ProfessionalReviewsPage() {
  const { data: reviewsResponse, isLoading } = useGetMyReviewsQuery({});

  const reviewsList: any[] = Array.isArray(reviewsResponse?.data)
    ? reviewsResponse.data
    : Array.isArray(reviewsResponse)
      ? reviewsResponse
      : [];

  const totalReviews = reviewsList.length;

  const avgRatingNum = totalReviews > 0
    ? reviewsList.reduce((acc: number, r: any) => acc + (Number(r.rating) || 0), 0) / totalReviews
    : 0;

  const avgRating = totalReviews > 0 ? avgRatingNum.toFixed(1) : "0.0";

  // Dynamic breakdown for stars 5 to 1
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach((r: any) => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratingCounts[stars] || 0;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, percentage, count };
  });

  const positiveFeedbackPct = totalReviews > 0
    ? Math.round(((ratingCounts[5] + ratingCounts[4]) / totalReviews) * 100)
    : 0;

  const isValidAvatar = (url: any) =>
    typeof url === "string" &&
    url.trim().length > 0 &&
    !url.includes("example.com");

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          Reviews
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          {totalReviews} review{totalReviews === 1 ? "" : "s"} · {avgRating} average rating
        </p>
      </div>

      {/* Main Overall Rating Card */}
      <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Rating Overview */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start space-y-2 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-8">
            <div className="font-serif italic font-normal text-5xl sm:text-6xl text-foreground leading-none">
              {avgRating}
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isFilled = starVal <= Math.round(avgRatingNum);
                return (
                  <Star
                    key={starVal}
                    className={`w-5 h-5 ${isFilled
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/30"
                      }`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground font-normal pt-1">
              Based on {totalReviews} client review{totalReviews === 1 ? "" : "s"}
            </p>
          </div>
          {/* Right Progress Bars */}
          <div className="md:col-span-8 space-y-2.5">
            {ratingBreakdown.map((item) => (
              <div
                key={item.stars}
                className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1 w-8 shrink-0 font-medium">
                  <span>{item.stars}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>

                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <span className="w-12 text-right font-medium text-foreground shrink-0 text-xs">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <div className="font-serif italic text-3xl font-normal text-foreground">
              {avgRating}
            </div>
            <Award className="w-5 h-5 text-primary opacity-80" />
          </div>
          <p className="text-xs text-muted-foreground font-normal">Average Rating</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <div className="font-serif italic text-3xl font-normal text-foreground">
              {ratingCounts[5]}
            </div>
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground font-normal">5-Star Reviews</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 text-center sm:text-left shadow-2xs hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <div className="font-serif italic text-3xl font-normal text-foreground">
              {positiveFeedbackPct}%
            </div>
            <ThumbsUp className="w-5 h-5 text-emerald-500 opacity-80" />
          </div>
          <p className="text-xs text-muted-foreground font-normal">Positive Feedback (4★+)</p>
        </div>
      </div>

      {/* Reviews Stacked List */}
      <div className="space-y-4 pt-2">
        {isLoading ? (
          <div className="bg-card border border-border rounded-lg p-2">
            <ListSkeleton count={3} />
          </div>
        ) : reviewsList.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-foreground">No Reviews Yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              When clients book your services and leave feedback, their ratings and reviews will be displayed here.
            </p>
          </div>
        ) : (
          reviewsList.map((review: any, idx: number) => {
            const user = review.user || {};
            const clientName =
              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              user.name ||
              "Verified Client";

            const entity = review.entity || {};
            let serviceName = review.service || "";
            if (!serviceName) {
              if (review.entityType === "salon" && entity.name) {
                serviceName = entity.businessType
                  ? `${entity.name} • ${entity.businessType}`
                  : entity.name;
              } else if (entity.name) {
                serviceName = entity.name;
              } else {
                serviceName = "Salon Service";
              }
            }

            const numericRating = Math.min(
              5,
              Math.max(1, Math.round(Number(review.rating) || 5))
            );

            const dateStr = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "";

            const avatarUrl = isValidAvatar(user.image) ? user.image : "";

            return (
              <div
                key={review._id || `rev-${idx}`}
                className="bg-card border border-border rounded-lg p-6 space-y-3.5 shadow-xs hover:border-primary/40 transition-colors"
              >
                {/* Header: User & Rating & Date */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 border border-border flex items-center justify-center">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={clientName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="font-serif italic font-bold text-primary text-base">
                          {clientName[0]?.toUpperCase() || "C"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-foreground">
                          {clientName}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          VERIFIED
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(numericRating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Date & Service */}
                  <div className="text-right shrink-0">
                    {dateStr && (
                      <span className="text-xs text-muted-foreground block font-normal">
                        {dateStr}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-primary block mt-0.5">
                      {serviceName}
                    </span>
                  </div>
                </div>

                {/* Review Comment Text */}
                {review.comment && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {review.comment}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
