"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Compass, Briefcase, Building2, HelpCircle, Info, FileText, Globe, User, Scissors, ChevronRight, Sparkles, Grid, LayoutDashboard, Calendar, Settings, Heart, LogOut } from "lucide-react";
import Button from "./Button";
import ThemeToggle from "./theme-toggle";
import { Combobox } from "@/components/ui/combobox";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/features/auth/authSlice";
import { Loader2 } from "lucide-react";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);

  const { data: profileResponse, isLoading: isProfileLoading, isFetching: isProfileFetching } = useGetMyProfileQuery(undefined, { skip: !token });
  const profileData = profileResponse?.data;
  const currentUser = profileData;
  const userRole = currentUser?.role || user?.role;

  const userImage = typeof currentUser?.image === "string" && currentUser.image.trim().length > 0 ? currentUser.image : null;
  const displayName =
    `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim() ||
    currentUser?.name ||
    currentUser?.email ||
    "";
  const userInitial = displayName ? displayName[0].toUpperCase() : "";

  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && Boolean(token);

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    setShowLogoutConfirm(false);
    dispatch(logout());
    toast.success("Successfully logged out.");
    window.location.href = "/api/auth/logout";
  };
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

  const isProfessionalsActive =
    pathname === "/professionals" ||
    pathname.startsWith("/professionals/") ||
    pathname.startsWith("/book/");
  const isSalonsActive =
    pathname === "/salons" ||
    pathname.startsWith("/salons/");
  const isServicesActive =
    pathname === "/services" ||
    pathname.startsWith("/services/");
  const isDiscoverActive =
    pathname === "/discover" ||
    pathname.startsWith("/discover/") ||
    pathname.startsWith("/search");
  const isProActive = pathname === "/for-professionals" || pathname.startsWith("/for-professionals/");
  const isBusinessActive = pathname === "/for-businesses" || pathname.startsWith("/for-businesses/");
  const isHowItWorksActive = pathname === "/how-it-works" || pathname.startsWith("/how-it-works/");
  const isAboutActive = pathname === "/about" || pathname.startsWith("/about/");
  const isFaqActive = pathname === "/faq" || pathname.startsWith("/faq/");

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

            {/* Services Link */}
            <Link
              href="/services"
              className={`group relative py-2 transition-colors ${isServicesActive
                ? "text-foreground font-semibold"
                : "hover:text-foreground"
                }`}
            >
              <span>Services</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isServicesActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* Professionals */}
            <Link
              href="/professionals"
              className={`group relative py-2 transition-colors ${isProfessionalsActive ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>Professionals</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isProfessionalsActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>

            {/* Salons */}
            <Link
              href="/salons"
              className={`group relative py-2 transition-colors ${isSalonsActive ? "text-foreground font-semibold" : "hover:text-foreground"
                }`}
            >
              <span>Salons</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#D99722] rounded-full transition-all duration-300 ease-out ${isSalonsActive ? "w-full" : "w-0 group-hover:w-full"
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
            {/* Theme Toggle */}
            <ThemeToggle className="h-10 w-10 rounded-sm border-border bg-card hover:bg-accent shadow-2xs shrink-0" />

            {/* Language Selector Combobox */}
            <Combobox
              options={languageOptions}
              value={currentLangCode}
              onChange={changeLanguage}
              triggerClassName="h-10 px-3 rounded-sm border-border bg-card hover:bg-accent text-xs font-semibold text-foreground shadow-2xs"
              labelClassName="text-xs font-semibold"
              align="end"
            />

            {/* Desktop Actions */}
            {!mounted || (token && (isProfileLoading || isProfileFetching || !profileData)) ? (
              <div className="h-10 px-3 rounded-sm bg-card border border-border/80 shadow-2xs flex items-center gap-2 animate-pulse w-32 shrink-0">
                <div className="w-6 h-6 rounded-md bg-muted/80 shrink-0" />
                <div className="h-3.5 w-16 bg-muted/80 rounded-sm flex-1" />
              </div>
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-10 px-3 rounded-sm bg-card border border-border hover:bg-accent hover:border-primary/40 text-foreground text-xs font-semibold shadow-2xs flex items-center gap-2 cursor-pointer transition-all active:scale-95 relative z-50"
                >
                  <div className="w-6 h-6 rounded-md bg-[#D99722] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs overflow-hidden relative">
                    {userImage ? (
                      <Image src={userImage} alt={displayName} fill className="object-cover" unoptimized />
                    ) : userInitial ? (
                      userInitial
                    ) : (
                      <User className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <span className="max-w-[120px] truncate font-bold text-xs">
                    {displayName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setProfileOpen(false)}
                    />

                    <div className="absolute top-full right-0 w-64 bg-popover rounded-xl shadow-2xl border border-border p-2 animate-in fade-in slide-in-from-top-2 duration-150 text-popover-foreground z-50 mt-1.5 divide-y divide-border/60">
                      {/* User Header */}
                      <div className="px-3 py-2.5 space-y-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#D99722] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs overflow-hidden relative">
                            {userImage ? (
                              <Image src={userImage} alt={displayName} fill className="object-cover" unoptimized />
                            ) : userInitial ? (
                              userInitial
                            ) : (
                              <User className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-foreground truncate">
                              {displayName}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {currentUser?.email || ''}
                            </p>
                          </div>
                        </div>
                        {currentUser?.role && (
                          <div className="pt-1">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D99722]/15 text-[#D99722] capitalize border border-[#D99722]/20">
                              {currentUser.role}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Navigation Links */}
                      <div className="py-1.5 space-y-0.5">
                        {userRole === 'professional' ? (
                          <>
                            <Link
                              href="/professional/dashboard"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                              <span>My Dashboard</span>
                            </Link>
                            <Link
                              href="/professional/bookings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Appointments</span>
                            </Link>
                            <Link
                              href="/professional/settings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Settings className="w-4 h-4 text-muted-foreground" />
                              <span>Settings</span>
                            </Link>
                          </>
                        ) : userRole === 'business' ? (
                          <>
                            <Link
                              href="/business/dashboard"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                              <span>Business Dashboard</span>
                            </Link>
                            <Link
                              href="/business/business-profile"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span>Salon Profile</span>
                            </Link>
                            <Link
                              href="/business/settings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Settings className="w-4 h-4 text-muted-foreground" />
                              <span>Settings</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/customer/overview"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                              <span>My Account</span>
                            </Link>
                            <Link
                              href="/customer/bookings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>My Bookings</span>
                            </Link>
                            <Link
                              href="/customer/favorites"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Heart className="w-4 h-4 text-muted-foreground" />
                              <span>Favorites</span>
                            </Link>
                            <Link
                              href="/customer/settings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-accent hover:text-primary transition-colors"
                            >
                              <Settings className="w-4 h-4 text-muted-foreground" />
                              <span>Settings</span>
                            </Link>
                          </>
                        )}
                      </div>

                      {/* Log Out */}
                      <div className="pt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  href="/login"
                  className="h-10 px-4 rounded-sm border border-border bg-card hover:bg-accent hover:text-[#D99722] text-foreground text-xs font-semibold shadow-2xs flex items-center justify-center cursor-pointer transition-all active:scale-95 shrink-0 whitespace-nowrap"
                >
                  Login
                </Link>

                {/* Get Started Gold Dropdown CTA */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setSignUpOpen(!signUpOpen)}
                    className="h-10 px-4 rounded-sm bg-[#D99722] hover:bg-[#C2841B] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 relative z-50 whitespace-nowrap shrink-0"
                  >
                    <span className="whitespace-nowrap">Get Started</span>
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${signUpOpen ? "rotate-180" : ""}`} />
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
                          <div className="text-[11px] text-muted-foreground">Offer skills & manage business</div>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
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
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isServicesActive
                ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                : "text-foreground hover:bg-accent/60"
                }`}
            >
              <Sparkles className={`w-5 h-5 ${isServicesActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>Services</span>
            </Link>

            <Link
              href="/professionals"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isProfessionalsActive
                ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                : "text-foreground hover:bg-accent/60"
                }`}
            >
              <Scissors className={`w-5 h-5 ${isProfessionalsActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>Professionals</span>
            </Link>

            <Link
              href="/salons"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${isSalonsActive
                ? "bg-accent text-primary font-semibold border-l-4 border-primary shadow-xs"
                : "text-foreground hover:bg-accent/60"
                }`}
            >
              <Building2 className={`w-5 h-5 ${isSalonsActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>Salons</span>
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

            {/* Mobile Sign Up / Account Options */}
            <div className="pt-3 border-t border-border space-y-2">
              {!mounted || (token && (isProfileLoading || isProfileFetching || !profileData)) ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/60 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-24 bg-muted rounded" />
                    <div className="h-3 w-32 bg-muted rounded" />
                  </div>
                </div>
              ) : isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/40 border border-border/60">
                    <div className="w-10 h-10 rounded-xl bg-[#D99722] text-white flex items-center justify-center font-bold text-base shrink-0 overflow-hidden relative">
                      {userImage ? (
                        <Image src={userImage} alt={displayName} fill className="object-cover" unoptimized />
                      ) : userInitial ? (
                        userInitial
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {currentUser?.email || ''}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <Link
                      href={user?.role === 'professional' ? '/professional/dashboard' : user?.role === 'business' ? '/business/dashboard' : '/customer/overview'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-accent/50 text-foreground text-xs font-semibold hover:bg-accent"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      <span>Dashboard & Account</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="pb-1">
                    <Button
                      href="/login"
                      variant="outline"
                      fullWidth
                      size="md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </div>

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
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md bg-popover border border-border text-popover-foreground p-6 rounded-xl">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-bold text-xl text-foreground">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to log out of your account? You will need to log in again to access your dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-accent text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLogoutConfirm(false);
                handleLogout();
              }}
              className="px-4 py-2.5 rounded-lg bg-[#E54D42] hover:bg-[#D43B30] text-white text-sm font-medium transition-colors cursor-pointer shadow-sm shadow-[#E54D42]/20"
            >
              Log out
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}



