"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, X, Eye, CheckCircle2, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "Profile" | "About Profile" | "Notifications" | "Privacy" | "Security";

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      toast.success("Salon photo updated!");
    }
  };

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile & Public About Form State
  const [profileForm, setProfileForm] = useState({
    businessName: "Noir Studio",
    ownerName: "James Chen",
    email: "hello@noirstudio.com",
    phone: "+1 (212) 555-0188",
    tagline: "Luxury Hair Salon & Beauty Studio",
    location: "Soho, New York",
    establishedYear: "2015",
    chairsCount: "8 Chairs",
    philosophyQuote:
      '"Our philosophy is to craft an unparalleled luxury experience where artistry meets comfort, making every client feel valued and transformed."',
    bio: "Noir Studio is a premier luxury salon located in the heart of Soho, New York. Established in 2015, we offer state-of-the-art styling chairs, private treatment rooms, and top-tier amenities for independent stylists and clientele seeking world-class hair & beauty services.",
  });

  // Salon Amenities & Services tags
  const [amenities, setAmenities] = useState<string[]>([
    "Luxury Styling Chairs",
    "Private Wash Basins",
    "Complimentary Champagne & Coffee",
    "High-Speed Wi-Fi",
    "Color Processing Station",
    "Ring Lights & Photo Studio Corner",
    "Wheelchair Accessible",
    "Dedicated Receptionist",
  ]);
  const [newAmenity, setNewAmenity] = useState("");

  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    if (amenities.includes(newAmenity.trim())) {
      toast.error("Amenity tag already exists!");
      return;
    }
    setAmenities([...amenities, newAmenity.trim()]);
    setNewAmenity("");
    toast.success("Salon amenity tag added!");
  };

  const handleRemoveAmenity = (tag: string) => {
    setAmenities(amenities.filter((a) => a !== tag));
  };

  const handleSaveProfile = () => {
    toast.success("Business Profile & About Information updated successfully!");
  };

  // Notifications Toggle States
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    appointmentReminders: true,
    cancellationAlerts: true,
    rescheduleRequests: true,
    newMessages: true,
    unreadReminders: true,
    specialOffers: false,
    loyaltyRewards: true,
    newProfessionals: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-foreground">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
            Account &amp; Business Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Manage your salon credentials and customize what clients and professionals see on your public About page
          </p>
        </div>
      </div>

      {/* Main Settings Layout (Sidebar Navigation + Tab Content) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 bg-card border border-border rounded-lg overflow-hidden shadow-xs divide-y divide-border">
          {(
            [
              "Profile",
              "About Profile",
              "Notifications",
              "Privacy",
              "Security",
            ] as SettingsTab[]
          ).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-4 text-sm transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? "bg-secondary text-[#B78735] font-semibold"
                    : "text-foreground hover:bg-secondary/50 font-normal"
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tab Content Card */}
        <div className="flex-1 w-full bg-card border border-border rounded-lg p-6 sm:p-8 shadow-xs text-card-foreground">
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: PROFILE INFORMATION */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                  Basic Profile Information
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update your business display name, owner contact info, and email address
                </p>
              </div>

              {/* Avatar Photo Section */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-md bg-secondary text-foreground font-serif italic text-2xl flex items-center justify-center font-normal shadow-xs shrink-0 overflow-hidden border border-border">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Salon Photo"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>N</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-foreground">
                    {profileForm.businessName}
                  </h3>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-1.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Change photo
                  </button>
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.businessName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, businessName: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Owner / Manager Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.ownerName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, ownerName: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("About Profile")}
                  className="text-xs text-[#B78735] font-semibold underline hover:text-[#8F6929]"
                >
                  Configure Salon &quot;About&quot; Profile &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: PUBLIC "ABOUT" PROFILE (BIO, PHILOSOPHY, AMENITIES) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "About Profile" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                    Public About Page Information
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Customize your salon biography, philosophy quote, amenities tags, and stats shown to customers &amp; professionals
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="text-xs text-[#B78735] cursor-pointer font-semibold flex items-center gap-1 hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Salon Philosophy Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block flex items-center justify-between">
                  <span>Salon Philosophy Quote</span>
                  <span className="text-[11px] text-muted-foreground font-normal">
                    Displayed prominently on your salon page
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={profileForm.philosophyQuote}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      philosophyQuote: e.target.value,
                    })
                  }
                  placeholder="e.g. Our philosophy is to craft an unparalleled luxury experience..."
                  className="w-full bg-background border border-input rounded-sm p-4 text-sm italic font-serif text-foreground outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Detailed Salon Bio / History */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Detailed Salon Bio &amp; Overview
                </label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  placeholder="Write a warm overview of your salon space, values, amenities, and environment..."
                  className="w-full bg-background border border-input rounded-sm p-4 text-sm text-foreground leading-relaxed outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Business Stats & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Salon Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        tagline: e.target.value,
                      })
                    }
                    placeholder="e.g. Luxury Hair Salon & Beauty Studio"
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Location / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                    placeholder="e.g. Soho, New York"
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Established Year / Capacity
                  </label>
                  <input
                    type="text"
                    value={profileForm.establishedYear}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        establishedYear: e.target.value,
                      })
                    }
                    placeholder="e.g. 2015"
                    className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Amenities & Features Tags Section */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-foreground block">
                  Salon Amenities &amp; Services Offered
                </label>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 bg-secondary p-4 rounded-lg border border-border min-h-[60px] items-center">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-card text-foreground border border-border text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{amenity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(amenity)}
                        className="text-muted-foreground hover:text-red-600 cursor-pointer"
                        title="Remove amenity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {amenities.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">
                      No amenities added yet. Add tags below.
                    </span>
                  )}
                </div>

                {/* Add Amenity Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAmenity())}
                    placeholder="Type salon amenity (e.g. Private Wash Basins, High-Speed Wi-Fi)..."
                    className="flex-1 bg-background border border-input rounded-sm px-4 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="bg-[#B78735] hover:bg-[#8F6929] text-white px-4 py-2.5 rounded-sm font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Tag</span>
                  </button>
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-4 flex items-center justify-between border-t border-border">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Save About Profile Changes
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-4 py-2 rounded-sm border border-border text-foreground hover:bg-secondary text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B78735]" />
                  <span>Preview Page</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: NOTIFICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Notifications" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                Notification Preferences
              </h2>

              {/* APPOINTMENTS */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  APPOINTMENTS &amp; BOOKINGS
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Booking confirmations
                    </span>
                    <Switch
                      checked={notifications.bookingConfirmations}
                      onCheckedChange={() =>
                        toggleNotification("bookingConfirmations")
                      }
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Appointment reminders
                    </span>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={() =>
                        toggleNotification("appointmentReminders")
                      }
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Cancellation alerts
                    </span>
                    <Switch
                      checked={notifications.cancellationAlerts}
                      onCheckedChange={() =>
                        toggleNotification("cancellationAlerts")
                      }
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Reschedule requests
                    </span>
                    <Switch
                      checked={notifications.rescheduleRequests}
                      onCheckedChange={() =>
                        toggleNotification("rescheduleRequests")
                      }
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  MESSAGES
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      New client messages
                    </span>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={() => toggleNotification("newMessages")}
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Unread message reminders
                    </span>
                    <Switch
                      checked={notifications.unreadReminders}
                      onCheckedChange={() =>
                        toggleNotification("unreadReminders")
                      }
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>
                </div>
              </div>

              {/* PROMOTIONS */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  MARKETING &amp; PROMOTIONS
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Special promotional updates
                    </span>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={() => toggleNotification("specialOffers")}
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>

                  <div className="bg-secondary px-4 py-3.5 rounded-lg flex items-center justify-between border border-border/40">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Loyalty &amp; reward alerts
                    </span>
                    <Switch
                      checked={notifications.loyaltyRewards}
                      onCheckedChange={() => toggleNotification("loyaltyRewards")}
                      className="data-[state=checked]:bg-[#B78735]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: PRIVACY SETTINGS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Privacy" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                Privacy Settings
              </h2>

              <div className="divide-y divide-border space-y-4">
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-foreground">
                      Business Directory Visibility
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Control whether your salon appears in public search results
                    </p>
                  </div>
                  <span className="bg-secondary text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
                    Public
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-foreground">
                      Contact Number Visibility
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Show contact number on your public business page
                    </p>
                  </div>
                  <span className="bg-secondary text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
                    Visible
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-foreground">
                      Analytics &amp; Recommendations
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Use aggregated data to improve client match recommendations
                    </p>
                  </div>
                  <span className="bg-secondary text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
                    Enabled
                  </span>
                </div>
              </div>

              {/* Danger Zone Box */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5 sm:p-6 space-y-3 mt-8">
                <h3 className="font-serif font-bold text-lg text-red-600 dark:text-red-400">
                  Danger Zone
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Permanently deactivate your business profile and clear all listed services. This action cannot be undone.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    className="border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Deactivate Business Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: SECURITY */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Security" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                Security
              </h2>

              <div className="bg-secondary/60 border border-border p-5 sm:p-6 rounded-lg space-y-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">Password</h4>
                  <p className="text-xs text-muted-foreground">
                    Last changed 2 months ago
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="px-5 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Public About Profile Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="sm:max-w-2xl bg-card border border-border text-card-foreground p-6 rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="space-y-1 text-left border-b border-border pb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-serif font-bold text-xl text-foreground">
                Public &quot;About&quot; Preview
              </DialogTitle>
              <span className="bg-[#B78735]/15 text-[#B78735] text-xs font-bold px-2.5 py-1 rounded-full">
                Customer View
              </span>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              This is how your salon profile appears to customers browsing your page.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-3">
            {/* Header Banner Mockup */}
            <div className="flex items-start gap-4 p-5 bg-secondary border border-border rounded-xl">
              <div className="relative w-16 h-16 rounded-md bg-muted text-foreground font-serif italic text-2xl flex items-center justify-center font-normal shadow-xs shrink-0 overflow-hidden border border-border">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt={profileForm.businessName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span>N</span>
                )}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="font-serif font-bold text-xl text-foreground">
                  {profileForm.businessName}
                </h3>
                <p className="text-xs font-medium text-[#B78735]">
                  {profileForm.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B78735]" />
                    {profileForm.location}
                  </span>
                  <span>•</span>
                  <span>Est. {profileForm.establishedYear}</span>
                  <span>•</span>
                  <span>Managed by {profileForm.ownerName}</span>
                </div>
              </div>
            </div>

            {/* Philosophy Quote Box */}
            {profileForm.philosophyQuote && (
              <div className="bg-secondary/60 border-l-4 border-[#B78735] p-4 rounded-r-xl">
                <p className="font-serif italic text-sm text-foreground leading-relaxed">
                  {profileForm.philosophyQuote}
                </p>
              </div>
            )}

            {/* Bio Section */}
            {profileForm.bio && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-base text-foreground">
                  About Salon
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {profileForm.bio}
                </p>
              </div>
            )}

            {/* Amenities Section */}
            {amenities.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-base text-foreground">
                  Salon Amenities &amp; Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-secondary text-foreground border border-border text-xs font-medium px-3 py-1.5 rounded-full shadow-2xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end border-t border-border">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 rounded-sm bg-[#B78735] text-white text-xs font-semibold hover:bg-[#8F6929] transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md bg-card border border-border text-card-foreground p-6 rounded-lg shadow-lg">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="font-serif font-bold text-xl text-foreground">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter your current password and a new password to update your account.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const errors = { oldPassword: "", newPassword: "", confirmPassword: "" };
              let isValid = true;

              if (!passwordForm.oldPassword.trim()) {
                errors.oldPassword = "Old password is required";
                isValid = false;
              }
              if (!passwordForm.newPassword.trim()) {
                errors.newPassword = "New password is required";
                isValid = false;
              } else if (passwordForm.newPassword.length < 6) {
                errors.newPassword = "Password must be at least 6 characters";
                isValid = false;
              }
              if (!passwordForm.confirmPassword.trim()) {
                errors.confirmPassword = "Confirm password is required";
                isValid = false;
              } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
                isValid = false;
              }

              setPasswordErrors(errors);
              if (!isValid) return;

              setShowPasswordModal(false);
              setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
              setPasswordErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
              toast.success("Password updated successfully!");
            }}
            className="space-y-4 pt-2"
          >
            {/* Old Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Old password
              </label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, oldPassword: e.target.value });
                  if (passwordErrors.oldPassword)
                    setPasswordErrors((prev) => ({ ...prev, oldPassword: "" }));
                }}
                placeholder="Enter current password"
                className={`w-full bg-background border ${
                  passwordErrors.oldPassword ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring`}
              />
              {passwordErrors.oldPassword && (
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                New password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                  if (passwordErrors.newPassword)
                    setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                placeholder="Enter new password"
                className={`w-full bg-background border ${
                  passwordErrors.newPassword ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring`}
              />
              {passwordErrors.newPassword && (
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Confirm password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                  if (passwordErrors.confirmPassword)
                    setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                placeholder="Confirm new password"
                className={`w-full bg-background border ${
                  passwordErrors.confirmPassword ? "border-red-500" : "border-input"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring`}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="px-4 py-2 rounded-sm border border-border text-foreground hover:bg-secondary text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Update Password
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
