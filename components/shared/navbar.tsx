"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Compass, Briefcase, Building2, HelpCircle, Info, FileText, Globe, User, Scissors } from "lucide-react";
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
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return "en";
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (code: string) => {
    if (typeof window !== "undefined" && window.__applyTranslate) {
      window.__applyTranslate(code);
      setCurrentLangCode(code);
    }
  };

  const isHome = pathname === "/";
  const isExpandedLogo = isHome && !isScrolled;

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
    <header className="sticky top-0 z-50 bg-white dark:bg-[#121214] border-b border-border/20 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo with Smooth Scroll & Route Transition */}
          <Link
            href="/"
            className={`relative z-50 flex items-center shrink-0 group transition-all duration-300 ease-in-out ${isExpandedLogo ? "-mb-6 sm:-mb-8 lg:-mb-10 top-1" : "mb-0 top-0"
              }`}
          >
            <Image
              src="/icons/Light_Mode.png"
              alt="The Cloud Salon"
              width={1000}
              height={1000}
              className={`w-auto block dark:hidden object-contain transition-all duration-300 ease-in-out group-hover:scale-105 ${isExpandedLogo ? "h-16 sm:h-20 lg:h-24" : "h-9 sm:h-10"
                }`}
              priority
            />
            <Image
              src="/icons/Dark_Mode.png"
              alt="The Cloud Salon"
              width={1000}
              height={1000}
              className={`w-auto hidden dark:block object-contain transition-all duration-300 ease-in-out group-hover:scale-105 ${isExpandedLogo ? "h-16 sm:h-20 lg:h-24" : "h-9 sm:h-10"
                }`}
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-muted-foreground">
            {/* Home Link */}
            <Link
              href="/"
              className={`group relative py-2 transition-colors ${pathname === "/"
                  ? "text-foreground font-semibold"
                  : "hover:text-foreground"
                }`}
            >
              <span>Home</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group/dropdown py-2"
              onMouseEnter={() => setDiscoverOpen(true)}
              onMouseLeave={() => setDiscoverOpen(false)}
            >
              <button
                className={`group relative flex items-center gap-1 transition-colors cursor-pointer ${isDiscoverActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${discoverOpen ? "rotate-180 text-primary" : ""
                    }`}
                />
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isDiscoverActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </button>

              {discoverOpen && (
                <div className="absolute top-full left-0 w-48 bg-popover rounded-sm border border-border animate-in fade-in slide-in-from-top-2 duration-150 text-popover-foreground z-50">
                  <Link
                    href="/discover?tab=services"
                    className="block px-4 py-2 text-xs text-foreground hover:bg-accent transition-colors"
                  >
                    All Services
                  </Link>
                  <Link
                    href="/discover?tab=professionals"
                    className="block px-4 py-2 text-xs text-foreground hover:bg-accent transition-colors"
                  >
                    Top Professionals
                  </Link>
                  <Link
                    href="/discover?tab=salons"
                    className="block px-4 py-2 text-xs text-foreground hover:bg-accent transition-colors"
                  >
                    Featured Salons
                  </Link>
                </div>
              )}
            </div>

            {/* Professionals */}
            <Link
              href="/for-professionals"
              className={`group relative py-2 transition-colors ${isProActive ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>Professionals</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isProActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* Salons */}
            <Link
              href="/discover?tab=salons"
              className={`group relative py-2 transition-colors ${pathname.includes("tab=salons") ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>Salons</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${pathname.includes("tab=salons") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* How it Works */}
            <Link
              href="/how-it-works"
              className={`group relative py-2 transition-colors ${isHowItWorksActive ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>How it Works</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isHowItWorksActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className={`group relative py-2 transition-colors ${isAboutActive ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isAboutActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle in Card Box */}
            <div className="p-1 rounded-sm bg-card">
              <ThemeToggle />
            </div>

            {/* Language Selector Combobox */}
            <Combobox
              options={languageOptions}
              value={currentLangCode}
              onChange={changeLanguage}
              triggerClassName="h-10 px-3 rounded-sm border-border bg-card hover:bg-accent text-xs font-semibold text-foreground shadow-2xs"
              align="end"
            />

            {/* Get Started Gold Dropdown CTA */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSignUpOpen(!signUpOpen)}
                className="h-10 px-4 rounded-sm bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 relative z-50"
              >
                <span>Get Started</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${signUpOpen ? "rotate-180" : ""}`} />
              </button>

              {signUpOpen && (
                <>
                  {/* Click outside backdrop */}
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setSignUpOpen(false)}
                  />

                  <div className="absolute top-full right-0 w-64 bg-popover rounded-lg shadow-2xl border border-border p-2 animate-in fade-in slide-in-from-top-2 duration-150 text-popover-foreground z-50 mt-1.5">
                    <div className="px-3 py-1.5 text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">
                      Create an account as
                    </div>

                    <Link
                      href="/register?role=customer"
                      onClick={() => setSignUpOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-accent hover:text-primary transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">Customer</div>
                        <div className="text-[11px] text-muted-foreground">Book services & appointments</div>
                      </div>
                    </Link>

                    <Link
                      href="/register?role=professional"
                      onClick={() => setSignUpOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-accent hover:text-primary transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                        <Scissors className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">Professional</div>
                        <div className="text-[11px] text-muted-foreground">Offer skills & gain clients</div>
                      </div>
                    </Link>

                    <Link
                      href="/register?role=business"
                      onClick={() => setSignUpOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-accent hover:text-primary transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">Business / Salon Owner</div>
                        <div className="text-[11px] text-muted-foreground">Manage your salon business</div>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isDiscoverActive
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isProActive
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isBusinessActive
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isHowItWorksActive
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isAboutActive
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isFaqActive
                ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                : "text-foreground hover:bg-accent/60"
                }`}
            >
              <HelpCircle className={`w-5 h-5 ${isFaqActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>FAQs</span>
            </Link>

            {/* Mobile Sign Up As Options */}
            <div className="pt-3 border-t border-border space-y-2">
              <div className="px-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Sign Up As
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/register?role=customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50 text-foreground text-xs font-semibold hover:bg-accent"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Customer (Book Services)</span>
                </Link>
                <Link
                  href="/register?role=professional"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50 text-foreground text-xs font-semibold hover:bg-accent"
                >
                  <Scissors className="w-4 h-4 text-primary" />
                  <span>Professional (Offer Services)</span>
                </Link>
                <Link
                  href="/register?role=business"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50 text-foreground text-xs font-semibold hover:bg-accent"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Business / Salon Owner</span>
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  href="/login"
                  variant="outline"
                  fullWidth
                  size="md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}



