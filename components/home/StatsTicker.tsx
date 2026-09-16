"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function StatsTicker() {
  const stats = [
    {
      icon: "/icons/hero/user-2.png",
      value: "10,000+",
      label: "Verified Professionals",
    },
    {
      icon: "/icons/hero/location-2.png",
      value: "5000+",
      label: "Salon Locations",
    },
    {
      icon: "/icons/hero/love.png",
      value: "100,000+",
      label: "Happy Clients",
    },
    {
      icon: "/icons/hero/start.png",
      value: "4.9+",
      label: "Average Rating",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const statItemVariant: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  // Helper for responsive grid dividers: 2x2 grid on mobile (<lg) and 1x4 on desktop (lg+)
  const getBorderClasses = (idx: number) => {
    switch (idx) {
      case 0:
        // Top-left: Right & bottom border on mobile; right border only on desktop
        return "border-r border-b lg:border-b-0 border-border/40";
      case 1:
        // Top-right: Bottom border on mobile; right border on desktop
        return "border-b lg:border-b-0 lg:border-r border-border/40";
      case 2:
        // Bottom-left: Right border on mobile & desktop
        return "border-r border-border/40";
      case 3:
        // Bottom-right: No borders on mobile; no right border on desktop
        return "lg:border-r-0 border-border/40";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#121214] transition-colors duration-200">
      {/* Metric Cards Row */}
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-sm"
        >
          {stats.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                variants={statItemVariant}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2.5 sm:py-3.5 justify-start xs:justify-center lg:justify-start group ${getBorderClasses(
                  idx
                )}`}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform relative">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={32}
                    height={32}
                    className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-base font-extrabold leading-none mb-0.5 group-hover:text-[#D99722] transition-colors text-foreground">
                    {item.value}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#D99722] font-semibold leading-tight truncate">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Luxury Brand Marquee Ribbon with Left & Right Golden Lines */}
      <div className="w-full dark:bg-[#121214] py-2 sm:py-2.5 overflow-hidden select-none">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-center gap-1.5 sm:gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[8px] sm:min-w-[20px] h-[1px] bg-[#E5E0D8] origin-left"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-1 min-[360px]:gap-2 sm:gap-6 text-[8px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.05em] min-[360px]:tracking-[0.1em] min-[400px]:tracking-[0.16em] sm:tracking-[0.25em] text-[#1C1C1E]/80 dark:text-white/80 shrink-0"
          >
            <span>BEAUTY</span>
            <span className="text-[#D99722]/80 text-[7px] sm:text-xs">★</span>
            <span>CONNECTION</span>
            <span className="text-[#D99722]/80 text-[7px] sm:text-xs">★</span>
            <span>OPPORTUNITY</span>
            <span className="text-[#D99722]/80 text-[7px] sm:text-xs">★</span>
            <span>IN THE CLOUD</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[8px] sm:min-w-[20px] h-[1px] bg-[#E5E0D8] origin-right"
          />
        </div>
      </div>
    </div>
  );
}


