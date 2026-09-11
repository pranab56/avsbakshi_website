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
import { Plus, X, Eye, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "Profile" | "About Profile" | "Notifications" | "Privacy" | "Security";

export default function ProfessionalSettingsPage() {
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
      toast.success("Profile photo updated!");
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
    fullName: "Sophia Martinez",
    professionalTitle: "Senior Hair Stylist & Colorist",
    email: "sophia@noirstudio.com",
    phone: "+1 (212) 555-0199",
    location: "Soho, New York",
    startingPrice: "$45",
    experienceYears: "10",
    happyClients: "500+",
    philosophyQuote:
      '"My philosophy is simple — listen first, create second. Every client\'s hair has its own history, and I work with that history, not against it."',
    bio: "Award-winning hair stylist with 10+ years of experience specialising in colour, cuts, and transformations for all hair types. With a dedication to her craft and a calm, attentive approach to every client, Sofia has built a loyal following across New York over more than a decade behind the chair.",
  });

  // Specialities tags
  const [specialities, setSpecialities] = useState<string[]>([
    "Balayage",
    "Colour Correction",
    "Keratin Treatments",
    "Bridal Hair",
    "Short Cuts",
    "Curly Hair Specialist",
    "Extensions",
    "Toning",
  ]);
  const [newSpeciality, setNewSpeciality] = useState("");

  const handleAddSpeciality = () => {
    if (!newSpeciality.trim()) return;
    if (specialities.includes(newSpeciality.trim())) {
      toast.error("Speciality already exists!");
      return;
    }
    setSpecialities([...specialities, newSpeciality.trim()]);
    setNewSpeciality("");
    toast.success("Speciality tag added!");
  };

  const handleRemoveSpeciality = (tag: string) => {
    setSpecialities(specialities.filter((s) => s !== tag));
  };

  const handleSaveProfile = () => {
    toast.success("Profile & About Information updated successfully!");
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
            Account &amp; Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-1">
            Manage your personal credentials and customize what customers see on your public About page
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
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-foreground hover:bg-accent font-normal"
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tab Content Card */}
        <div className="flex-1 w-full bg-card border border-border rounded-lg p-6 sm:p-8 shadow-xs">
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: BASIC PROFILE INFORMATION */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                  Basic Profile Information
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update your display name, contact email, and professional title
                </p>
              </div>

              {/* Avatar Photo Section */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-md bg-muted text-foreground font-serif italic text-2xl flex items-center justify-center font-normal shadow-xs shrink-0 overflow-hidden border border-border">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>S</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-foreground">
                    {profileForm.fullName}
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
                    className="px-4 py-1.5 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Change photo
                  </button>
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, fullName: e.target.value })
                    }
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Professional Title / Specialty
                  </label>
                  <input
                    type="text"
                    value={profileForm.professionalTitle}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        professionalTitle: e.target.value,
                      })
                    }
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
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
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
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
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("About Profile")}
                  className="text-xs text-primary font-semibold underline hover:opacity-80"
                >
                  Configure Customer &quot;About&quot; Profile &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: PUBLIC "ABOUT" PROFILE (BIO, PHILOSOPHY, SPECIALITIES) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "About Profile" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
                    Public About Page Information
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Customize your biography, philosophy quote, specialities tags, and stats shown to customers
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="text-xs text-primary cursor-pointer font-semibold flex items-center gap-1 hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Personal Philosophy Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Personal Philosophy Quote</span>
                  <span className="text-[11px] text-muted-foreground font-normal">
                    Displayed prominently on your About tab
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
                  placeholder="e.g. My philosophy is simple — listen first, create second..."
                  className="w-full bg-accent/50 border border-border rounded-sm p-4 text-sm italic font-serif text-foreground outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Full Bio / Experience Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Detailed Bio &amp; Background
                </label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  placeholder="Write a warm introduction about your qualifications, experience, awards..."
                  className="w-full bg-accent/50 border border-border rounded-sm p-4 text-sm text-foreground leading-relaxed outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Experience Stats & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={profileForm.experienceYears}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        experienceYears: e.target.value,
                      })
                    }
                    placeholder="e.g. 10"
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                    placeholder="e.g. Soho, New York"
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Starting Service Price
                  </label>
                  <input
                    type="text"
                    value={profileForm.startingPrice}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        startingPrice: e.target.value,
                      })
                    }
                    placeholder="e.g. £45"
                    className="w-full bg-accent/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Specialities Tags Section */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-foreground block">
                  Specialities &amp; Technical Skills
                </label>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 bg-accent/30 p-4 rounded-lg border border-border min-h-[60px] items-center">
                  {specialities.map((spec) => (
                    <span
                      key={spec}
                      className="bg-accent text-foreground text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs border border-border"
                    >
                      <span>{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpeciality(spec)}
                        className="text-muted-foreground hover:text-red-500 cursor-pointer"
                        title="Remove speciality"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {specialities.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">
                      No specialities added yet. Add tags below.
                    </span>
                  )}
                </div>

                {/* Add Speciality Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSpeciality}
                    onChange={(e) => setNewSpeciality(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSpeciality())}
                    placeholder="Type speciality (e.g. Balayage, Bridal Hair)..."
                    className="flex-1 bg-accent/50 border border-border rounded-sm px-4 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpeciality}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-sm font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
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
                  className="px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Save About Profile Changes
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-4 py-2 rounded-sm border border-border text-foreground hover:bg-accent text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-primary" />
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
                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Booking confirmations
                    </span>
                    <Switch
                      checked={notifications.bookingConfirmations}
                      onCheckedChange={() =>
                        toggleNotification("bookingConfirmations")
                      }
                    />
                  </div>

                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Appointment reminders
                    </span>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={() =>
                        toggleNotification("appointmentReminders")
                      }
                    />
                  </div>

                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Cancellation alerts
                    </span>
                    <Switch
                      checked={notifications.cancellationAlerts}
                      onCheckedChange={() =>
                        toggleNotification("cancellationAlerts")
                      }
                    />
                  </div>

                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Reschedule requests
                    </span>
                    <Switch
                      checked={notifications.rescheduleRequests}
                      onCheckedChange={() =>
                        toggleNotification("rescheduleRequests")
                      }
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
                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      New client messages
                    </span>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={() => toggleNotification("newMessages")}
                    />
                  </div>

                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Unread message reminders
                    </span>
                    <Switch
                      checked={notifications.unreadReminders}
                      onCheckedChange={() =>
                        toggleNotification("unreadReminders")
                      }
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
                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Special promotional updates
                    </span>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={() => toggleNotification("specialOffers")}
                    />
                  </div>

                  <div className="bg-accent/40 px-4 py-3.5 rounded-lg flex items-center justify-between border border-border">
                    <span className="text-xs sm:text-sm text-foreground font-medium">
                      Loyalty &amp; reward alerts
                    </span>
                    <Switch
                      checked={notifications.loyaltyRewards}
                      onCheckedChange={() => toggleNotification("loyaltyRewards")}
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
                      Professional Profile Visibility
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Control whether your profile appears in public search results
                    </p>
                  </div>
                  <span className="bg-accent text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
                    Public
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-foreground">
                      Contact Number Visibility
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Show contact number on your public profile page
                    </p>
                  </div>
                  <span className="bg-accent text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
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
                  <span className="bg-accent text-foreground px-4 py-1.5 rounded-md text-xs font-medium shrink-0 border border-border">
                    Enabled
                  </span>
                </div>
              </div>

              {/* Danger Zone Box */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-5 sm:p-6 space-y-3 mt-8">
                <h3 className="font-serif font-bold text-lg text-red-500">
                  Danger Zone
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Permanently deactivate your professional profile and clear all listed services. This action cannot be undone.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Deactivate Professional Profile
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

              <div className="bg-accent/40 border border-border p-5 sm:p-6 rounded-lg space-y-3">
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
                    className="px-5 py-2.5 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CUSTOMER ABOUT PROFILE PREVIEW DIALOG MODAL */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="sm:max-w-4xl bg-card border border-border text-card-foreground p-6 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
            <div>
              <DialogTitle className="font-serif font-bold text-2xl text-foreground">
                Live Public Profile Preview
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                This is how customers will see your &quot;About&quot; section on your profile
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Customer View Mockup Card */}
          <div className="bg-accent/20 border border-border rounded-2xl p-6 shadow-sm space-y-6 mt-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-muted text-foreground font-serif italic text-2xl flex items-center justify-center font-normal shrink-0 overflow-hidden border border-border">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt={profileForm.fullName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>S</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-2xl text-foreground">
                      {profileForm.fullName}
                    </h2>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    {profileForm.professionalTitle} · {profileForm.experienceYears} years experience
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                    <span>★ 4.8 (312 reviews)</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {profileForm.location}
                    </span>
                    <span>·</span>
                    <span>from {profileForm.startingPrice}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-xs shadow-sm"
              >
                Book Appointment
              </button>
            </div>

            {/* Profile Tabs Bar */}
            <div className="border-b border-border flex gap-6 text-xs font-semibold text-muted-foreground">
              <span className="text-primary border-b-2 border-primary pb-2">About</span>
              <span className="pb-2">Services</span>
              <span className="pb-2">Portfolio</span>
              <span className="pb-2">Reviews</span>
              <span className="pb-2">Availability</span>
            </div>

            {/* Philosophy Quote */}
            {profileForm.philosophyQuote && (
              <div className="pl-4 border-l-2 border-primary italic font-serif text-lg text-foreground leading-relaxed bg-accent/40 p-4 rounded-r-xl">
                {profileForm.philosophyQuote}
              </div>
            )}

            {/* Bio Description */}
            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>{profileForm.bio}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-accent p-4 rounded-xl text-center space-y-0.5 border border-border">
                <div className="font-serif font-bold text-xl text-foreground">
                  {profileForm.experienceYears} years
                </div>
                <div className="text-[11px] text-muted-foreground">Experience</div>
              </div>

              <div className="bg-accent p-4 rounded-xl text-center space-y-0.5 border border-border">
                <div className="font-serif font-bold text-xl text-foreground">
                  {profileForm.happyClients}
                </div>
                <div className="text-[11px] text-muted-foreground">Happy clients</div>
              </div>

              <div className="bg-accent p-4 rounded-xl text-center space-y-0.5 border border-border">
                <div className="font-serif font-bold text-xl text-foreground">312</div>
                <div className="text-[11px] text-muted-foreground">Reviews</div>
              </div>

              <div className="bg-accent p-4 rounded-xl text-center space-y-0.5 border border-border">
                <div className="font-serif font-bold text-xl text-foreground">4.9★</div>
                <div className="text-[11px] text-muted-foreground">Average rating</div>
              </div>
            </div>

            {/* Specialities Chips */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                SPECIALITIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {specialities.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent text-foreground text-xs font-medium px-3 py-1.5 rounded-lg border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
                className={`w-full bg-accent/50 border ${
                  passwordErrors.oldPassword ? "border-red-500" : "border-border"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
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
                className={`w-full bg-accent/50 border ${
                  passwordErrors.newPassword ? "border-red-500" : "border-border"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
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
                className={`w-full bg-accent/50 border ${
                  passwordErrors.confirmPassword ? "border-red-500" : "border-border"
                } rounded-sm px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
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
                className="px-4 py-2 rounded-sm border border-border text-foreground hover:bg-accent text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
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

