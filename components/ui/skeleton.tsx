import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/70 dark:bg-zinc-800/70",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton for standard dashboard metrics / stat cards
 */
export function StatsSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        count === 5
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : "grid-cols-2 lg:grid-cols-4"
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border/70 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-3.5 w-28 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for data table rows
 */
export function TableSkeletonRows({
  rows = 5,
  cols = 6,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="p-4 sm:p-5 flex items-center justify-between gap-4 animate-pulse"
        >
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="space-y-2 flex-1 max-w-xs">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 flex-1 justify-around">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for list item cards (notifications, reviews, services, etc.)
 */
export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3 divide-y divide-border/60">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 sm:p-5 flex items-start gap-4">
          <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
            <Skeleton className="h-3.5 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for card grid (workspaces, chairs, salons)
 */
export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-xs space-y-4 p-4"
        >
          <Skeleton className="w-full h-48 rounded-lg" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/2 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            <Skeleton className="h-3.5 w-3/4 rounded" />
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-border">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
