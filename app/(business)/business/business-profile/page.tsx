"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, Plus, Upload, Check, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type TabType = "Overview" | "Edit Profile" | "Location" | "Business Hours" | "Photos";

const TIME_OPTIONS = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
];

const INITIAL_PHOTOS = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
];

export default function BusinessProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // Logo upload state & ref
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Photos gallery state & ref
  const [photos, setPhotos] = useState<string[]>(INITIAL_PHOTOS);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState({
    businessName: "Noir Studio",
    businessType: "Hair & Beauty Salon",
    email: "hello@noirstudio.co.uk",
    phone: "+44 20 7123 4567",
    website: "noirstudio.co.uk",
    instagram: "@noirstudiosoho",
    description: "",
  });

  // Location Form State
  const [locationForm, setLocationForm] = useState({
    street: "12 Dean Street",
    city: "London",
    postcode: "123456",
    country: "United Kingdom",
  });

  // Business Hours State
  const [hours, setHours] = useState([
    { day: "Monday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Tuesday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Wednesday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Thursday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Friday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Saturday", open: true, start: "09:00 AM", end: "06:00 PM" },
    { day: "Sunday", open: false, start: "09:00 AM", end: "06:00 PM" },
  ]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      toast.success("Business logo updated successfully!");
    }
  };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (validFiles.length === 0) {
        toast.error("Please select valid image files");
        return;
      }

      const newUrls = validFiles.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...newUrls, ...prev]);
      toast.success(
        `${validFiles.length} photo${validFiles.length > 1 ? "s" : ""} added to studio gallery!`
      );
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    toast.success("Photo removed from gallery");
  };

  const toggleHour = (index: number) => {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, open: !h.open } : h))
    );
  };

  const updateHourTime = (index: number, field: "start" | "end", value: string) => {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = (section: string) => {
    setSavedFeedback(section);
    toast.success("Changes saved successfully!");
    setTimeout(() => {
      setSavedFeedback(null);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-[#1A1A1A]">
      {/* Header Title */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          Business Profile
        </h1>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-[#E3DDD3] flex items-center gap-8 text-sm overflow-x-auto">
        {(["Overview", "Edit Profile", "Location", "Business Hours", "Photos"] as TabType[]).map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 font-medium transition-all cursor-pointer whitespace-nowrap relative ${
                activeTab === tab
                  ? "text-[#B78735]"
                  : "text-[#787570] hover:text-[#2C2E33]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B78735] rounded-full" />
              )}
            </button>
          )
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: OVERVIEW                                                   */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Hero Card & Metric Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Business Hero Card Banner */}
            <div className="bg-white border border-[#E3DDD3]/70 rounded-lg overflow-hidden relative shadow-xs">
              <div className="relative h-56 sm:h-64 w-full bg-[#1C1C1E]">
                <Image
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                  alt="Noir Studio"
                  fill
                  className="object-cover opacity-85"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Banner Overlay Info */}
                <div className="absolute bottom-6 left-6 flex items-end gap-4 text-white">
                  <div className="relative w-14 h-14 rounded-md bg-white border border-[#E3DDD3] font-serif font-bold text-2xl flex items-center justify-center text-[#2C2E33] shadow-md shrink-0 overflow-hidden">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Business Logo"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span>N</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl drop-shadow-md leading-tight">
                      {profileForm.businessName}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">
                      {profileForm.businessType} · Soho, London W1D 3QL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Metric Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  247
                </div>
                <p className="text-xs text-[#787570] font-normal">Total Reviews</p>
              </div>

              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  ★ 4.8
                </div>
                <p className="text-xs text-[#787570] font-normal">Avg Rating</p>
              </div>

              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  6,420
                </div>
                <p className="text-xs text-[#787570] font-normal">Profile Views</p>
              </div>

              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  6
                </div>
                <p className="text-xs text-[#787570] font-normal">Chairs</p>
              </div>

              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  3
                </div>
                <p className="text-xs text-[#787570] font-normal">Active Pros</p>
              </div>

              <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 hover:border-[#B78735]/40 transition-colors shadow-2xs">
                <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
                  94%
                </div>
                <p className="text-xs text-[#787570] font-normal">Completion</p>
              </div>
            </div>
          </div>

          {/* Right Column: Business Details & Verified Card */}
          <div className="lg:col-span-4 space-y-5">
            {/* Business Details Card */}
            <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-6 space-y-4 shadow-xs">
              <h3 className="font-serif italic font-normal text-lg text-[#2C2E33]">
                Business Details
              </h3>

              <div className="divide-y divide-[#E3DDD3]/60 text-xs sm:text-sm">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#787570]">Phone</span>
                  <span className="font-medium text-[#2C2E33]">
                    {profileForm.phone}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#787570]">Email</span>
                  <span className="font-medium text-[#2C2E33]">
                    {profileForm.email}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#787570]">Website</span>
                  <span className="font-medium text-[#2C2E33]">
                    {profileForm.website}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#787570]">Instagram</span>
                  <span className="font-medium text-[#2C2E33]">
                    {profileForm.instagram}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#787570]">Address</span>
                  <span className="font-medium text-[#2C2E33] text-right">
                    12 Dean St, Soho, W1D 3QL
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Business Callout */}
            <div className="bg-[#E8F3EA] border border-[#C5E1CA] rounded-lg p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2E6B38]/15 flex items-center justify-center text-[#2E6B38] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#2E6B38]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-[#2E6B38]">
                  Verified Business
                </h4>
                <p className="text-xs text-[#3E7B48]">
                  ID, licence, and insurance confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: EDIT PROFILE                                               */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "Edit Profile" && (
        <div className="max-w-2xl bg-white border border-[#E3DDD3]/70 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Logo Section with Image Upload & Live Preview */}
          <div className="flex items-center gap-4 border-b border-[#E3DDD3]/50 pb-6">
            <div className="relative w-16 h-16 rounded-md bg-[#1C1C1E] text-white font-serif italic text-2xl flex items-center justify-center font-normal shadow-xs shrink-0 overflow-hidden">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Business Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span>N</span>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#2C2E33]">
                {profileForm.businessName}
              </h3>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="px-4 py-2 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs active:scale-[0.98]"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Change Logo</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Business Name
              </label>
              <input
                type="text"
                value={profileForm.businessName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, businessName: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Business Type
              </label>
              <input
                type="text"
                value={profileForm.businessType}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, businessType: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Email
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Phone
              </label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Website
              </label>
              <input
                type="text"
                value={profileForm.website}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, website: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Instagram
              </label>
              <input
                type="text"
                value={profileForm.instagram}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, instagram: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave("profile")}
              className="px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center gap-2"
            >
              {savedFeedback === "profile" ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: LOCATION                                                   */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "Location" && (
        <div className="max-w-2xl bg-white border border-[#E3DDD3]/70 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Street Address
              </label>
              <input
                type="text"
                value={locationForm.street}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, street: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                City
              </label>
              <input
                type="text"
                value={locationForm.city}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, city: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Postcode
              </label>
              <input
                type="text"
                value={locationForm.postcode}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, postcode: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Country
              </label>
              <input
                type="text"
                value={locationForm.country}
                onChange={(e) =>
                  setLocationForm({ ...locationForm, country: e.target.value })
                }
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave("location")}
              className="px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center gap-2"
            >
              {savedFeedback === "location" ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Location</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: BUSINESS HOURS                                             */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "Business Hours" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E3DDD3]/70 rounded-lg overflow-hidden shadow-xs">
            {/* Table Header */}
            <div className="bg-[#F3F0EA] px-6 py-3.5 grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-[#787570] border-b border-[#E3DDD3]/70">
              <div className="col-span-4">DAY</div>
              <div className="col-span-2">OPEN</div>
              <div className="col-span-3">START</div>
              <div className="col-span-3">END</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#E3DDD3]/60">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className="px-6 py-4 grid grid-cols-12 items-center text-sm"
                >
                  <div className="col-span-4 font-semibold text-[#2C2E33]">
                    {h.day}
                  </div>

                  <div className="col-span-2">
                    <Switch
                      checked={h.open}
                      onCheckedChange={() => toggleHour(i)}
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="col-span-3">
                    {h.open ? (
                      <div className="relative inline-flex items-center">
                        <select
                          value={h.start}
                          onChange={(e) => updateHourTime(i, "start", e.target.value)}
                          className="bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-3.5 py-2 pr-9 text-xs sm:text-sm font-medium text-[#2C2E33] outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] hover:border-[#B78735]/60 transition-colors"
                        >
                          {TIME_OPTIONS.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <Clock className="w-4 h-4 text-[#787570] absolute right-2.5 pointer-events-none" />
                      </div>
                    ) : (
                      <span className="italic text-xs text-[#787570]">Day off</span>
                    )}
                  </div>

                  <div className="col-span-3">
                    {h.open ? (
                      <div className="relative inline-flex items-center">
                        <select
                          value={h.end}
                          onChange={(e) => updateHourTime(i, "end", e.target.value)}
                          className="bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-3.5 py-2 pr-9 text-xs sm:text-sm font-medium text-[#2C2E33] outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] hover:border-[#B78735]/60 transition-colors"
                        >
                          {TIME_OPTIONS.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <Clock className="w-4 h-4 text-[#787570] absolute right-2.5 pointer-events-none" />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave("hours")}
              className="px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center gap-2"
            >
              {savedFeedback === "hours" ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Hours</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 5: PHOTOS                                                     */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "Photos" && (
        <div className="space-y-6">
          <input
            type="file"
            ref={photoInputRef}
            onChange={handlePhotoAdd}
            accept="image/*"
            multiple
            className="hidden"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((src, i) => (
              <div
                key={i}
                className={`relative rounded-lg overflow-hidden bg-[#E0D9CE] border border-[#E3DDD3]/70 group ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2 h-80 sm:h-full min-h-[320px]" : "h-48 sm:h-56"
                }`}
              >
                <Image
                  src={src}
                  alt={`Studio photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(i)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer shadow-xs"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Add Photo Dotted Card */}
            <div
              onClick={() => photoInputRef.current?.click()}
              className="h-48 sm:h-56 bg-[#FAF8F4] border-2 border-dashed border-[#E3DDD3] rounded-lg flex flex-col items-center justify-center p-6 text-center text-[#787570] cursor-pointer hover:bg-[#F3F0EA] hover:border-[#B78735] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#E0D9CE]/60 flex items-center justify-center text-[#787570] mb-2 group-hover:scale-110 group-hover:bg-[#B78735]/15 group-hover:text-[#B78735] transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#2C2E33] group-hover:text-[#B78735] transition-colors">
                Add Photo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
