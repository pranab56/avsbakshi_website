"use client";

import dynamic from "next/dynamic";
import { MapPin, Loader2 } from "lucide-react";

const GoogleMapPicker = dynamic(() => import("@/components/shared/GoogleMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[360px] rounded-2xl bg-accent/40 animate-pulse border border-border flex items-center justify-center text-xs text-muted-foreground">
      <Loader2 className="w-5 h-5 animate-spin text-primary mr-2" />
      <span>Loading Google Map...</span>
    </div>
  ),
});

interface StepAddressProps {
  formData: {
    latitude: number;
    longitude: number;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
  onLocationSelect: (data: {
    lat: number;
    lng: number;
    line1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }) => void;
}

export default function StepAddress({
  formData,
  setFormData,
  errors,
  onLocationSelect,
}: StepAddressProps) {
  return (
    <div className="space-y-5 animate-in fade-in duration-200 pt-2">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Salon Location <span className="text-destructive">*</span></span>
        </label>
        <GoogleMapPicker
          lat={formData.latitude}
          lng={formData.longitude}
          addressLine1={formData.line1}
          onLocationSelect={onLocationSelect}
        />
        {errors.line1 && (
          <p className="text-destructive text-[11px] font-medium pt-1">{errors.line1}</p>
        )}
      </div>

      <div className="space-y-1.5 pt-1">
        <label className="text-xs font-semibold text-foreground block">
          Address Line 2 (Suite / Unit / Floor) <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={formData.line2}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, line2: e.target.value }))}
          placeholder="e.g. Suite 3B, Level 4"
          className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
    </div>
  );
}
