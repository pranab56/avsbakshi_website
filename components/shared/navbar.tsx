"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X, Compass, Briefcase, Building2, HelpCircle, Info, FileText, Globe } from "lucide-react";
import Button from "./Button";
import ThemeToggle from "./theme-toggle";
import { Combobox } from "@/components/ui/combobox";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return "en";
  });

  const changeLanguage = (code: string) => {
    if (typeof window !== "undefined" && window.__applyTranslate) {
      window.__applyTranslate(code);
      setCurrentLangCode(code);
    }
  };

  const isDiscoverActive =
    pathname === "/discover" ||
    pathname.startsWith("/discover") ||
    pathname.startsWith("/search");
  const isProActive = pathname === "/for-professionals";
  const isBusinessActive = pathname === "/for-businesses";
  const isHowItWorksActive = pathname === "/how-it-works";
  const isAboutActive = pathname === "/about";
  const isFaqActive = pathname === "/faq";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            {/* Light Mode Logo — normal display */}
            <Image
              src="/icons/logo.png"
              alt="The Cloud Salon"
              width={180}
              height={44}
              className="h-7 xs:h-8 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform block dark:hidden"
              priority
            />
            {/* Dark Mode Logo — use brightness invert to make white background disappear */}
            <Image
              src="/icons/logo.png"
              alt="The Cloud Salon"
              width={180}
              height={44}
              className="h-7 xs:h-8 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform hidden dark:block"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Discover Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDiscoverOpen(true)}
              onMouseLeave={() => setDiscoverOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1 py-2 transition-colors cursor-pointer hover:text-primary ${
                  isDiscoverActive
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                <span>Discover</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    discoverOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
                {/* Animated Line (Start -> End) */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                    isDiscoverActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {discoverOpen && (
                <div className="absolute top-full left-0 w-48 bg-popover rounded-xl shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2 duration-150 text-popover-foreground">
                  <Link
                    href="/discover?tab=services"
                    className="relative group/item block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span>Services</span>
                    <span className="absolute bottom-1 left-4 h-[1.5px] bg-primary w-0 transition-all duration-300 ease-out group-hover/item:w-[calc(100%-2rem)]" />
                  </Link>
                  <Link
                    href="/discover?tab=professionals"
                    className="relative group/item block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span>Professionals</span>
                    <span className="absolute bottom-1 left-4 h-[1.5px] bg-primary w-0 transition-all duration-300 ease-out group-hover/item:w-[calc(100%-2rem)]" />
                  </Link>
                  <Link
                    href="/discover?tab=salons"
                    className="relative group/item block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span>Salons</span>
                    <span className="absolute bottom-1 left-4 h-[1.5px] bg-primary w-0 transition-all duration-300 ease-out group-hover/item:w-[calc(100%-2rem)]" />
                  </Link>
                  <div className="my-1 border-t border-border" />
                  <Link
                    href="/search"
                    className="relative group/item block px-4 py-2 text-sm text-primary font-semibold hover:bg-accent transition-colors"
                  >
                    <span>Search All</span>
                    <span className="absolute bottom-1 left-4 h-[1.5px] bg-primary w-0 transition-all duration-300 ease-out group-hover/item:w-[calc(100%-2rem)]" />
                  </Link>
                </div>
              )}
            </div>

            {/* For Professionals */}
            <Link
              href="/for-professionals"
              className={`relative group py-2 transition-colors cursor-pointer ${
                isProActive
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <span>For Professionals</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isProActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* For Businesses */}
            <Link
              href="/for-businesses"
              className={`relative group py-2 transition-colors cursor-pointer ${
                isBusinessActive
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <span>For Businesses</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isBusinessActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* How it Works */}
            <Link
              href="/how-it-works"
              className={`relative group py-2 transition-colors cursor-pointer ${
                isHowItWorksActive
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <span>How it Works</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isHowItWorksActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className={`relative group py-2 transition-colors cursor-pointer ${
                isAboutActive
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isAboutActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {/* Language Selector Combobox */}
            <Combobox
              options={languageOptions}
              value={currentLangCode}
              onChange={changeLanguage}
              prefix={<Globe className="w-3.5 h-3.5 text-primary shrink-0" />}
              triggerClassName="h-9 px-3 rounded-lg border-border bg-card hover:bg-accent text-xs font-semibold text-foreground shadow-2xs"
              align="end"
            />

            <Button href="/login" variant="ghost" size="sm">
              Log In
            </Button>

            <Button href="/register" variant="secondary" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button & Mobile Language Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Combobox
              options={[
                { value: "en", label: "EN" },
                { value: "es", label: "ES" },
              ]}
              value={currentLangCode}
              onChange={changeLanguage}
              prefix={<Globe className="w-3.5 h-3.5 text-primary shrink-0" />}
              triggerClassName="h-8 px-2 rounded-lg border-border bg-card hover:bg-accent text-xs font-semibold text-foreground"
              align="end"
            />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-foreground hover:text-primary hover:bg-accent transition-all focus:outline-none cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 transition-transform duration-200 rotate-90" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile App Sheet Experience */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 top-16 sm:top-20 bg-black/60 backdrop-blur-xs z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Sheet Container */}
          <div className="relative z-50 md:hidden bg-background border-b border-border shadow-2xl px-4 sm:px-5 pt-3 pb-8 space-y-2.5 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-6 duration-300 ease-out">
            {/* Sheet Handle Indicator */}
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-3" />

            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isDiscoverActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <Compass className={`w-5 h-5 ${isDiscoverActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>Discover Services & Salons</span>
            </Link>

            <Link
              href="/for-professionals"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isProActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <Briefcase className={`w-5 h-5 ${isProActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>For Professionals</span>
            </Link>

            <Link
              href="/for-businesses"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isBusinessActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <Building2 className={`w-5 h-5 ${isBusinessActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>For Businesses</span>
            </Link>

            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isHowItWorksActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <FileText className={`w-5 h-5 ${isHowItWorksActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>How it Works</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isAboutActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <Info className={`w-5 h-5 ${isAboutActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>About Us</span>
            </Link>

            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                isFaqActive
                  ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                  : "text-foreground hover:bg-accent/60"
              }`}
            >
              <HelpCircle className={`w-5 h-5 ${isFaqActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>FAQs</span>
            </Link>

            {/* Bottom App Actions */}
            <div className="pt-4 border-t border-border grid grid-cols-2 gap-3">
              <Button
                href="/login"
                variant="outline"
                fullWidth
                size="md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Button>
              <Button
                href="/register"
                variant="primary"
                fullWidth
                size="md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}



