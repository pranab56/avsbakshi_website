"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function RoleCardsSection() {
  const cards = [
    {
      title: "For Customers",
      desc: "Book your favorite services anytime, anywhere.",
      img: "/images/hero/role-1.png",
      link: "/discover",
    },
    {
      title: "For Professionals",
      desc: "Grow your business on your terms.",
      img: "/images/hero/role-2.png",
      link: "/for-professionals",
    },
    {
      title: "For Businesses",
      desc: "Join the marketplace and reach more clients.",
      img: "/images/hero/role-3.png",
      link: "/for-businesses",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-[#121214] py-2 sm:py-3 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariant}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <Link
                href={card.link}
                className="group relative block h-36 sm:h-40 lg:h-44 rounded-lg overflow-hidden shadow-md border border-border/40 transition-all duration-300 hover:shadow-xl"
              >
                {/* Background Image */}
                <Image
                  src={card.img}
                  alt={card.title}
                  width={1000}
                  height={1000}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                {/* Content & Gold Action Circle Button */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 z-10">
                  <div className="space-y-0.5">
                    <h3 className="  text-base sm:text-lg font-bold text-white leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-300 font-normal leading-tight max-w-[200px]">
                      {card.desc}
                    </p>
                  </div>

                  {/* Gold Circle Arrow Icon */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D99722] hover:bg-[#C2841B] text-white flex items-center justify-center shrink-0 shadow-md transition-all group-hover:scale-110">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

