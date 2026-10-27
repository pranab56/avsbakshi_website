import Image from "next/image";
import { Users, CalendarCheck, Award, Star } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full">
      {/* Dark Hero Header */}
      <section className="bg-[#121214] text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D99722]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-80 h-80 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D99722] animate-pulse" />
              <span className="text-xs font-semibold text-[#D99722] uppercase tracking-[0.2em]">
                ABOUT THE CLOUD SALON
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-white">
              We built the <br className="hidden sm:inline" />
              platform we needed, <br />
              but <span className="font-light italic text-[#D99722]">could never find.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-lg">
              The Cloud Salon was founded by beauty industry veterans who spent years managing bookings across scattered messages, calendars, and spreadsheets. We created a singular luxury ecosystem designed to empower stylists, salons, and clients alike.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99722]" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99722]" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99722]" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[440px] sm:h-[520px] lg:h-[560px] w-full group">
              <Image
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                alt="The Cloud Salon Studio Interior"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-300">Empowering beauty independence</p>
                  <p className="text-sm font-bold text-white">Created by Stylists, for Stylists</p>
                </div>
                <span className="w-10 h-10 rounded-xl bg-[#D99722]/20 border border-[#D99722]/50 flex items-center justify-center text-[#D99722] shrink-0 font-serif font-bold">
                  CS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Luxury Stats Strip */}
      <section className="bg-card border-b border-border text-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-accent/30 border border-border/50 hover:border-[#D99722]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center mb-1">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">47,000+</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Independent Professionals</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-accent/30 border border-border/50 hover:border-[#D99722]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center mb-1">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">320,000+</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Bookings Completed</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-accent/30 border border-border/50 hover:border-[#D99722]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center mb-1">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#D99722] tracking-tight">$35M+</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Paid Out to Specialists</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-accent/30 border border-border/50 hover:border-[#D99722]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#D99722]/15 text-[#D99722] flex items-center justify-center mb-1">
              <Star className="w-5 h-5 fill-[#D99722]" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">4.9 ★</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Average Platform Rating</p>
          </div>

        </div>
      </section>
    </div>
  );
}
