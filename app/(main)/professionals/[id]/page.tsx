"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  CheckCircle2,
  Heart,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ProfessionalDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"about" | "services" | "portfolio" | "reviews" | "availability">("about");
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("18");
  const [selectedTime, setSelectedTime] = useState("9:30 AM");

  const services = [
    { title: "Haircut & Style", price: "£65", duration: "60 min", desc: "Includes wash, cut, and blow-dry to your desired style." },
    { title: "Full Colour", price: "£145", duration: "120 min", desc: "Root to tip colour transformation with toning and treatment." },
    { title: "Highlights", price: "£175", duration: "150 min", desc: "Partial or full highlights with foils, balayage, or ombre techniques." },
    { title: "Blowout", price: "£45", duration: "45 min", desc: "Wash and professional blow-dry styling. No cut included." },
    { title: "Keratin Treatment", price: "£220", duration: "180 min", desc: "Smoothing treatment for frizz-free, glossy hair lasting 3-5 months." },
  ];

  const portfolioPhotos = [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583001809873-a1284d56338b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80",
  ];

  const reviews = [
    { name: "Rachel Thompson", date: "12 Jul 2025", service: "Full Colour & Style", text: "Absolutely incredible result. Sofia really listened to what I wanted and delivered something even better. The salon was spotless and the whole experience felt very premium. Already booked my next appointment." },
    { name: "Elena Rostova", date: "02 Jul 2025", service: "Haircut & Style", text: "Best haircut I've had in London in 5 years. Sofia's attention to detail is unmatched and her advice on hair health was super helpful." },
    { name: "Jessica Miller", date: "24 Jun 2025", service: "Balayage", text: "Sofia is a true artist! The color blend is so natural and seamless. Highly recommended to anyone looking for expert color." },
  ];

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Cover Image Header Banner */}
      <div className="relative h-64 sm:h-80 bg-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-start pt-6 relative z-10">
          <div className="text-white text-xs flex items-center gap-2 font-normal">
            <Link href="/" className="hover:underline text-white/80">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/discover" className="hover:underline text-white/80">Discover</Link>
            <span className="text-white/40">/</span>
            <Link href="/discover?tab=services" className="hover:underline text-white/80">Hair</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Sofia Martinez</span>
          </div>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-t-xl sm:rounded-t-2xl pt-8 pb-0 px-6 sm:px-10 ">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Sofia Martinez"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-title text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1A1A]">
                    Sofia Martinez
                  </h1>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-[#C8E6C9]">
                    <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
                    VERIFIED
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#666159] font-medium">
                  Hair Stylist · 10 years
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-[#666159] pt-1">
                  <div className="flex items-center gap-1 text-[#1A1A1A]">
                    <div className="flex items-center text-[#B78735] text-sm">
                      ★★★★★
                    </div>
                    <span className="font-bold ml-1">4.8</span>
                    <span className="text-[#666159]">(312 reviews)</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-[#666159]">
                    <MapPin className="w-3.5 h-3.5 text-[#666159]" />
                    <span>Soho, London</span>
                  </div>
                  <span>·</span>
                  <span className="text-[#666159]">from £45</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/book/1"
                className="flex-1 md:flex-none px-7 py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-xs sm:text-sm rounded-sm shadow-sm transition-colors text-center cursor-pointer"
              >
                Book Appointment
              </Link>
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="w-11 h-11 bg-[#E2DACD] hover:bg-[#D6C9B7] border border-[#DCD5C9] rounded-sm flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer shrink-0"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-[#1A1A1A]'}`} />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[#DCD5C9] pt-4 text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
            {[
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "reviews", label: "Reviews" },
              { id: "availability", label: "Availability" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "about" | "services" | "portfolio" | "reviews" | "availability")}
                className={`pb-3.5 transition-colors cursor-pointer relative shrink-0 ${activeTab === tab.id
                  ? "text-[#1A1A1A] font-semibold"
                  : "text-[#666159] hover:text-[#1A1A1A]"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78735]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column Content */}
          <div className="lg:col-span-8 space-y-8 ">
            {/* 1. ABOUT TAB */}
            {activeTab === "about" && (
              <div className="animate-in fade-in duration-150 space-y-8">
                <blockquote className="font-title font-light italic text-lg sm:text-xl text-[#1A1A1A] border-l-2 border-[#B78735] pl-6 py-1 leading-relaxed">
                  &ldquo;My philosophy is simple &mdash; listen first, create second. Every client&apos;s hair has its own history, and I work with that history, not against it.&rdquo;
                </blockquote>

                <div className="space-y-4 text-xs sm:text-sm text-[#635E56] font-normal leading-relaxed">
                  <p>
                    Award-winning hair stylist with 10+ years of experience specialising in colour, cuts, and transformations for all hair types. With a dedication to her craft and a calm, attentive approach to every client, Sofia has built a loyal following across London over more than a decade behind the chair.
                  </p>
                  <p>
                    Award-winning hair stylist with 10+ years of experience specialising in colour, cuts, and transformations for all hair types. With a dedication to her craft and a calm, attentive approach to every client, Sofia has built a loyal following across London over more than a decade behind the chair.
                  </p>
                </div>

                {/* 4 Stat Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-[#E2DACD]/60 p-4 sm:p-8 rounded-lg text-center border border-[#DCD5C9] space-y-1">
                    <h4 className="font-title text-xl sm:text-2xl font-normal text-[#1A1A1A]">10 years</h4>
                    <p className="text-[11px] sm:text-xs text-[#666159]">Experience</p>
                  </div>
                  <div className="bg-[#E2DACD]/60 p-4 sm:p-8 rounded-lg text-center border border-[#DCD5C9] space-y-1">
                    <h4 className="font-title text-xl sm:text-2xl font-normal text-[#1A1A1A]">500+</h4>
                    <p className="text-[11px] sm:text-xs text-[#666159]">Happy clients</p>
                  </div>
                  <div className="bg-[#E2DACD]/60 p-4 sm:p-8 rounded-lg text-center border border-[#DCD5C9] space-y-1">
                    <h4 className="font-title text-xl sm:text-2xl font-normal text-[#1A1A1A]">312</h4>
                    <p className="text-[11px] sm:text-xs text-[#666159]">Reviews</p>
                  </div>
                  <div className="bg-[#E2DACD]/60 p-4 sm:p-8 rounded-lg text-center border border-[#DCD5C9] space-y-1">
                    <h4 className="font-title text-xl sm:text-2xl font-normal text-[#1A1A1A]">4.9★</h4>
                    <p className="text-[11px] sm:text-xs text-[#666159]">Average rating</p>
                  </div>
                </div>

                {/* Specialities Tags */}
                <div className="space-y-3 pt-6 border-t border-[#D5CBB9]">
                  <h4 className="text-xs font-semibold text-[#666159] uppercase tracking-[0.15em] block">
                    SPECIALITIES
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "Balayage", "Colour Correction", "Keratin Treatments", "Bridal Hair",
                      "Short Cuts", "Curly Hair Specialist", "Extensions", "Toning"
                    ].map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F4EBE0] text-[#B78735] text-xs font-medium px-4 py-2 rounded-md border border-[#F4EBE0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {services.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-xs hover:border-[#B78735] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#B78735]" />
                        <h3 className="font-title text-base font-bold text-[#1A1A1A]">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[#666159] font-normal pl-6">{item.desc}</p>
                      <span className="inline-block bg-[#E2DACD] text-[#2C2E33] text-[10px] px-2.5 py-0.5 rounded ml-6 mt-1 font-medium border border-[#D5CBB9]">
                        {item.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <span className="font-title text-xl font-bold text-[#C59B4C]">{item.price}</span>
                      <Link
                        href="/book/1"
                        className="px-5 py-2.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. PORTFOLIO TAB */}
            {activeTab === "portfolio" && (
              <div className=" p-6 sm:p-8 rounded-lg  space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-[#666159] font-medium">
                  {portfolioPhotos.length} photos &mdash; Click to enlarge
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolioPhotos.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-48 rounded-lg overflow-hidden shadow-xs hover:opacity-90 transition-opacity cursor-pointer border border-[#DCD5C9] group"
                    >
                      <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className=" p-6 sm:p-8 rounded-xl border border-gray-200 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-[#D5CBB9] pb-6">
                    <div className="text-center sm:text-left">
                      <h2 className="font-title text-5xl font-bold text-[#1A1A1A]">4.9</h2>
                      <div className="flex items-center justify-center sm:justify-start gap-1 my-1 text-[#B78735]">
                        ★★★★★
                      </div>
                      <p className="text-xs text-[#666159]">312 reviews</p>
                    </div>

                    <div className="flex-1 w-full space-y-1.5 text-xs text-[#666159]">
                      {[
                        { star: "5 ★", pct: "76%" },
                        { star: "4 ★", pct: "15%" },
                        { star: "3 ★", pct: "5%" },
                        { star: "2 ★", pct: "1%" },
                        { star: "1 ★", pct: "1%" },
                      ].map((bar, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="w-6 text-right text-[#666159] font-medium">{bar.star}</span>
                          <div className="flex-1 h-2 bg-[#E2DACD] rounded-full overflow-hidden">
                            <div className="h-full bg-[#B78735] rounded-full" style={{ width: bar.pct }} />
                          </div>
                          <span className="w-8 text-[#666159] text-right">{bar.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#E2DACD]/30 p-5 rounded-sm border border-[#E2DACD]/30">
                      <h4 className="font-title text-lg font-bold text-[#1A1A1A]">4.9</h4>
                      <p className="text-[10px] text-[#666159]">Communication</p>
                    </div>
                    <div className="bg-[#E2DACD]/30 p-5 rounded-sm border border-[#E2DACD]/30">
                      <h4 className="font-title text-lg font-bold text-[#1A1A1A]">5.0</h4>
                      <p className="text-[10px] text-[#666159]">Skill</p>
                    </div>
                    <div className="bg-[#E2DACD]/30 p-5 rounded-sm border border-[#E2DACD]/30">
                      <h4 className="font-title text-lg font-bold text-[#1A1A1A]">4.7</h4>
                      <p className="text-[10px] text-[#666159]">Value</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className=" p-5 rounded-lg border border-gray-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1A1A1A]">{rev.name}</span>
                          <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] px-2 py-0.5 rounded font-semibold border border-[#C8E6C9]">
                            Verified
                          </span>
                        </div>
                        <span className="text-[11px] text-[#666159]">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#B78735] text-xs">
                        ★★★★★
                        <span className="text-xs text-[#B78735] font-medium ml-2">{rev.service}</span>
                      </div>

                      <p className="text-xs text-[#635E56] font-normal leading-relaxed">
                        {rev.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. AVAILABILITY TAB */}
            {activeTab === "availability" && (
              <div className="space-y-8 animate-in fade-in duration-150">
                {/* Calendar Widget */}
                <div className="p-6 sm:p-8 rounded-[24px] border border-gray-200 max-w-lg shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h3 className="font-title text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                      July 2025
                    </h3>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-xl bg-white/70 hover:bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                        <span key={i} className="text-xs font-medium text-[#666159] py-1">
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center">
                      {[
                        { day: "14", disabled: false },
                        { day: "15", disabled: false },
                        { day: "16", disabled: true },
                        { day: "17", disabled: false },
                        { day: "18", disabled: false },
                        { day: "19", disabled: false },
                        { day: "20", disabled: true },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          disabled={item.disabled}
                          onClick={() => setSelectedDate(item.day)}
                          className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all text-center ${
                            item.disabled
                              ? "text-zinc-400 opacity-40 cursor-not-allowed font-light"
                              : selectedDate === item.day
                              ? "text-[#1A1A1A] font-bold"
                              : "text-[#1A1A1A] hover:text-[#B78735] cursor-pointer"
                          }`}
                        >
                          {item.day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Slots 5-Column Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                  {[
                    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
                    "11:30 AM", "12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM",
                    "3:00 PM", "4:00 PM", "5:00 PM", "5:30 PM", "6:00 PM",
                    "6:30 PM", "7:00 PM"
                  ].map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-3.5 px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${
                        selectedTime === t
                          ? "bg-[#B78735] hover:bg-[#A37428] text-white font-semibold border-[#B78735] shadow-xs"
                          : "bg-white hover:bg-[#E2DACD]/20 text-[#1A1A1A] font-medium border-[#DCD5C9]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar Booking Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className=" rounded-2xl border border-[#DCD5C9] overflow-hidden sticky top-24 space-y-0">
              <div className="bg-[#1E1C1A] text-white p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                    FROM
                  </span>
                  <h3 className="font-title text-3xl sm:text-4xl font-normal text-white">
                    £45
                  </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-[#B78735]">
                    ★★★★★
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-1">312 reviews</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-[#666159] uppercase tracking-wider block">
                  NEXT AVAILABLE
                </span>

                <div className="space-y-2.5 text-xs">
                  {[
                    "Today, 2:30 PM",
                    "Today, 4:00 PM",
                    "Tomorrow, 10:00 AM",
                    "Tomorrow, 2:00 PM"
                  ].map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => router.push('/book/1')}
                      className={`w-full p-3.5 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${idx === 0
                        ? "bg-[#E2DACD] border-[#DCD5C9] text-[#2C2E33] font-semibold"
                        : "bg-[#E2DACD]/60 hover:bg-[#E2DACD] border-[#DCD5C9] text-[#2C2E33] font-medium"
                        }`}
                    >
                      <Clock className="w-4 h-4 text-[#B78735] shrink-0" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>

                <Link
                  href="/book/1"
                  className="w-full text-center py-3.5 bg-[#B78735] hover:bg-[#A37428] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-colors block cursor-pointer mt-4"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Verified Professional Card */}
            <div className="bg-[#E0ECE4] border border-[#C8E6C9] p-5 rounded-xl flex items-start gap-4 text-[#1B5E20]">
              <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1B5E20] mb-0.5">Verified Professional</h4>
                <p className="text-[11px] text-[#2E7D32] font-normal leading-relaxed">
                  Identity verified, qualifications checked, and manually approved by the Cloud Salon team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
