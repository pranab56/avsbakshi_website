import { ServiceCategory, SalonItem, SalonTypeCategory } from "@/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hair",
    title: "Hair Care & Styling",
    slug: "hair",
    desc: "Cuts, coloring, balayage, blowouts & treatments",
    count: "1,842",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "hair-cuts",
        name: "Cuts & Styling",
        description: "Precision cuts, trims & professional blowouts",
        count: "620",
        services: [
          { id: "cut-1", name: "Women's Haircut & Style", price: "$65", duration: "60 mins" },
          { id: "cut-2", name: "Men's Executive Cut", price: "$45", duration: "45 mins" },
          { id: "cut-3", name: "Blowout & Hot Tool Styling", price: "$50", duration: "45 mins" },
        ],
      },
      {
        id: "hair-color",
        name: "Coloring & Balayage",
        description: "Full color, highlights, balayage & color correction",
        count: "540",
        services: [
          { id: "color-1", name: "Custom Balayage & Gloss", price: "$185", duration: "180 mins" },
          { id: "color-2", name: "Full Highlights", price: "$150", duration: "150 mins" },
          { id: "color-3", name: "Root Touch-Up & Refresh", price: "$85", duration: "90 mins" },
        ],
      },
      {
        id: "hair-treatments",
        name: "Hair Treatments",
        description: "Keratin, deep conditioning & scalp detox",
        count: "380",
        services: [
          { id: "treat-1", name: "Brazilian Keratin Treatment", price: "$220", duration: "120 mins" },
          { id: "treat-2", name: "Olaplex Bonding Repair", price: "$55", duration: "30 mins" },
        ],
      },
    ],
  },
  {
    id: "nails",
    title: "Nail Care & Art",
    slug: "nails",
    desc: "Manicure, pedicure, gel polish & custom nail art",
    count: "934",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "nails-mani",
        name: "Manicures",
        description: "Classic, Russian, gel & spa manicures",
        count: "350",
        services: [
          { id: "mani-1", name: "Russian Gel Manicure", price: "$65", duration: "75 mins" },
          { id: "mani-2", name: "Classic Gel Mani", price: "$45", duration: "45 mins" },
        ],
      },
      {
        id: "nails-pedi",
        name: "Pedicures",
        description: "Express, luxury spa, gel & jelly pedicures",
        count: "280",
        services: [
          { id: "pedi-1", name: "Luxury Spa Pedicure", price: "$60", duration: "60 mins" },
        ],
      },
      {
        id: "nails-art",
        name: "Nail Extensions & Art",
        description: "Acrylic full set, hard gel & 3D chrome art",
        count: "304",
        services: [
          { id: "art-1", name: "Gel-X Full Set with Art", price: "$95", duration: "90 mins" },
        ],
      },
    ],
  },
  {
    id: "skincare",
    title: "Skincare & Esthetics",
    slug: "skincare",
    desc: "Custom facials, chemical peels, LED & microdermabrasion",
    count: "586",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "skin-facials",
        name: "Custom Facials",
        description: "Hydrafacial, deep cleansing & glowing facials",
        count: "240",
        services: [
          { id: "facial-1", name: "Signature Glow Hydrafacial", price: "$165", duration: "60 mins" },
        ],
      },
      {
        id: "skin-peels",
        name: "Peels & Dermaplaning",
        description: "Chemical peels & precision dermaplaning",
        count: "180",
        services: [
          { id: "peel-1", name: "Dermaplaning Facial", price: "$110", duration: "50 mins" },
        ],
      },
    ],
  },
  {
    id: "barber",
    title: "Barbershop & Grooming",
    slug: "barber",
    desc: "Skin fades, beard sculpting, hot towel shaves & lineup",
    count: "789",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "barber-cuts",
        name: "Haircuts & Fades",
        description: "Skin fades, taper cuts & scissors style",
        count: "390",
        services: [
          { id: "barb-1", name: "Precision Skin Fade", price: "$50", duration: "45 mins" },
        ],
      },
      {
        id: "barber-beard",
        name: "Beard Sculpting",
        description: "Beard shaping, razor line & hot towel shave",
        count: "250",
        services: [
          { id: "beard-1", name: "Royal Hot Towel Beard Trim", price: "$35", duration: "30 mins" },
        ],
      },
    ],
  },
  {
    id: "brows-lashes",
    title: "Brows & Lashes",
    slug: "brows-lashes",
    desc: "Lash extensions, brow lamination, microblading & tinting",
    count: "644",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "brows",
        name: "Brows Shaping & Lamination",
        description: "Brow lamination, shaping & tinting",
        count: "330",
        services: [
          { id: "brow-1", name: "Brow Lamination & Tint", price: "$85", duration: "60 mins" },
        ],
      },
      {
        id: "lashes",
        name: "Eyelash Extensions",
        description: "Classic, hybrid & volume lash full sets",
        count: "314",
        services: [
          { id: "lash-1", name: "Hybrid Lash Full Set", price: "$150", duration: "120 mins" },
        ],
      },
    ],
  },
  {
    id: "makeup",
    title: "Makeup & Bridal",
    slug: "makeup",
    desc: "Bridal glam, special event makeup & airbrushing",
    count: "481",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "makeup-event",
        name: "Event & Glam Makeup",
        description: "Full glam, soft glam & red carpet makeup",
        count: "270",
        services: [
          { id: "mua-1", name: "Full Glam Makeup Application", price: "$120", duration: "75 mins" },
        ],
      },
    ],
  },
  {
    id: "massage-spa",
    title: "Massage & Body Spa",
    slug: "massage-spa",
    desc: "Deep tissue, Swedish, hot stone & body scrubs",
    count: "382",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "massage-tech",
        name: "Massage Therapy",
        description: "Deep tissue & Swedish massage sessions",
        count: "220",
        services: [
          { id: "mass-1", name: "Deep Tissue Massage (60 min)", price: "$110", duration: "60 mins" },
        ],
      },
    ],
  },
  {
    id: "consultation",
    title: "Virtual Consultation",
    slug: "virtual-consultation",
    desc: "1-on-1 virtual consultations with top specialists",
    count: "95",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    subcategories: [], // Intentionally empty for subcategory data check verification
  },
];

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

