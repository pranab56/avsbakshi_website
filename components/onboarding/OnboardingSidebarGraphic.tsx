"use client";

import Image from "next/image";

export default function OnboardingSidebarGraphic() {
  return (
    <div className="hidden lg:block w-1/2 relative bg-accent/20 min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"
        alt="Luxe Salon Interior"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">
            ✨
          </div>
          <span className="font-bold tracking-wider text-sm uppercase">
            Salon Website Portal
          </span>
        </div>

        <div className="space-y-4 max-w-lg">
          <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight">
            Grow your salon business with modern tools and client bookings.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
            Join hundreds of beauty professionals using our platform to manage their schedules, showcase portfolios, and accept instant appointments.
          </p>
        </div>
      </div>
    </div>
  );
}
