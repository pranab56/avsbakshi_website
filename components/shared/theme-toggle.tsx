"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`relative h-9 w-9 rounded-full border border-border bg-card/50 text-foreground transition-all ${className || ""}`}
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.1rem] w-[1.1rem] opacity-70" />
      </Button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-9 w-9 rounded-full border border-border bg-card/80 hover:bg-accent hover:text-accent-foreground text-foreground shadow-xs transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring flex items-center justify-center ${className || ""}`}
      aria-label="Toggle theme"
      title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Sun icon — shown in dark mode */}
      <Sun
        className={`absolute h-[1.1rem] w-[1.1rem] transition-all duration-300 text-amber-500
          ${resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
      {/* Moon icon — shown in light mode */}
      <Moon
        className={`absolute h-[1.1rem] w-[1.1rem] transition-all duration-300 text-amber-600
          ${resolvedTheme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;
