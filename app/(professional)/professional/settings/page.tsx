"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangePasswordMutation,
} from "@/features/profile/profileApi";
import { PhoneInput } from "@/components/ui/phone-input";

type SettingsTab = "Profile" | "Security";

export default function ProfessionalSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Visibility States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // RTK Query Hooks
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined);
  const [updateMyProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const profileData = profileResponse?.data;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Profile photo preview updated!");
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
    fullName: "Sophia Martinez",
    professionalTitle: "Senior Hair Stylist & Colorist",
    email: "sophia@noirstudio.com",
    phone: "+12125550199",
  });

  // Sync profile data from API GET response
  useEffect(() => {
    if (profileData) {
      setProfileForm((prev) => ({
        ...prev,
        fullName: profileData.firstName
          ? `${profileData.firstName} ${profileData.lastName || ''}`.trim()
          : prev.fullName,
        email: profileData.email || prev.email,
        phone: typeof profileData.phone === "object" ? profileData.phone?.number || "" : profileData.phone || prev.phone,
      }));
      if (profileData.image) {
        setAvatarPreview(profileData.image);
      }
    }
  }, [profileData]);

  const handleSaveProfile = async () => {
    try {
      const nameParts = profileForm.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const payload = {
        firstName,
        lastName,
        image: avatarPreview || profileData?.image || "",
        phone: {
          countryCode: profileData?.phone?.countryCode || "",
          number: profileForm.phone || "",
        },
        address: {
          line1: profileData?.address?.line1 || "",
          line2: profileData?.address?.line2 || "",
          city: profileData?.address?.city || "",
          state: profileData?.address?.state || "",
          country: profileData?.address?.country || "",
          postalCode: profileData?.address?.postalCode || "",
        },
        location: {
          type: profileData?.location?.type || "Point",
          coordinates: profileData?.location?.coordinates || [0, 0],
        },
      };

      const res = await updateMyProfile(payload).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update profile");
    }
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
            Manage your personal profile and account credentials
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
              "Security",
            ] as SettingsTab[]
          ).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-4 text-sm transition-all cursor-pointer flex items-center justify-between ${isActive
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

              {isProfileLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
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
                        <span>{profileForm.fullName ? profileForm.fullName[0].toUpperCase() : "P"}</span>
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
                        readOnly
                        disabled
                        className="w-full bg-accent/60 border border-border rounded-sm px-4 py-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground block">
                        Phone Number
                      </label>
                      <PhoneInput
                        value={profileForm.phone}
                        onChange={(val) =>
                          setProfileForm({ ...profileForm, phone: val || "" })
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Save Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                    >
                      {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: SECURITY */}
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
            onSubmit={async (e) => {
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

              try {
                const payload = {
                  currentPassword: passwordForm.oldPassword,
                  newPassword: passwordForm.newPassword,
                  confirmPassword: passwordForm.confirmPassword,
                };
                const res = await changePassword(payload).unwrap();
                toast.success(res?.message || "Password changed successfully!");
                setShowPasswordModal(false);
                setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
                setPasswordErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
              } catch (err: any) {
                toast.error(err?.data?.message || err?.message || "Failed to change password");
              }
            }}
            className="space-y-4 pt-2"
          >
            {/* Old Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Old password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={passwordForm.oldPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, oldPassword: e.target.value });
                    if (passwordErrors.oldPassword)
                      setPasswordErrors((prev) => ({ ...prev, oldPassword: "" }));
                  }}
                  placeholder="Enter current password"
                  className={`w-full bg-accent/50 border ${passwordErrors.oldPassword ? "border-destructive" : "border-border"
                    } rounded-sm px-4 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.oldPassword && (
                <p className="text-[11px] text-destructive font-medium mt-1">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                New password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                    if (passwordErrors.newPassword)
                      setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                  }}
                  placeholder="Enter new password"
                  className={`w-full bg-accent/50 border ${passwordErrors.newPassword ? "border-destructive" : "border-border"
                    } rounded-sm px-4 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-[11px] text-destructive font-medium mt-1">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => {
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                    if (passwordErrors.confirmPassword)
                      setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="Confirm new password"
                  className={`w-full bg-accent/50 border ${passwordErrors.confirmPassword ? "border-destructive" : "border-border"
                    } rounded-sm px-4 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-[11px] text-destructive font-medium mt-1">
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
                disabled={isChangingPassword}
                className="px-5 py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
              >
                {isChangingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isChangingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

