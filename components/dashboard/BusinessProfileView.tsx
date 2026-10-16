"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
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
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BadgeCheck,
  User,
  Navigation,
  ChevronRight,
  Calendar,
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

const FALLBACK_SALON_PHOTOS = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
];

function ShowcasePhotoItem({
  src,
  alt,
  fallback,
  isCover,
  badgeText,
  onClick,
}: {
  src: string;
  alt: string;
  fallback: string;
  isCover?: boolean;
  badgeText?: string;
  onClick?: () => void;
}) {
  const [imgUrl, setImgUrl] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgUrl(src);
    setHasError(false);
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full rounded-2xl overflow-hidden border border-border group bg-accent shadow-2xs ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <Image
        src={hasError ? fallback : imgUrl}
        alt={alt}
        fill
        unoptimized
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgUrl(fallback);
          }
        }}
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
        <span className="text-white text-[11px] font-medium drop-shadow-sm truncate">
          {alt}
        </span>
      </div>
      {isCover && (
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-2 py-0.5 rounded-md border border-border/60 shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Cover Photo</span>
          </span>
        </div>
      )}
      {badgeText && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 text-white font-bold text-xs p-2 text-center group-hover:bg-black/70 transition-colors">
          <ImageIcon className="w-4 h-4 text-primary" />
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
}

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

  // Ref & State to synchronize right side image height with left side cards
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setLeftHeight(el.offsetHeight);
      } else {
        setLeftHeight(null);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [salonData, activeTab]);

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
      <div className="flex flex-col items-center justify-center min-h-[55vh] py-16 space-y-4 animate-in fade-in duration-300">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse" />
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute flex items-center justify-center text-primary">
            <Building2 className="w-5 h-5 animate-pulse" />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-foreground/80 font-sans">
            Salon Profile
          </p>
          <p className="text-[11px] text-muted-foreground">
            Fetching salon profile details...
          </p>
        </div>
      </div>
    );
  }

  const defaultBannerPhoto = formData.photos[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80";
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const availableDaysCount = formData.availability.filter((d) => d.isAvailable).length;

  return (
    <div className="space-y-8 pb-16 font-sans text-foreground">
      {/* Top Title Header & Quick Actions */}
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
      </div>

      {/* 5 Navigation Tabs Header with Underline Active Style */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-border overflow-x-auto scrollbar-none">
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
              className={`group relative pb-3.5 pt-2 px-1 text-xs sm:text-sm font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
              />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Salon Banner & Profile Identity Card */}
          <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-md">
            {/* Banner Image */}
            <div className="relative h-56 sm:h-72 w-full bg-accent/40">
              <Image
                src={formData.photos[0] || defaultBannerPhoto}
                alt={formData.name || "Salon Cover"}
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
            </div>

            {/* Overlapping Profile Info Strip */}
            <div className="relative p-6 sm:p-8 -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Salon Logo with verified badge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-card border-4 border-background shadow-2xl overflow-hidden shrink-0 ring-1 ring-border/50">
                  {formData.logo ? (
                    <Image
                      src={formData.logo}
                      alt={formData.name || "Salon Logo"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 text-primary flex items-center justify-center font-bold text-3xl font-serif">
                      {formData.name?.charAt(0) || "S"}
                    </div>
                  )}
                  <div
                    className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-1 rounded-full shadow-md"
                    title="Verified Business"
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Salon Name, Rating, Category, Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                      {formData.name || "Salon Business"}
                    </h2>
                    <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                      {activeCategoryName}
                    </span>
                  </div>

                  {/* Integrated Rating Strip (Directly in Profile Header) */}
                  <div className="flex items-center gap-3 text-xs flex-wrap">
                    <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      <div className="flex items-center text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${star <= Math.round(salonData?.avgRating || 0)
                              ? "fill-amber-500 text-amber-500"
                              : "text-amber-500/30"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {(salonData?.avgRating || 0).toFixed(1)}
                      </span>
                    </div>

                    <span className="text-muted-foreground font-medium">
                      {salonData?.totalReviews && salonData.totalReviews > 0
                        ? `${salonData.totalReviews} verified reviews`
                        : "0 reviews · New studio"}
                    </span>

                    <span className="text-muted-foreground/40">•</span>

                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {formData.address.city || "Pabna"}, {formData.address.country || "Bangladesh"}
                      </span>
                    </span>

                    {salonData?.createdAt && (
                      <>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>
                            Member since{" "}
                            {new Date(salonData.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl pt-0.5">
                    {formData.description || "No description provided yet."}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className="bg-card hover:bg-accent text-foreground border border-border text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("photos")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Manage Photos ({formData.photos.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Two-Column Content Grid: Left Contact & Info (5 cols) / Right Gallery & Hours (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: Business Info & Contacts */}
            <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-border pb-3.5">
                  <h3 className="font-serif font-bold text-base text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Business Information</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("edit")}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Contact Items */}
                <div className="space-y-4 text-xs">
                  {/* Phone */}
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">Phone Number</span>
                      {formData.phone ? (
                        <a
                          href={`tel:${formData.phone}`}
                          className="text-foreground hover:text-primary transition-colors hover:underline font-medium break-all"
                        >
                          {formData.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">Email Address</span>
                      {formData.email ? (
                        <a
                          href={`mailto:${formData.email}`}
                          className="text-foreground hover:text-primary transition-colors hover:underline font-medium break-all"
                        >
                          {formData.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 text-primary">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">Website</span>
                      {formData.website ? (
                        <a
                          href={formData.website.startsWith("http") ? formData.website : `https://${formData.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium inline-flex items-center gap-1 break-all"
                        >
                          <span>{formData.website.replace(/^https?:\/\//, "")}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 text-primary">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">Instagram</span>
                      {formData.instagram ? (
                        <a
                          href={
                            formData.instagram.startsWith("http")
                              ? formData.instagram
                              : `https://instagram.com/${formData.instagram.replace(/^@/, "")}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary transition-colors hover:underline font-medium"
                        >
                          {formData.instagram.startsWith("@") ? formData.instagram : `@${formData.instagram}`}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Address & GPS Map */}
                  <div className="flex items-start gap-3 text-muted-foreground pt-3 border-t border-border">
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="block font-semibold text-foreground">Salon Location</span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("location")}
                          className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
                        >
                          Edit Map
                        </button>
                      </div>
                      <p className="text-foreground font-medium">
                        {formData.address.line1 || "Street address not configured"}
                        {formData.address.line2 ? `, ${formData.address.line2}` : ""}
                      </p>
                      <p className="text-muted-foreground">
                        {[
                          formData.address.city,
                          formData.address.state,
                          formData.address.postalCode,
                          formData.address.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "City & Postal Code"}
                      </p>

                      {/* Coordinates & Google Maps CTA */}
                      <div className="pt-2 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-[11px] font-mono text-muted-foreground">
                          <Navigation className="w-3 h-3 text-primary" />
                          <span>
                            {Number(formData.location.coordinates[1]).toFixed(4)}° N,{" "}
                            {Number(formData.location.coordinates[0]).toFixed(4)}° E
                          </span>
                        </span>
                        <a
                          href={`https://www.google.com/maps?q=${formData.location.coordinates[1]},${formData.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Creator / Owner Card (from createdBy) */}
              {salonData?.createdBy && (
                <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-serif text-lg shrink-0">
                      {salonData.createdBy.firstName?.[0] || <User className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                          {salonData.createdBy.firstName} {salonData.createdBy.lastName}
                        </h4>
                        {salonData.createdBy.isSalonOwner && (
                          <span className="bg-primary/15 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                            Salon Owner
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {salonData.createdBy.email || "Registered Professional"}
                      </p>
                    </div>
                  </div>
                  {salonData.createdBy.phone?.number && (
                    <div className="text-[11px] text-muted-foreground flex items-center gap-2 pt-2 border-t border-border">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      <span>Direct: {salonData.createdBy.phone.number}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right 7 Cols: Photo Gallery Showcase */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Photo Gallery Showcase Card */}
              <div
                style={{ height: leftHeight ? `${leftHeight}px` : undefined }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col shadow-2xs h-full"
              >
                <div className="flex items-center justify-between border-b border-border pb-3.5 shrink-0">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <h3 className="font-serif font-bold text-base text-foreground">
                      Photo Gallery Showcase
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full">
                      {formData.photos.length} Photos
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("photos")}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Manage Gallery</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Dynamic Gallery Showcase matching left column height */}
                <div className="flex-1 min-h-[300px] sm:min-h-[360px] lg:min-h-0 pt-4">
                  {/* 0 Photos: Empty State */}
                  {formData.photos.length === 0 && (
                    <div className="w-full h-full border border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-accent/10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-foreground">No gallery photos yet</p>
                        <p className="text-[11px] text-muted-foreground max-w-xs">
                          Upload high quality pictures of your studio interior, services, and work.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("photos")}
                        className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm hover:bg-primary/90 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Salon Photos</span>
                      </button>
                    </div>
                  )}

                  {/* 1 Photo */}
                  {formData.photos.length === 1 && (
                    <div className="w-full h-full">
                      <ShowcasePhotoItem
                        src={formData.photos[0]}
                        alt="Featured Cover Photo"
                        fallback={FALLBACK_SALON_PHOTOS[0]}
                        isCover
                        onClick={() => setActiveTab("photos")}
                      />
                    </div>
                  )}

                  {/* 2 Photos */}
                  {formData.photos.length === 2 && (
                    <div className="grid grid-cols-2 gap-3 h-full">
                      <ShowcasePhotoItem
                        src={formData.photos[0]}
                        alt="Featured Cover Photo"
                        fallback={FALLBACK_SALON_PHOTOS[0]}
                        isCover
                        onClick={() => setActiveTab("photos")}
                      />
                      <ShowcasePhotoItem
                        src={formData.photos[1]}
                        alt="Salon Photo 2"
                        fallback={FALLBACK_SALON_PHOTOS[1]}
                        onClick={() => setActiveTab("photos")}
                      />
                    </div>
                  )}

                  {/* 3 Photos (User scenario) */}
                  {formData.photos.length === 3 && (
                    <div className="grid grid-cols-12 gap-3 h-full">
                      <div className="col-span-7 sm:col-span-8 h-full">
                        <ShowcasePhotoItem
                          src={formData.photos[0]}
                          alt="Featured Cover Photo"
                          fallback={FALLBACK_SALON_PHOTOS[0]}
                          isCover
                          onClick={() => setActiveTab("photos")}
                        />
                      </div>
                      <div className="col-span-5 sm:col-span-4 flex flex-col gap-3 h-full">
                        <div className="flex-1 min-h-0">
                          <ShowcasePhotoItem
                            src={formData.photos[1]}
                            alt="Salon Photo 2"
                            fallback={FALLBACK_SALON_PHOTOS[1]}
                            onClick={() => setActiveTab("photos")}
                          />
                        </div>
                        <div className="flex-1 min-h-0">
                          <ShowcasePhotoItem
                            src={formData.photos[2]}
                            alt="Salon Photo 3"
                            fallback={FALLBACK_SALON_PHOTOS[2]}
                            onClick={() => setActiveTab("photos")}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4 Photos */}
                  {formData.photos.length === 4 && (
                    <div className="grid grid-cols-12 gap-3 h-full">
                      <div className="col-span-7 sm:col-span-8 h-full">
                        <ShowcasePhotoItem
                          src={formData.photos[0]}
                          alt="Featured Cover Photo"
                          fallback={FALLBACK_SALON_PHOTOS[0]}
                          isCover
                          onClick={() => setActiveTab("photos")}
                        />
                      </div>
                      <div className="col-span-5 sm:col-span-4 flex flex-col gap-2.5 h-full">
                        {formData.photos.slice(1, 4).map((url, i) => (
                          <div key={i} className="flex-1 min-h-0">
                            <ShowcasePhotoItem
                              src={url}
                              alt={`Salon Photo ${i + 2}`}
                              fallback={FALLBACK_SALON_PHOTOS[(i + 1) % FALLBACK_SALON_PHOTOS.length]}
                              onClick={() => setActiveTab("photos")}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5 or more Photos */}
                  {formData.photos.length >= 5 && (
                    <div className="grid grid-cols-12 gap-3 h-full">
                      <div className="col-span-7 sm:col-span-7 h-full">
                        <ShowcasePhotoItem
                          src={formData.photos[0]}
                          alt="Featured Cover Photo"
                          fallback={FALLBACK_SALON_PHOTOS[0]}
                          isCover
                          onClick={() => setActiveTab("photos")}
                        />
                      </div>
                      <div className="col-span-5 sm:col-span-5 grid grid-cols-2 grid-rows-2 gap-2.5 h-full">
                        {formData.photos.slice(1, 5).map((url, i) => {
                          const isLastSlot = i === 3 && formData.photos.length > 5;
                          const remainingCount = formData.photos.length - 5;
                          return (
                            <div key={i} className="h-full min-h-0">
                              <ShowcasePhotoItem
                                src={url}
                                alt={`Salon Photo ${i + 2}`}
                                fallback={FALLBACK_SALON_PHOTOS[(i + 1) % FALLBACK_SALON_PHOTOS.length]}
                                badgeText={isLastSlot ? `+${remainingCount} More` : undefined}
                                onClick={() => setActiveTab("photos")}
                              />
                            </div>
                          );
                        })}
                      </div>
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
                  <Image src={formData.logo} alt="Salon Logo" fill unoptimized className="object-cover" />
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

          <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Update your salon&apos;s basic info, contact details, and category.</span>
            </p>
            <button
              type="button"
              onClick={() => handleSaveSalon("Profile Information")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Profile</span>
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

          <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Pin your salon on the map to help clients find you easily.</span>
            </p>
            <button
              type="button"
              onClick={() => handleSaveSalon("Location Details")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
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

          <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Appointments can only be booked during your active hours.</span>
            </p>
            <button
              type="button"
              onClick={() => handleSaveSalon("Operating Hours")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
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
                  unoptimized
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

          <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              Total {formData.photos.length} photo(s) in gallery
            </span>
            <button
              type="button"
              onClick={() => handleSaveSalon("Gallery Photos")}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Gallery Photos</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
