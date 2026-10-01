"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useCreateBusinessMutation } from "@/features/business/businessApi";
import { useCreateSalonMutation } from "@/features/salon/salonApi";
import { useUploadMutation } from "@/features/upload/uploadApi";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";

import OnboardingChoiceScreen from "./OnboardingChoiceScreen";
import OnboardingHeaderTimeline from "./OnboardingHeaderTimeline";
import OnboardingSidebarGraphic from "./OnboardingSidebarGraphic";
import StepSalonInfo from "./steps/StepSalonInfo";
import StepCategory from "./steps/StepCategory";
import StepContact from "./steps/StepContact";
import StepAddress from "./steps/StepAddress";
import StepSchedule from "./steps/StepSchedule";
import StepMedia from "./steps/StepMedia";

const STEP_SLUGS = ["saloninfo", "category", "contact", "address", "schedule", "media"];

const getStepUrl = (stepNumber: number) => {
  const stepsSlice = STEP_SLUGS.slice(0, stepNumber);
  return `/onboarding/business/${stepsSlice.join("+")}`;
};

export default function OnboardingWizard({ isBusinessRoute = false }: { isBusinessRoute?: boolean }) {
  const router = useRouter();
  const params = useParams();

  // User Profile & Salon Owner Status Check
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, { skip: !user });

  const profileData = profileResponse?.data;
  const isSalonOwner = Boolean(profileData?.isSalonOwner ?? user?.isSalonOwner);

  // Redirect existing salon owners away from onboarding
  useEffect(() => {
    if (!isProfileLoading && isSalonOwner) {
      toast.info("You already have an active Salon Business!");
      router.replace("/professional/dashboard");
    }
  }, [isSalonOwner, isProfileLoading, router]);

  // Parse step from URL path parameter (e.g. saloninfo+category+contact)
  const getStepFromParams = (): { step: number; isBusinessMode: boolean } => {
    const rawSlug = params?.slug;
    if (!rawSlug && !isBusinessRoute) {
      return { step: 1, isBusinessMode: false };
    }

    const slugStr = Array.isArray(rawSlug)
      ? decodeURIComponent(rawSlug.join("/"))
      : decodeURIComponent(rawSlug || "");

    if (!slugStr && !isBusinessRoute) {
      return { step: 1, isBusinessMode: false };
    }

    const stepsInUrl = slugStr.split("+").map((s) => s.trim().toLowerCase());
    const lastSlug = stepsInUrl[stepsInUrl.length - 1];
    const foundIndex = STEP_SLUGS.indexOf(lastSlug);

    if (foundIndex >= 0) {
      return { step: foundIndex + 1, isBusinessMode: true };
    }

    return { step: 1, isBusinessMode: true };
  };

  const initialRouteState = getStepFromParams();
  const [onboardingMode, setOnboardingMode] = useState<"choose" | "business_flow">(
    initialRouteState.isBusinessMode ? "business_flow" : "choose"
  );
  const [currentStep, setCurrentStep] = useState<number>(initialRouteState.step);

  const [createBusiness] = useCreateBusinessMutation();
  const [createSalon, { isLoading: isSubmitting }] = useCreateSalonMutation();
  const [uploadMedia, { isLoading: isUploading }] = useUploadMutation();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    businessType: "Hair & Beauty Salon",
    description: "",
    email: "",
    phone: "",
    website: "",
    instagram: "",
    line1: "",
    line2: "",
    city: "",
    state: "Oregon",
    postalCode: "",
    country: "United States",
    longitude: -122.9785,
    latitude: 44.0462,
    logo: "",
    photos: [] as string[],
    availability: [
      { day: "Monday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Tuesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Wednesday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Thursday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Friday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Saturday", openTime: "09:00", closeTime: "19:00", isAvailable: true },
      { day: "Sunday", openTime: "00:00", closeTime: "00:00", isAvailable: false },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync step from URL parameter changes (browser back/forward & refresh)
  useEffect(() => {
    const routeState = getStepFromParams();
    if (routeState.isBusinessMode) {
      setOnboardingMode("business_flow");
      setCurrentStep(routeState.step);
    } else {
      setOnboardingMode("choose");
    }
  }, [params?.slug, isBusinessRoute]);

  // Load saved form state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("salon_onboarding_formData");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setFormData((prev) => ({ ...prev, ...parsed }));
          }
        }
      } catch (e) {
        console.error("Error restoring onboarding form state:", e);
      }
    }
  }, []);

  // Save form data state to localStorage on changes
  useEffect(() => {
    if (typeof window !== "undefined" && onboardingMode === "business_flow") {
      try {
        localStorage.setItem("salon_onboarding_formData", JSON.stringify(formData));
      } catch (e) {
        console.error("Error saving onboarding form state:", e);
      }
    }
  }, [formData, onboardingMode]);

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
      latitude: Number(data.lat.toFixed(6)),
      longitude: Number(data.lng.toFixed(6)),
      line1: data.line1 || prev.line1,
      city: data.city || prev.city,
      state: data.state || prev.state,
      postalCode: data.postalCode || prev.postalCode,
      country: data.country || prev.country,
    }));
  };

  // Multiple Photos Upload
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
        console.error("Failed to upload image file:", file.name, err);
      }
    }

    if (newUploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newUploadedUrls],
        logo: prev.logo || newUploadedUrls[0],
      }));
      toast.success(`${newUploadedUrls.length} image(s) uploaded successfully!`);
    } else {
      toast.error("Failed to upload selected images.");
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

  // Skip Onboarding Action
  const handleSkipOnboarding = () => {
    toast.info("Onboarding skipped. You can set up your business profile anytime from your dashboard!");
    router.push("/professional/dashboard");
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Salon Name is required";
      if (!formData.description.trim()) newErrors.description = "Salon Description is required";
    } else if (step === 2) {
      if (!formData.businessType) newErrors.businessType = "Please select a business category";
    } else if (step === 3) {
      if (!formData.email.trim()) newErrors.email = "Contact Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    } else if (step === 4) {
      if (!formData.line1.trim()) {
        newErrors.line1 = "Please search and select a location from Google Maps";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      const nextStepNum = Math.min(currentStep + 1, 6);
      setCurrentStep(nextStepNum);
      router.push(getStepUrl(nextStepNum));
    } else {
      toast.error("Please fill in all required fields for this step");
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 1) {
      setOnboardingMode("choose");
      router.push("/onboarding");
    } else {
      const prevStepNum = Math.max(currentStep - 1, 1);
      setCurrentStep(prevStepNum);
      router.push(getStepUrl(prevStepNum));
    }
  };

  const navigateToStep = (targetStep: number) => {
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      router.push(getStepUrl(targetStep));
    }
  };

  const handleSubmitBusiness = async () => {
    if (!validateStep(4)) return;

    try {
      const defaultLogo = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";
      const defaultPhotos = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
      ];

      const extractedCity = formData.city.trim() || formData.line1.split(",")[0] || "Dhaka";
      const extractedState = formData.state.trim() || "Dhaka Division";
      const extractedPostalCode = formData.postalCode.trim() || "1219";
      const extractedCountry = formData.country.trim() || "Bangladesh";

      const payload = {
        name: formData.name.trim() || "Luxe Glow Studio & Spa",
        businessType: formData.businessType || "Hair & Beauty Salon",
        description: formData.description.trim() || "Full-service boutique salon specializing in modern hair styling, organic facials, and nail care.",
        logo: formData.logo || formData.photos[0] || defaultLogo,
        photos: formData.photos.length > 0 ? formData.photos : defaultPhotos,
        email: formData.email.trim() || "contact@luxeglow.com",
        phone: formData.phone.trim() || "+1-555-019-2834",
        website: formData.website.trim() || "https://www.luxeglow.com",
        instagram: formData.instagram.trim() || "@luxeglowstudio",
        availability: formData.availability,
        address: {
          line1: formData.line1.trim() || "Rampura Main Road",
          line2: formData.line2.trim() || "",
          city: extractedCity,
          state: extractedState,
          postalCode: extractedPostalCode,
          country: extractedCountry,
        },
        location: {
          type: "Point",
          coordinates: [Number(formData.longitude) || 90.4194, Number(formData.latitude) || 23.7612]
        }
      };

      try {
        await createBusiness({
          title: formData.name,
          quote: formData.businessType,
          bio: formData.description,
          experienceYears: 5,
          specialties: [formData.businessType],
          photos: formData.photos,
          startingPriceInUSD: 50,
        }).unwrap();
      } catch {
        // ignore fallback errors
      }

      await createSalon(payload).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("isSalonOwner", "true");
        localStorage.removeItem("salon_onboarding_formData");
      }
      toast.success("Salon Business created successfully! Welcome to your dashboard.");
      router.push("/professional/dashboard");
    } catch (err: any) {
      console.error("Create salon endpoint error:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to create salon business. Please check your information.";
      toast.error(errMsg);
    }
  };

  if (user && (isProfileLoading || isSalonOwner)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center p-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-foreground">
            {isSalonOwner
              ? "Salon Business already exists! Redirecting to your dashboard..."
              : "Verifying onboarding status..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row w-full overflow-hidden">
      {/* LEFT SIDE: Content & Multi-step Form Wizard (50% Width) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen overflow-y-auto">

        {/* Main Content Area */}
        <main className="my-auto py-8 w-full">
          {/* MODE 1: CHOOSE ONBOARDING OPTION */}
          {onboardingMode === "choose" && (
            <OnboardingChoiceScreen
              onSelectBusiness={() => {
                setOnboardingMode("business_flow");
                router.push(getStepUrl(1));
              }}
              onSelectSkip={handleSkipOnboarding}
            />
          )}

          {/* MODE 2: MULTI-STEP BUSINESS CREATION WIZARD */}
          {onboardingMode === "business_flow" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setOnboardingMode("choose");
                      router.push("/onboarding");
                    }}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to choices
                  </button>
                  <h2 className="font-serif italic font-normal text-2xl sm:text-3xl text-foreground">
                    Salon Business Setup
                  </h2>
                </div>
              </div>

              {/* Modern 6-Step Timeline Header */}
              <OnboardingHeaderTimeline
                currentStep={currentStep}
                onNavigateToStep={navigateToStep}
              />

              {/* STEP 1: SALON INFO */}
              {currentStep === 1 && (
                <StepSalonInfo formData={formData} setFormData={setFormData} errors={errors} />
              )}

              {/* STEP 2: BUSINESS CATEGORY */}
              {currentStep === 2 && (
                <StepCategory formData={formData} setFormData={setFormData} />
              )}

              {/* STEP 3: CONTACT & LINKS */}
              {currentStep === 3 && (
                <StepContact formData={formData} setFormData={setFormData} errors={errors} />
              )}

              {/* STEP 4: ADDRESS */}
              {currentStep === 4 && (
                <StepAddress
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  onLocationSelect={handleLocationSelect}
                />
              )}

              {/* STEP 5: SCHEDULE */}
              {currentStep === 5 && (
                <StepSchedule
                  formData={formData}
                  handleAvailabilityToggle={handleAvailabilityToggle}
                  handleAvailabilityTimeChange={handleAvailabilityTimeChange}
                />
              )}

              {/* STEP 6: MEDIA */}
              {currentStep === 6 && (
                <StepMedia
                  formData={formData}
                  handleMultiplePhotosUpload={handleMultiplePhotosUpload}
                  handleRemovePhoto={handleRemovePhoto}
                  isUploading={isUploading}
                />
              )}

              {/* Navigation Buttons Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Previous
                </button>

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitBusiness}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Salon...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Setup</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* RIGHT SIDE: Visual Split Screen Graphic (50% Width) */}
      <OnboardingSidebarGraphic />
    </div>
  );
}
