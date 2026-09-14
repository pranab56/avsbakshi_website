"use client";

import { motion, Variants } from "framer-motion";
import { Users, MapPin, Heart, Star } from "lucide-react";

export default function StatsTicker() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Verified Professionals",
    },
    {
      icon: MapPin,
      value: "5000+",
      label: "Salon Locations",
    },
    {
      icon: Heart,
      value: "100,000+",
      label: "Happy Clients",
    },
    {
      icon: Star,
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
        delayChildren: 0.2,
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

  return (
    <div className="w-full bg-white dark:bg-[#121214] transition-colors duration-200">
      {/* Metric Cards Row with subtle vertical dividers */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border/60 rounded-sm"
        >
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={statItemVariant}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex items-center gap-3 px-3 py-2 sm:py-2.5 justify-center lg:justify-start cursor-pointer group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-[#D99722] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h4 className="font-title text-sm sm:text-base font-medium leading-none mb-0.5 group-hover:text-[#D99722] transition-colors">
                    {item.value}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium truncate">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Luxury Brand Marquee Ribbon with Left & Right Horizontal Lines */}
      <div className="w-full dark:bg-[#121214] py-2.5 overflow-hidden select-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 sm:gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 h-[1px] bg-[#D99722]/40 origin-left"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99722] shrink-0"
          >
            <span>BEAUTY</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>CONNECTION</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>OPPORTUNITY</span>
            <span className="text-[#D99722]/60 text-xs">★</span>
            <span>IN THE CLOUD</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 h-[1px] bg-[#D99722]/40 origin-right"
          />
        </div>
      </div>
    </div>
  );
}

