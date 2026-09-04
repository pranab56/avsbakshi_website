"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#18181A] text-white pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">
          {/* Column 1: Product */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              Product
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/discover" className="text-zinc-400 hover:text-white transition-colors">
                Discover
              </Link>
              <Link href="/search" className="text-zinc-400 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/book/1" className="text-zinc-400 hover:text-white transition-colors">
                Bookings
              </Link>
            </div>
          </div>

          {/* Column 2: For Professionals */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              For Professionals
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/for-professionals" className="text-zinc-400 hover:text-white transition-colors">
                Join as Professional
              </Link>
              <Link href="/for-professionals#features" className="text-zinc-400 hover:text-white transition-colors">
                Professional Features
              </Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                Resources
              </Link>
            </div>
          </div>

          {/* Column 3: For Businesses */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              For Businesses
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/for-businesses" className="text-zinc-400 hover:text-white transition-colors">
                Join as Business
              </Link>
              <Link href="/for-businesses#features" className="text-zinc-400 hover:text-white transition-colors">
                Business Features
              </Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                Resources
              </Link>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              Company
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/search" className="text-zinc-400 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Column 5: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              Legal
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>

          {/* Column 6: Account */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white text-sm sm:text-base">
              Account
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
                Log In
              </Link>
              <Link href="/register" className="text-zinc-400 hover:text-white transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Badge & Description */}
        <div className="mt-12 sm:mt-16 mb-12">
          <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm mb-3">
            <Image
              src="/icons/logo.png"
              alt="The Cloud Salon"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md">
            Discover trusted beauty professionals and salons, and book your next appointment with confidence — all in one place.
          </p>
        </div>

        {/* Bottom Copyright & Legal Row */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 Cloud Salon Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/faq" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}