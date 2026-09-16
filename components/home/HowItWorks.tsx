"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Search by service, location, and availability. Browse verified professionals and salons near you.",
      active: false,
    },
    {
      num: "02",
      title: "Book",
      desc: "Choose your service, select a date and time, and confirm your appointment in seconds.",
      active: true,
    },
    {
      num: "03",
      title: "Enjoy",
      desc: "Get your service and leave a review to help the community find great professionals.",
      active: false,
    },
  ];

  return (
    <section className="w-full bg-[#F4EBE0] dark:bg-[#151413] py-14 sm:py-20 transition-colors duration-200 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-6xl">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block mb-1">
            THE PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1C1E] dark:text-white tracking-tight">
            How it works
          </h2>
        </div>

        {/* 3 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl p-7 sm:p-9 lg:p-10 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-1 ${
                step.active
                  ? "bg-[#B98C44] text-white shadow-lg"
                  : "bg-white dark:bg-[#222120] text-[#1C1C1E] dark:text-white"
              }`}
            >
              {/* Elegant Italic Serif Step Number */}
              <span
                className={`font-serif italic text-5xl sm:text-6xl font-light mb-3 select-none ${
                  step.active
                    ? "text-white/65"
                    : "text-[#C9BEAA] dark:text-zinc-600"
                }`}
              >
                {step.num}
              </span>

              {/* Title */}
              <h3
                className={`font-serif text-xl sm:text-2xl font-bold mb-2.5 leading-snug ${
                  step.active ? "text-white" : "text-[#1C1C1E] dark:text-white"
                }`}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className={`text-xs sm:text-sm font-light leading-relaxed max-w-[260px] ${
                  step.active
                    ? "text-white/90"
                    : "text-[#66635D] dark:text-zinc-400"
                }`}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
