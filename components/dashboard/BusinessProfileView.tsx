"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toast } from "sonner";

import {
  Building2,
  MapPin,
  Clock,
  ImageIcon,
  Edit3,
  Globe,
  Instagram,
  Phone,
  Mail,
  Star,
  Upload,
  Trash2,
  Loader2,
  Eye,
  CalendarCheck,
  DollarSign,
  Save,
} from "lucide-react";
import { useGetMySalonQuery, useUpdateSalonMutation } from "@/features/salon/salonApi";
import { useUploadMutation } from "@/features/upload/uploadApi";
import { useGetAllCategoryQuery } from "@/features/category/category";
import { PhoneInput } from "@/components/ui/phone-input";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";

const GoogleMapPicker = dynamic(() => import("@/components/shared/GoogleMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[360px] rounded-2xl bg-accent/40 animate-pulse border border-border flex items-center justify-center text-xs text-muted-foreground">
      <Loader2 className="w-5 h-5 animate-spin text-primary mr-2" />
      <span>Loading Google Map...</span>
    </div>
  ),
});

export default function BusinessProfileView() {
  const [activeTab, setActiveTab] = useState<"overview" | "edit" | "location" | "hours" | "photos">("overview");

  // RTK Query Hooks
  const { data: salonResponse, isLoading: isSalonLoading } = useGetMySalonQuery(undefined);
  const { data: categoryResponse, isLoading: isCategoriesLoading } = useGetAllCategoryQuery({});
  const [updateSalon, { isLoading: isUpdating }] = useUpdateSalonMutation();
  const [uploadMedia, { isLoading: isUploading }] = useUploadMutation();

  const salonData = salonResponse?.data;
  const categoriesList = Array.isArray(categoryResponse?.data)
    ? categoryResponse.data
    : Array.isArray(categoryResponse)
      ? categoryResponse
      : [];

  // Business Form State
  const [formData, setFormData] = useState({
    name: "",
    businessType: "Hair & Beauty Salon",
    description: "",
    logo: "",
    photos: [] as string[],
    email: "",
    phone: "",
    website: "",
    instagram: "",
    availability: [
      { day: "Monday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Tuesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Wednesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Thursday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Friday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Saturday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Sunday", openTime: "00:00", closeTime: "00:00", isAvailable: false },
    ],
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    location: {
      type: "Point",
      coordinates: [90.4194, 23.7612],
    },
  });

  // Populate form data when salonData is fetched
  useEffect(() => {
    if (salonData) {
      const initialBusinessType =
        (typeof salonData.category === "object" ? salonData.category?.name : null) ||
        salonData.category ||
        salonData.businessType ||
        "Hair & Beauty Salon";

      setFormData({
        name: salonData.name || "",
        businessType: initialBusinessType,
        description: salonData.description || "",
        logo: salonData.logo || "",
        photos: Array.isArray(salonData.photos) ? salonData.photos : [],
        email: salonData.email || "",
        phone: salonData.phone || "",
        website: salonData.website || "",
        instagram: salonData.instagram || "",
        availability: Array.isArray(salonData.availability) && salonData.availability.length > 0
          ? salonData.availability
          : [
            { day: "Monday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Tuesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Wednesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Thursday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Friday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Saturday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
            { day: "Sunday", openTime: "00:00", closeTime: "00:00", isAvailable: false },
          ],
        address: {
          line1: salonData.address?.line1 || "",
          line2: salonData.address?.line2 || "",
          city: salonData.address?.city || "",
          state: salonData.address?.state || "",
          postalCode: salonData.address?.postalCode || "",
          country: salonData.address?.country || "",
        },
        location: {
          type: "Point",
          coordinates: Array.isArray(salonData.location?.coordinates)
            ? [salonData.location.coordinates[0], salonData.location.coordinates[1]]
            : [90.4194, 23.7612],
        },
      });
    }
  }, [salonData]);

  // When categories load, if current businessType is an _id, resolve to category name
  useEffect(() => {
    if (formData.businessType && categoriesList.length > 0) {
      const matchedById = categoriesList.find((c: any) => c._id === formData.businessType);
      if (matchedById?.name) {
        setFormData((prev) => ({ ...prev, businessType: matchedById.name }));
      }
    }
  }, [categoriesList, formData.businessType]);

  // Prepared category options for Combobox
  const categoryOptions: ComboboxOption[] = categoriesList.map((cat: any) => ({
    value: cat.name || cat._id,
    label: cat.name || "Category",
    description: cat.totalServices !== undefined ? `${cat.totalServices} service(s) available` : undefined,
  }));

  const displayCategoryOptions = [...categoryOptions];
  if (
    formData.businessType &&
    !displayCategoryOptions.some((opt) => opt.value === formData.businessType)
  ) {
    displayCategoryOptions.unshift({
      value: formData.businessType,
      label: formData.businessType,
    });
  }

  const activeCategoryName =
    categoriesList.find(
      (c: any) => c._id === formData.businessType || c.name === formData.businessType
    )?.name ||
    formData.businessType ||
    "Hair & Beauty Salon";

  // Single Logo Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
    try {
      const res = await uploadMedia(uploadFormData).unwrap();
      const url = res?.data?.images?.[0];
      if (url) {
        setFormData((prev) => ({ ...prev, logo: url }));
        toast.success("Logo uploaded successfully!");
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      toast.error("Failed to upload logo.");
    }
  };

  // Multiple Photos Gallery Upload
  const handleMultiplePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const newUploadedUrls: string[] = [];

    toast.info(`Uploading ${fileArray.length} image(s)...`);

    for (const file of fileArray) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);
      try {
        const res = await uploadMedia(uploadFormData).unwrap();
        const url = res?.data?.images?.[0];
        if (url) {
          newUploadedUrls.push(url);
        }
      } catch (err) {
        console.error("Failed to upload photo file:", file.name, err);
      }
    }

    if (newUploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newUploadedUrls],
        logo: prev.logo || newUploadedUrls[0],
      }));
      toast.success(`${newUploadedUrls.length} image(s) uploaded successfully!`);
    }
  };

  const handleRemovePhoto = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p !== url),
    }));
  };

  const handleAvailabilityToggle = (index: number) => {
    setFormData((prev) => {
      const updated = [...prev.availability];
      updated[index] = {
        ...updated[index],
        isAvailable: !updated[index].isAvailable,
      };
      return { ...prev, availability: updated };
    });
  };

  const handleAvailabilityTimeChange = (
    index: number,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.availability];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, availability: updated };
    });
  };

  const handleLocationSelect = (data: {
    lat: number;
    lng: number;
    line1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        type: "Point",
        coordinates: [Number(data.lng.toFixed(6)), Number(data.lat.toFixed(6))],
      },
      address: {
        ...prev.address,
        line1: data.line1 || prev.address.line1,
        city: data.city || prev.address.city,
        state: data.state || prev.address.state,
        postalCode: data.postalCode || prev.address.postalCode,
        country: data.country || prev.address.country,
      },
    }));
  };

  // Submit Update Salon Payload
  const handleSaveSalon = async (sectionName: string) => {
    if (!salonData?._id) {
      toast.error("Salon ID not found. Please reload page.");
      return;
    }

    try {
      const extractedCity = formData.address.city.trim() || formData.address.line1.split(",")[0] || "Dhaka";
      const extractedState = formData.address.state.trim() || "Dhaka Division";
      const extractedPostalCode = formData.address.postalCode.trim() || "1219";
      const extractedCountry = formData.address.country.trim() || "Bangladesh";

      const matchedCat = categoriesList.find(
        (c: any) => c.name === formData.businessType || c._id === formData.businessType
      );

      const payload: any = {
        name: formData.name.trim() || "Luxe Glow Studio & Spa",
        businessType: matchedCat?.name || formData.businessType || "Hair & Beauty Salon",
        description: formData.description.trim() || "Full-service boutique salon specializing in modern hair styling and beauty treatments.",
        logo: formData.logo || formData.photos[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        photos: formData.photos.length > 0 ? formData.photos : ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"],
        email: formData.email.trim() || "contact@luxeglow.com",
        phone: formData.phone.trim() || "+1-555-019-2834",
        website: formData.website.trim() || "https://www.luxeglow.com",
        instagram: formData.instagram.trim() || "@luxeglowstudio",
        availability: formData.availability,
        address: {
          line1: formData.address.line1.trim() || "Dhaka, Bangladesh",
          line2: formData.address.line2.trim() || "",
          city: extractedCity,
          state: extractedState,
          postalCode: extractedPostalCode,
          country: extractedCountry,
        },
        location: {
          type: "Point",
          coordinates: [
            Number(formData.location.coordinates[0]) || 90.4194,
            Number(formData.location.coordinates[1]) || 23.7612,
          ],
        },
      };

      if (matchedCat?._id) {
        payload.category = matchedCat._id;
      }

      const res = await updateSalon({ salonId: salonData._id, data: payload }).unwrap();
      toast.success(res?.message || `${sectionName} updated successfully!`);
    } catch (err: any) {
      console.error("Failed to update salon:", err);
      toast.error(err?.data?.message || err?.message || `Failed to update ${sectionName}.`);
    }
  };

  if (isSalonLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Fetching salon profile details...</p>
        </div>
      </div>
    );
  }

  const defaultBannerPhoto = formData.photos[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="space-y-8 pb-16 font-sans text-foreground">
      {/* Top Title Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Salon Business Management</span>
          </div>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground pt-1">
            Business Profile
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your salon information, location map, business hours, and photo gallery.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSaveSalon("Business Profile")}
            disabled={isUpdating}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* 5 Navigation Tabs Header */}
      <div className="flex items-center gap-2 border-b border-border overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: "overview", label: "Overview", icon: Eye },
          { key: "edit", label: "Edit Profile", icon: Edit3 },
          { key: "location", label: "Location", icon: MapPin },
          { key: "hours", label: "Business Hours", icon: Clock },
          { key: "photos", label: "Photos", icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Salon Banner Card */}
          <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-md">
            <div className="relative h-48 sm:h-60 w-full bg-accent/40">
              <Image
                src={defaultBannerPhoto}
                alt={formData.name || "Salon Cover"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            <div className="relative p-6 sm:p-8 -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-card border-4 border-background shadow-xl overflow-hidden shrink-0">
                  {formData.logo ? (
                    <Image src={formData.logo} alt={formData.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center font-bold text-3xl font-serif">
                      {formData.name?.charAt(0) || "S"}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                      {formData.name || "Salon Business"}
                    </h2>
                    <span className="bg-primary/15 text-primary text-[11px] font-bold px-3 py-1 rounded-full border border-primary/20">
                      {activeCategoryName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {formData.description || "No description provided yet."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className="bg-card hover:bg-accent text-foreground border border-border text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Card & Key Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Contact & Address Overview (1 col) */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-serif font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Business Info</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">Phone Number</span>
                    <span>{formData.phone || "Not provided"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">Email Address</span>
                    <span className="break-all">{formData.email || "Not provided"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">Website</span>
                    <span className="break-all">{formData.website || "Not provided"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <Instagram className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">Instagram</span>
                    <span>{formData.instagram || "Not provided"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground pt-1 border-t border-border">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">Salon Location</span>
                    <span>
                      {formData.address.line1 || "Location not configured"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Statistics & Performance Overview Grid (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5 space-y-1 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-foreground">247</p>
                  <p className="text-xs text-muted-foreground font-medium">Total Bookings</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5 space-y-1 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                    <Star className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-foreground">4.9 ★</p>
                  <p className="text-xs text-muted-foreground font-medium">Average Rating</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5 space-y-1 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-foreground">$6,420</p>
                  <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
                </div>
              </div>

              {/* Photos Gallery Preview */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span>Photo Gallery Showcase</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("photos")}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    View All ({formData.photos.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.photos.slice(0, 4).map((photoUrl, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-accent">
                      <Image src={photoUrl} alt="Gallery Photo" fill className="object-cover" />
                    </div>
                  ))}
                  {formData.photos.length === 0 && (
                    <div className="col-span-full border border-dashed border-border rounded-xl p-6 text-center text-xs text-muted-foreground italic">
                      No photos uploaded yet. Click &quot;Photos&quot; tab to upload gallery images.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EDIT PROFILE */}
      {activeTab === "edit" && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs max-w-3xl">
          <div className="border-b border-border pb-4">
            <h2 className="font-serif font-bold text-xl text-foreground">Edit Salon Profile</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your business name, logo image, category, contact information, and biography.
            </p>
          </div>

          {/* Logo Upload Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground block">Salon Logo Image</label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl border border-border overflow-hidden bg-accent shrink-0">
                {formData.logo ? (
                  <Image src={formData.logo} alt="Salon Logo" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl">
                    {formData.name?.charAt(0) || "S"}
                  </div>
                )}
              </div>

              <label className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors inline-flex items-center gap-2 shadow-2xs">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>Upload Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">Salon Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Luxe Glow Studio & Spa"
                className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground block">Business Category</label>
                {isCategoriesLoading && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    <span>Loading categories...</span>
                  </span>
                )}
              </div>
              <Combobox
                options={displayCategoryOptions}
                value={formData.businessType}
                onChange={(val) => setFormData({ ...formData, businessType: val })}
                placeholder={isCategoriesLoading ? "Loading categories..." : "Select business category..."}
                searchable
                searchPlaceholder="Search category..."
                triggerClassName="w-full bg-accent/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs h-12"
                labelClassName="font-normal text-sm text-foreground"
                align="start"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">Salon Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Full-service boutique salon specializing in modern hair styling and beauty care..."
                className="w-full bg-accent/50 border border-border rounded-xl p-3.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Contact Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@luxeglow.com"
                  className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Phone Number</label>
                <PhoneInput
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val || "" })}
                  placeholder="+1-555-019-2834"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.luxeglow.com"
                  className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">Instagram Handle</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@luxeglowstudio"
                  className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => handleSaveSalon("Profile Information")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: LOCATION */}
      {activeTab === "location" && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs max-w-4xl">
          <div className="border-b border-border pb-4">
            <h2 className="font-serif font-bold text-xl text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Salon Location &amp; Map</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Search and pin your salon address directly on Google Maps so customers can locate your business.
            </p>
          </div>

          <GoogleMapPicker
            lat={formData.location.coordinates[1]}
            lng={formData.location.coordinates[0]}
            addressLine1={formData.address.line1}
            onLocationSelect={handleLocationSelect}
          />

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-foreground block">
              Address Line 2 (Suite / Unit / Floor) <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.address.line2}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, line2: e.target.value },
                })
              }
              placeholder="e.g. Suite 3B, Level 4"
              className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => handleSaveSalon("Location Details")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Location</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: BUSINESS HOURS */}
      {activeTab === "hours" && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs max-w-3xl">
          <div className="border-b border-border pb-4">
            <h2 className="font-serif font-bold text-xl text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Weekly Operating Hours</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configure your salon opening and closing hours for each day of the week.
            </p>
          </div>

          <div className="space-y-2.5">
            {formData.availability.map((dayItem, idx) => (
              <div
                key={dayItem.day}
                className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 gap-4"
              >
                <div className="flex items-center gap-3 w-32 shrink-0">
                  <input
                    type="checkbox"
                    checked={dayItem.isAvailable}
                    onChange={() => handleAvailabilityToggle(idx)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {dayItem.day}
                  </span>
                </div>

                {dayItem.isAvailable ? (
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <input
                      type="time"
                      value={dayItem.openTime}
                      onChange={(e) =>
                        handleAvailabilityTimeChange(idx, "openTime", e.target.value)
                      }
                      className="bg-accent/50 border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                    <span className="text-xs text-muted-foreground">to</span>
                    <input
                      type="time"
                      value={dayItem.closeTime}
                      onChange={(e) =>
                        handleAvailabilityTimeChange(idx, "closeTime", e.target.value)
                      }
                      className="bg-accent/50 border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic text-right flex-1">
                    Closed
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => handleSaveSalon("Operating Hours")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Operating Hours</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: PHOTOS */}
      {activeTab === "photos" && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-foreground flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                <span>Salon Interior &amp; Gallery Photos</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload and manage high-resolution photos of your salon space, styling stations, and interior layout.
              </p>
            </div>

            <label className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 shrink-0">
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>Upload New Photos</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultiplePhotosUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.photos.map((photoUrl, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden border border-border group bg-accent shadow-2xs"
              >
                <Image
                  src={photoUrl}
                  alt={`Salon Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photoUrl)}
                    className="bg-destructive text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <label className="border-2 border-dashed border-border hover:border-primary bg-accent/20 hover:bg-accent/40 rounded-2xl aspect-square flex flex-col items-center justify-center p-4 cursor-pointer transition-all text-center group">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Upload Photos</span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultiplePhotosUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total {formData.photos.length} photo(s) in gallery</span>
            <button
              type="button"
              onClick={() => handleSaveSalon("Gallery Photos")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Photo Gallery</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
