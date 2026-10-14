"use client";

import { useState, useEffect } from "react";
import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChairImageProps {
  src?: string | null;
  alt?: string;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  fallbackIcon?: React.ReactNode;
}

export default function ChairImage({
  src,
  alt = "Salon Space",
  className = "w-full h-full object-cover",
  containerClassName,
  iconClassName,
  showLabel = false,
  size = "md",
  fallbackIcon,
}: ChairImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const trimmed = typeof src === "string" ? src.trim() : "";
  const isValid =
    Boolean(trimmed) &&
    trimmed.length > 0 &&
    !trimmed.includes("example.com") &&
    trimmed !== "undefined" &&
    trimmed !== "null";

  // Reset error & loaded status when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [trimmed]);

  const isSmall = size === "sm";
  const isLarge = size === "lg";

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden select-none bg-secondary/80 dark:bg-accent/60",
        containerClassName
      )}
    >
      {/* Fallback with Armchair icon */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-muted-foreground pointer-events-none">
        <div
          className={cn(
            "rounded-full bg-background/90 shadow-xs flex items-center justify-center border border-border/70 shrink-0",
            isSmall
              ? "w-7 h-7"
              : isLarge
                ? "w-12 h-12 sm:w-14 sm:h-14"
                : "w-9 h-9 sm:w-10 sm:h-10"
          )}
        >
          {fallbackIcon || (
            <Armchair
              className={cn(
                "text-[#D99722]",
                isSmall
                  ? "w-3.5 h-3.5"
                  : isLarge
                    ? "w-6 h-6 sm:w-7 sm:h-7"
                    : "w-4.5 h-4.5 sm:w-5 sm:h-5",
                iconClassName
              )}
            />
          )}
        </div>
        {showLabel && !isSmall && (
          <span className="text-[10px] font-medium text-muted-foreground/80 tracking-wide mt-1.5 hidden sm:block">
            Salon Space
          </span>
        )}
      </div>

      {/* Actual image rendered over fallback only if valid & not errored */}
      {isValid && !hasError && (
        <img
          src={trimmed}
          alt={alt}
          ref={(el) => {
            if (el && el.complete) {
              if (el.naturalWidth === 0) {
                setHasError(true);
              } else {
                setIsLoaded(true);
              }
            }
          }}
          className={cn(
            "relative z-[1] w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
