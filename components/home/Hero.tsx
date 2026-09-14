"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, Users, Clock, MapPin, Laptop } from "lucide-react";

export default function Hero() {
  const horizontalFeatures = [
    { icon: Calendar, label: "Book Anytime" },
    { icon: Users, label: "Expert Specialists" },
    { icon: Clock, label: "Flexible Scheduling" },
    { icon: MapPin, label: "Services Wherever You Are" },
    { icon: Laptop, label: "Work From Anywhere" },
  ];

  const verticalFeatures = [
    {
      icon: Calendar,
      title: "Book Anytime",
      desc: "Easy. Fast. On your schedule.",
    },
    {
      icon: Users,
      title: "Expert Specialists",
      desc: "Verified pros. Top rated.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      desc: "Choose what works best for you.",
    },
    {
      icon: MapPin,
      title: "Services Wherever You Are",
      desc: "At home, on-site or in-salon.",
    },
    {
      icon: Laptop,
      title: "Work From Anywhere",
      desc: "Run your beauty business in the cloud.",
    },
  ];

  // Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const verticalFeatureVariant: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.45 + i * 0.1,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section className="w-full relative bg-white dark:bg-[#121214] text-foreground select-none overflow-hidden transition-colors duration-200">
      {/* Subtle Animated Ambient Glow in Background */}
      <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-[#D99722]/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Desktop Golden Arc Frame Pinned to Viewport Right-0 (Fills Red Box Completely to Right Edge) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
        className="hidden lg:flex absolute top-0 bottom-0 h-[550px] -mt-2 right-0 w-[calc(52vw)] xl:w-[calc(55vw)] rounded-l-full border-l-[25px] border-t-[3.5px] border-b-[3.5px] border-[#D99722] shadow-2xl overflow-hidden bg-[#121110] items-stretch z-0"
      >
        {/* Beauty Model Background Image with Smooth Subtle Float */}
        <div className="w-full relative overflow-hidden h-full">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full h-full relative"
          >
            <motion.div
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/hero/image.png"
                alt="The Cloud Salon Beauty Model"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
          {/* Subtle gradient to keep text readable on dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
        </div>

        {/* 5 Vertical Feature Items Absolutely Positioned over Red-Marked Area */}
        <div className="absolute top-1/2 -translate-y-1/2 right-8 sm:right-12 lg:right-16 xl:right-24 z-30 flex flex-col gap-6 sm:gap-7">
          {verticalFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={verticalFeatureVariant}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[#D99722] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#D99722]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-normal text-xs sm:text-sm text-white leading-tight whitespace-nowrap group-hover:text-[#D99722] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-zinc-400 font-light leading-snug whitespace-nowrap">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Main Grid Container for Left Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
          {/* Left Column: Kept strictly inside standard centered container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-5 space-y-4 text-left"
          >
            {/* Top Golden Subtitle */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em]"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-[2px] bg-[#D99722] inline-block"
              />
              <span>ALL YOUR SALON SERVICES. YOUR CHOICE.</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-[#222222] dark:text-white">
                Salon Services, <br />
                <span className="text-[#D99722]">Your Choice.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-zinc-400 font-normal max-w-lg leading-relaxed">
                Discover trusted beauty professionals and salons, and book your next appointment with confidence. Find the right service, the right professional, and the right time — all in one place.
              </p>
            </motion.div>

            {/* 5 Horizontal Feature Badges */}
            <motion.div variants={fadeInUp} className="grid grid-cols-5 gap-1 sm:gap-2 pt-1 max-w-lg">
              {horizontalFeatures.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="flex flex-col items-center text-center p-1.5 rounded-xl bg-transparent transition-colors group"
                  >
                    <Icon className="w-7 h-7 text-[#D99722] mb-1 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-[11px] font-medium text-[#444444] dark:text-zinc-300 leading-tight">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Twin Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/discover"
                  className="px-6 py-3 rounded-sm bg-[#D99722] hover:bg-[#A0732A] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book A service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/for-professionals"
                  className="px-6 py-3 rounded-sm bg-[#EAE5D9] dark:bg-[#26282E] hover:bg-[#DDD8CD] border border-border/40 text-[#222222] dark:text-foreground font-semibold text-xs sm:text-sm transition-all shadow-2xs text-center cursor-pointer block"
                >
                  Join The Cloud Salon
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Spacer for Right Column on Desktop Grid */}
          <div className="hidden lg:block lg:col-span-7" />
        </div>
      </div>
    </section>
  );
}