export const SALONS_DATA: SalonItem[] = [
  {
    id: 101,
    name: "Noir Studio & Suites",
    salonType: "Hair Salons",
    category: "Hair Salon & Color Lab",
    rating: 4.9,
    reviews: 248,
    location: "SoHo, New York, NY",
    city: "New York",
    price: "from $75",
    badge: "Open until 9:00 PM",
    tags: ["Balayage", "Custom Haircut", "Blowout", "Silk Press"],
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 102,
    name: "The Ritual MedSpa & Wellness",
    salonType: "Spa & MedSpa",
    category: "MedSpa & Esthetician Studio",
    rating: 4.9,
    reviews: 312,
    location: "Beverly Hills, Los Angeles, CA",
    city: "Los Angeles",
    price: "from $120",
    badge: "Open until 10:00 PM",
    tags: ["Hydrafacial", "LED Therapy", "Peels", "Dermaplaning"],
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 103,
    name: "Golden Ratio Barbering Co.",
    salonType: "Barber Shops",
    category: "Modern Barber Shop & Grooming",
    rating: 4.9,
    reviews: 299,
    location: "West Loop, Chicago, IL",
    city: "Chicago",
    price: "from $50",
    badge: "Open until 9:30 PM",
    tags: ["Skin Fade", "Beard Sculpting", "Hot Towel Shave"],
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 104,
    name: "Luxe Couture Nail Bar",
    salonType: "Nail Salons",
    category: "Nail Salon & Gel Art Studio",
    rating: 4.8,
    reviews: 185,
    location: "Brickell, Miami, FL",
    city: "Miami",
    price: "from $45",
    badge: "Open Today",
    tags: ["Russian Manicure", "Gel-X", "Custom Nail Art", "Pedicure"],
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 105,
    name: "Elysian Lash & Brow Lounge",
    salonType: "Lash & Brow Studios",
    category: "Lash Extensions & Brow Bar",
    rating: 4.9,
    reviews: 164,
    location: "Buckhead, Atlanta, GA",
    city: "Atlanta",
    price: "from $65",
    badge: "Top Rated",
    tags: ["Volume Lashes", "Brow Lamination", "Lash Lift"],
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 106,
    name: "Velvet Bloom Beauty Salon",
    salonType: "Beauty Salons",
    category: "Full Beauty & Glam Studio",
    rating: 4.9,
    reviews: 210,
    location: "Downtown Austin, TX",
    city: "Austin",
    price: "from $85",
    badge: "Open until 8:00 PM",
    tags: ["Bridal Glam", "Full Makeup", "Hair Styling", "Extensions"],
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
];

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
