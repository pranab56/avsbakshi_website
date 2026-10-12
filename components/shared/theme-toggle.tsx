"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function createFallbackCircleReveal(
  x: number,
  y: number,
  endRadius: number,
  nextTheme: string,
  onComplete: () => void
) {
  if (typeof document === "undefined") {
    onComplete();
    return;
  }

  const overlay = document.createElement("div");
  const isDark = nextTheme === "dark";
  const bgColor = isDark ? "#121214" : "#F5F3EF";

  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${bgColor};
    z-index: 999999;
    pointer-events: none;
    clip-path: circle(0px at ${x}px ${y}px);
    transition: clip-path 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-out 500ms;
    will-change: clip-path;
  `;

  document.body.appendChild(overlay);

  // Force reflow
  void overlay.offsetWidth;

  // Trigger clip-path reveal
  overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;

  // Switch actual theme halfway through expansion
  setTimeout(() => {
    onComplete();
  }, 220);

  // Fade out & clean up
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 200);
  }, 600);
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Get click position or fallback to center of button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX && e.clientX > 0 ? e.clientX : rect.left + rect.width / 2;
    const y = e.clientY && e.clientY > 0 ? e.clientY : rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (typeof document !== "undefined") {
      document.documentElement.classList.add("theme-transitioning");
    }

    const isViewTransitionSupported =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isViewTransitionSupported) {
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        const anim = document.documentElement.animate(
          { clipPath },
          {
            duration: 650,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        anim.onfinish = () => {
          document.documentElement.classList.remove("theme-transitioning");
        };
      });

      transition.finished.catch(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    } else {
      createFallbackCircleReveal(x, y, endRadius, nextTheme, () => {
        setTheme(nextTheme);
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("theme-transitioning");
        }
      });
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-10 w-10 rounded-sm border border-border bg-card text-foreground transition-all shrink-0",
          className
        )}
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.15rem] w-[1.15rem] opacity-70" />
      </Button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group relative h-10 w-10 rounded-sm border border-border bg-card hover:bg-accent hover:text-accent-foreground text-foreground shadow-2xs hover:shadow-xs transition-all duration-300 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center overflow-hidden shrink-0",
        className
      )}
      aria-label="Toggle theme"
      title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Sun icon — shown in dark mode */}
      <Sun
        className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ease-out text-amber-500 group-hover:scale-110
          ${resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
      {/* Moon icon — shown in light mode */}
      <Moon
        className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ease-out text-amber-600 group-hover:scale-110
          ${resolvedTheme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;


