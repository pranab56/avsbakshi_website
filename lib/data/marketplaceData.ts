import { ServiceCategory, SalonItem, SalonTypeCategory, ProfessionalItem } from "@/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [];

export const SALON_TYPES: SalonTypeCategory[] = [
  { id: "all", name: "All Salons", slug: "all" },
  { id: "hair-salon", name: "Hair Salons", slug: "hair-salons" },
  { id: "nail-salon", name: "Nail Salons", slug: "nail-salons" },
  { id: "beauty-salon", name: "Beauty Salons", slug: "beauty-salons" },
  { id: "barber-shop", name: "Barber Shops", slug: "barber-shops" },
  { id: "spa-medspa", name: "Spa & MedSpa", slug: "spa-medspa" },
  { id: "lash-brow", name: "Lash & Brow Studios", slug: "lash-brow-studios" },
  { id: "massage-wellness", name: "Massage & Wellness", slug: "massage-wellness" },
];

export const SALONS_DATA: SalonItem[] = [];

export const PROFESSIONALS_DATA: ProfessionalItem[] = [];

// Helper functions for dynamic data readiness
export function getServiceCategories(): ServiceCategory[] {
  return SERVICE_CATEGORIES;
}

export function getSalonTypes(): SalonTypeCategory[] {
  return SALON_TYPES;
}

export function getSalonsData(selectedTypeSlug?: string): SalonItem[] {
  if (!selectedTypeSlug || selectedTypeSlug === "all") {
    return SALONS_DATA;
  }
  const targetType = SALON_TYPES.find((t) => t.slug === selectedTypeSlug || t.name === selectedTypeSlug);
  if (!targetType) return SALONS_DATA;
  return SALONS_DATA.filter((s) => s.salonType === targetType.name);
}

export function getSalonById(id: number | string): SalonItem | undefined {
  return SALONS_DATA.find((s) => String(s.id) === String(id));
}

export function getProfessionalsData(): ProfessionalItem[] {
  return PROFESSIONALS_DATA;
}

export function getProfessionalById(id: string): ProfessionalItem | undefined {
  return PROFESSIONALS_DATA.find((p) => String(p.id) === String(id));
}

export function getProfessionalsBySalon(salonId: number | string): ProfessionalItem[] {
  return PROFESSIONALS_DATA.filter((p) => String(p.salonId) === String(salonId));
}
