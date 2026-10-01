"use client";

import { Check } from "lucide-react";

interface StepCategoryProps {
  formData: {
    businessType: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CATEGORIES = [
  { title: "Hair & Beauty Salon", icon: "💇‍♀️", desc: "Hair styling, coloring & cuts" },
  { title: "Barbershop", icon: "💈", desc: "Men's grooming, beard & fades" },
  { title: "Nail Studio", icon: "💅", desc: "Manicure, pedicure & nail art" },
  { title: "Spa & Wellness", icon: "🧘‍♀️", desc: "Facials, massage & therapies" },
  { title: "Beauty Clinic", icon: "✨", desc: "Advanced skincare aesthetics" },
  { title: "Makeup Studio", icon: "💄", desc: "Bridal, glam & event makeup" },
];

export default function StepCategory({ formData, setFormData }: StepCategoryProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200 pt-2">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground block">
          Select Business Category <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.businessType === cat.title;
            return (
              <div
                key={cat.title}
                onClick={() => setFormData((prev: any) => ({ ...prev, businessType: cat.title }))}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? "bg-primary/10 border-primary text-foreground ring-1 ring-primary/30 shadow-xs"
                    : "bg-accent/40 border-border hover:border-primary/40 hover:bg-accent/70 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{cat.icon}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border bg-background"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {cat.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-1">
                    {cat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
