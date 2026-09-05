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
import { toast } from "sonner";

type SettingsTab = "Profile" | "Notifications" | "Privacy" | "Security";

export default function CustomerSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: "Rachel",
    lastName: "Thompson",
    email: "rachel@example.com",
    phone: "+44 7700 900 123",
  });

  // Notifications Toggle States
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    appointmentReminders: true,
    cancellationAlerts: false,
    rescheduleRequests: false,
    newMessages: true,
    unreadReminders: true,
    specialOffers: true,
    loyaltyRewards: true,
    newProfessionals: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
        Settings
      </h1>

      {/* Main Settings Layout (Sidebar Navigation + Tab Content) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 bg-white border border-[#E3DDD3]/70 rounded-lg overflow-hidden shadow-xs divide-y divide-[#E3DDD3]/70">
          {(
            ["Profile", "Notifications", "Privacy", "Security"] as SettingsTab[]
          ).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-4 text-sm transition-all cursor-pointer ${isActive
                  ? "bg-[#E2DDD3] text-[#B78735] font-medium"
                  : "text-[#2C2E33] hover:bg-[#E2DDD3]/40 font-normal"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right Tab Content Card */}
        <div className="flex-1 w-full bg-white border border-[#E3DDD3]/70 rounded-lg p-6 sm:p-8">
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: PROFILE INFORMATION */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
                Profile Information
              </h2>

              {/* Avatar Photo Section */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-[#A27933] text-white font-serif italic text-2xl flex items-center justify-center font-normal shadow-xs shrink-0 overflow-hidden">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>R</span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-[#2C2E33]">
                    {profileForm.firstName} {profileForm.lastName}
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
                    className="px-4 py-1.5 rounded-xl bg-[#DFD9CE] hover:bg-[#D5CEBF] text-[#2C2E33] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Change photo
                  </button>
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2E33] block">
                    First name
                  </label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, firstName: e.target.value })
                    }
                    className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#A27933]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2E33] block">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, lastName: e.target.value })
                    }
                    className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#A27933]"
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
                    className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#A27933]"
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
                    className="w-full bg-[#DFD9CE] border-0 rounded-xl px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#A27933]"
                  />
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-2">
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg bg-[#b08a3e] hover:bg-[#9a742f] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: NOTIFICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Notifications" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
                Notification Preferences
              </h2>

              {/* APPOINTMENTS */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#787570] tracking-wider uppercase">
                  APPOINTMENTS
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Booking confirmations
                    </span>
                    <Switch
                      checked={notifications.bookingConfirmations}
                      onCheckedChange={() =>
                        toggleNotification("bookingConfirmations")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Appointment reminders
                    </span>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={() =>
                        toggleNotification("appointmentReminders")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Cancellation alerts
                    </span>
                    <Switch
                      checked={notifications.cancellationAlerts}
                      onCheckedChange={() =>
                        toggleNotification("cancellationAlerts")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Reschedule requests
                    </span>
                    <Switch
                      checked={notifications.rescheduleRequests}
                      onCheckedChange={() =>
                        toggleNotification("rescheduleRequests")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-[#787570] tracking-wider uppercase">
                  MESSAGES
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      New messages from professionals
                    </span>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={() => toggleNotification("newMessages")}
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Unread message reminders
                    </span>
                    <Switch
                      checked={notifications.unreadReminders}
                      onCheckedChange={() =>
                        toggleNotification("unreadReminders")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>
                </div>
              </div>

              {/* PROMOTIONS */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-[#787570] tracking-wider uppercase">
                  PROMOTIONS
                </h3>

                <div className="space-y-2.5">
                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Special offers
                    </span>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={() => toggleNotification("specialOffers")}
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      Loyalty rewards
                    </span>
                    <Switch
                      checked={notifications.loyaltyRewards}
                      onCheckedChange={() => toggleNotification("loyaltyRewards")}
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>

                  <div className="bg-[#F3F0EA] px-4 py-3.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#2C2E33] font-medium">
                      New professionals near you
                    </span>
                    <Switch
                      checked={notifications.newProfessionals}
                      onCheckedChange={() =>
                        toggleNotification("newProfessionals")
                      }
                      className="data-[state=checked]:bg-[#A27933]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: PRIVACY SETTINGS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Privacy" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
                Privacy Settings
              </h2>

              <div className="divide-y divide-[#E3DDD3]/70 space-y-4">
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-[#2C2E33]">
                      Profile visibility
                    </h4>
                    <p className="text-xs text-[#787570]">
                      Control who can see your profile information
                    </p>
                  </div>
                  <span className="bg-[#DFD9CE] text-[#2C2E33] px-4 py-1.5 rounded-xl text-xs font-medium shrink-0">
                    Private
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-[#2C2E33]">
                      Search history
                    </h4>
                    <p className="text-xs text-[#787570]">
                      Your search and browsing history
                    </p>
                  </div>
                  <span className="bg-[#DFD9CE] text-[#2C2E33] px-4 py-1.5 rounded-xl text-xs font-medium shrink-0">
                    Stored for 90 days
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-xs sm:text-sm text-[#2C2E33]">
                      Data usage
                    </h4>
                    <p className="text-xs text-[#787570]">
                      How we use your data to improve recommendations
                    </p>
                  </div>
                  <span className="bg-[#DFD9CE] text-[#2C2E33] px-4 py-1.5 rounded-xl text-xs font-medium shrink-0">
                    Enabled
                  </span>
                </div>
              </div>

              {/* Danger Zone Box */}
              <div className="bg-[#F6EBEB] border border-[#E9C5C5] rounded-2xl p-5 sm:p-6 space-y-3 mt-8">
                <h3 className="font-serif font-bold text-lg text-[#C84B4B]">
                  Danger Zone
                </h3>
                <p className="text-xs text-[#8A5A5A] leading-relaxed">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    className="border border-[#C84B4B] text-[#C84B4B] hover:bg-[#C84B4B] hover:text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: SECURITY */}
          {/* ------------------------------------------------------------- */}
          {activeTab === "Security" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
                Security
              </h2>

              <div className="bg-[#F3F0EA]/80 p-5 sm:p-6 rounded-lg space-y-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#2C2E33]">Password</h4>
                  <p className="text-xs text-[#787570]">
                    Last changed 3 months ago
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="px-5 py-2.5 rounded-lg bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Dialog Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF9] border border-[#E3DDD3]/70 text-[#2C2E33] p-6 rounded-lg shadow-lg">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="font-serif font-bold text-xl text-[#2C2E33]">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-xs text-[#787570]">
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
            }}
            className="space-y-4 pt-2"
          >
            {/* Old Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
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
                className={`w-full bg-[#FAF8F4] border ${passwordErrors.oldPassword ? "border-[#DC3545]" : "border-[#E3DDD3]/70"
                  } rounded-sm px-4 py-2.5 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]`}
              />
              {passwordErrors.oldPassword && (
                <p className="text-[11px] text-[#DC3545] font-medium mt-1">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
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
                className={`w-full bg-[#FAF8F4] border ${passwordErrors.newPassword ? "border-[#DC3545]" : "border-[#E3DDD3]/70"
                  } rounded-sm px-4 py-2.5 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]`}
              />
              {passwordErrors.newPassword && (
                <p className="text-[11px] text-[#DC3545] font-medium mt-1">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
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
                className={`w-full bg-[#FAF8F4] border ${passwordErrors.confirmPassword ? "border-[#DC3545]" : "border-[#E3DDD3]/70"
                  } rounded-sm px-4 py-2.5 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735]`}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-[11px] text-[#DC3545] font-medium mt-1">
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
                className="px-4 py-2 rounded-sm border border-[#E3DDD3] text-[#2C2E33] hover:bg-[#F3F0EA] text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs font-medium transition-colors cursor-pointer"
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