"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E0D6] transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/icons/logo.png"
              alt="The Cloud Salon"
              width={180}
              height={44}
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2C2E33]">
            {/* Discover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDiscoverOpen(true)}
              onMouseLeave={() => setDiscoverOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#B78735] py-2 transition-colors cursor-pointer">
                Discover
                <ChevronDown className={`w-4 h-4 transition-transform ${discoverOpen ? 'rotate-180 text-[#B78735]' : ''}`} />
              </button>

              {discoverOpen && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-sm shadow-xl border border-[#E5E0D6] py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/discover?tab=services"
                    className="block px-4 py-2 text-sm text-[#2C2E33] hover:bg-[#F5F3EF] hover:text-[#B78735] transition-colors"
                  >
                    Services
                  </Link>
                  <Link
                    href="/discover?tab=professionals"
                    className="block px-4 py-2 text-sm text-[#2C2E33] hover:bg-[#F5F3EF] hover:text-[#B78735] transition-colors"
                  >
                    Professionals
                  </Link>
                  <Link
                    href="/discover?tab=salons"
                    className="block px-4 py-2 text-sm text-[#2C2E33] hover:bg-[#F5F3EF] hover:text-[#B78735] transition-colors"
                  >
                    Salons
                  </Link>
                  <div className="my-1 border-t border-[#E5E0D6]" />
                  <Link
                    href="/search"
                    className="block px-4 py-2 text-sm text-[#B78735] font-semibold hover:bg-[#F5F3EF] transition-colors"
                  >
                    Search All
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/for-professionals"
              className={`hover:text-[#B78735] transition-colors ${pathname === '/for-professionals' ? 'text-[#B78735] font-semibold' : ''}`}
            >
              For Professionals
            </Link>

            <Link
              href="/for-businesses"
              className={`hover:text-[#B78735] transition-colors ${pathname === '/for-businesses' ? 'text-[#B78735] font-semibold' : ''}`}
            >
              For Businesses
            </Link>

            <Link
              href="/about"
              className={`hover:text-[#B78735] transition-colors ${pathname === '/about' ? 'text-[#B78735] font-semibold' : ''}`}
            >
              About Us
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#2C2E33] hover:text-[#B78735] px-3 py-2 transition-colors"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="text-sm font-medium bg-[#E8E4DA] text-[#2C2E33] hover:bg-[#DDD8CA] px-4 py-2 rounded-sm transition-colors"
            >
              Sign Up
            </Link>

            <Link
              href="/for-professionals"
              className="text-sm font-medium bg-[#B78735] hover:bg-[#A37428] text-white px-5 py-2 rounded-sm shadow-md hover:shadow-lg transition-all"
            >
              Join as Professional
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2C2E33] hover:text-[#B78735] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E0D6] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/discover"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#E8E4DA]"
          >
            Discover Services & Salons
          </Link>
          <Link
            href="/for-professionals"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#E8E4DA]"
          >
            For Professionals
          </Link>
          <Link
            href="/for-businesses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#E8E4DA]"
          >
            For Businesses
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#E8E4DA]"
          >
            About Us
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#E8E4DA]"
          >
            FAQs
          </Link>

          <div className="pt-4 border-t border-[#E5E0D6] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-medium border border-[#E5E0D6] rounded-sm hover:bg-white"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-medium bg-[#E8E4DA] rounded-sm"
            >
              Sign Up
            </Link>
            <Link
              href="/for-professionals"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-medium bg-[#B78735] text-white rounded-sm shadow"
            >
              Join as Professional
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
