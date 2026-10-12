"use client";

import { Star, MessageSquare } from "lucide-react";

interface ReviewsTabProps {
  proData?: any;
}

export default function ReviewsTab({ proData }: ReviewsTabProps) {
  const rating = proData?.rating !== undefined ? proData.rating : 5.0;
  const reviewsCount = proData?.reviewsCount !== undefined ? proData.reviewsCount : 0;
  const reviewsList = Array.isArray(proData?.reviews) ? proData.reviews : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Overview Stat Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-border pb-6">
          <div className="text-center sm:text-left">
            <h2 className="text-5xl font-extrabold text-foreground">{rating > 0 ? rating.toFixed(1) : "0.0"}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-1 my-1 text-amber-500">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <p className="text-xs text-muted-foreground">{reviewsCount} verified reviews</p>
          </div>

          <div className="flex-1 w-full space-y-1.5 text-xs text-muted-foreground">
            {[
              { star: "5 ★", pct: reviewsCount > 0 ? "80%" : "0%" },
              { star: "4 ★", pct: reviewsCount > 0 ? "15%" : "0%" },
              { star: "3 ★", pct: reviewsCount > 0 ? "5%" : "0%" },
              { star: "2 ★", pct: reviewsCount > 0 ? "0%" : "0%" },
              { star: "1 ★", pct: reviewsCount > 0 ? "0%" : "0%" },
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 text-right text-muted-foreground font-medium">{bar.star}</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: bar.pct }} />
                </div>
                <span className="w-8 text-muted-foreground text-right">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List or Empty State */}
      {reviewsList.length === 0 ? (
        <div className="bg-card rounded-2xl p-10 text-center border border-border space-y-3">
          <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-base font-bold text-foreground">No Reviews Yet</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            This professional hasn&apos;t received any client reviews yet. Book an appointment to be among the first to leave feedback!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewsList.map((rev: any, idx: number) => (
            <div key={idx} className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{rev.name || "Client"}</span>
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                    Verified
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">{rev.date || "Recent"}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="text-xs text-foreground font-medium ml-1">{rev.service || "Service"}</span>
              </div>

              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                {rev.text || rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
