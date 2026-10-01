"use client";

interface StepSalonInfoProps {
  formData: {
    name: string;
    description: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

export default function StepSalonInfo({ formData, setFormData, errors }: StepSalonInfoProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200 pt-2">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground block">
          Salon Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g. Luxe Glow Studio & Spa"
          className={`w-full bg-accent/50 border ${
            errors.name ? "border-destructive" : "border-border"
          } rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
        />
        {errors.name && (
          <p className="text-destructive text-[11px] font-medium">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground block">
          Salon Description <span className="text-destructive">*</span>
        </label>
        <textarea
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
          placeholder="Full-service boutique salon specializing in modern hair styling, organic facials, and nail care."
          className={`w-full bg-accent/50 border ${
            errors.description ? "border-destructive" : "border-border"
          } rounded-xl p-3.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed transition-all`}
        />
        {errors.description && (
          <p className="text-destructive text-[11px] font-medium">{errors.description}</p>
        )}
      </div>
    </div>
  );
}
