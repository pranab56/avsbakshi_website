"use client";

import { PhoneInput } from "@/components/ui/phone-input";

interface StepContactProps {
  formData: {
    email: string;
    phone: string;
    website: string;
    instagram: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

export default function StepContact({ formData, setFormData, errors }: StepContactProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Contact Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
            placeholder="e.g. contact@luxeglow.com"
            className={`w-full bg-accent/50 border ${
              errors.email ? "border-destructive" : "border-border"
            } rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
          />
          {errors.email && (
            <p className="text-destructive text-[11px] font-medium">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(val) => setFormData((prev: any) => ({ ...prev, phone: val || "" }))}
            placeholder="+1-555-019-2834"
          />
          {errors.phone && (
            <p className="text-destructive text-[11px] font-medium">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Website URL
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, website: e.target.value }))}
            placeholder="e.g. https://www.luxeglow.com"
            className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Instagram Handle
          </label>
          <input
            type="text"
            value={formData.instagram}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, instagram: e.target.value }))}
            placeholder="e.g. @luxeglowstudio"
            className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
