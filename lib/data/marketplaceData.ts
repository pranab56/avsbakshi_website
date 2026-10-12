import { ServiceCategory, SalonItem, SalonTypeCategory, ProfessionalItem } from "@/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hair",
    title: "Hair Care & Styling",
    slug: "hair",
    desc: "Cuts, coloring, balayage, blowouts & treatments",
    count: "1,842",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nails",
    title: "Nail Care & Art",
    slug: "nails",
    desc: "Manicure, pedicure, gel polish & custom nail art",
    count: "934",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "skincare",
    title: "Skincare & Esthetics",
    slug: "skincare",
    desc: "Custom facials, chemical peels, LED & microdermabrasion",
    count: "586",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "barber",
    title: "Barbershop & Grooming",
    slug: "barber",
    desc: "Skin fades, beard sculpting, hot towel shaves & lineup",
    count: "789",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "brows-lashes",
    title: "Brows & Lashes",
    slug: "brows-lashes",
    desc: "Lash extensions, brow lamination, microblading & tinting",
    count: "644",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "makeup",
    title: "Makeup & Bridal",
    slug: "makeup",
    desc: "Bridal glam, special event makeup & airbrushing",
    count: "481",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "massage-spa",
    title: "Massage & Body Spa",
    slug: "massage-spa",
    desc: "Deep tissue, Swedish, hot stone & body scrubs",
    count: "382",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "consultation",
    title: "Virtual Consultation",
    slug: "virtual-consultation",
    desc: "1-on-1 virtual consultations with top specialists",
    count: "95",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
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
    address: "124 Prince St, SoHo, New York, NY 10012",
    phone: "+1 (212) 555-0198",
    price: "from $75",
    badge: "Open until 9:00 PM",
    tags: ["Balayage", "Custom Haircut", "Blowout", "Silk Press"],
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "A luxury boutique hair lab in SoHo specializing in custom balayage, precision color correction, and premium keratin transformations.",
    hours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 6:00 PM",
    amenities: ["Free Wi-Fi", "Espresso & Mimosa Bar", "Private Suites", "Wheelchair Accessible", "Cards Accepted"],
    photos: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
    ]
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
    address: "9400 Wilshire Blvd, Beverly Hills, CA 90212",
    phone: "+1 (310) 555-0144",
    price: "from $120",
    badge: "Open until 10:00 PM",
    tags: ["Hydrafacial", "LED Therapy", "Peels", "Dermaplaning"],
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Holistic skin science and medical esthetics studio providing glowing Hydrafacials, medical peels, and advanced laser treatments.",
    hours: "Mon-Sun: 8:00 AM - 10:00 PM",
    amenities: ["Valet Parking", "Organic Tea Lounge", "Private Treatment Rooms", "Dermatologist Supervision"],
    photos: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ]
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
    address: "820 W Fulton Market, Chicago, IL 60607",
    phone: "+1 (312) 555-0899",
    price: "from $50",
    badge: "Open until 9:30 PM",
    tags: ["Skin Fade", "Beard Sculpting", "Hot Towel Shave"],
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Modern executive barbershop blending traditional hot-towel razoring with precision skin fades and beard architecture.",
    hours: "Tue-Sat: 9:00 AM - 9:30 PM",
    amenities: ["Craft Beer on Tap", "Leather Recliners", "Hot Towel Service"],
    photos: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
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
    address: "701 Brickell Ave, Miami, FL 33131",
    phone: "+1 (305) 555-0722",
    price: "from $45",
    badge: "Open Today",
    tags: ["Russian Manicure", "Gel-X", "Custom Nail Art", "Pedicure"],
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "High-fashion nail studio specializing in Russian dry manicures, long-lasting Gel-X extensions, and bespoke 3D nail art.",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM",
    amenities: ["Sterilized Medical Grade Autoclave", "Pedicure Thrones", "Champagne Bar"],
    photos: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
    ]
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
    address: "3050 Peachtree Rd NW, Atlanta, GA 30305",
    phone: "+1 (404) 555-0311",
    price: "from $65",
    badge: "Top Rated",
    tags: ["Volume Lashes", "Brow Lamination", "Lash Lift"],
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Premier lash extension and brow lamination studio crafting customized lash sets and microblading perfection.",
    hours: "Tue-Sun: 9:30 AM - 7:00 PM",
    amenities: ["Ergonomic Memory Foam Beds", "Aromatherapy Lounge"],
    photos: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ]
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
    address: "400 Congress Ave, Austin, TX 78701",
    phone: "+1 (512) 555-0450",
    price: "from $85",
    badge: "Open until 8:00 PM",
    tags: ["Bridal Glam", "Full Makeup", "Hair Styling", "Extensions"],
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Full glam studio offering event makeup, hair extensions, and luxury bridal beauty parties.",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    amenities: ["Bridal Suite", "Private Makeup Stations", "Complimentary Refreshments"],
    photos: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
];

export const PROFESSIONALS_DATA: ProfessionalItem[] = [
  {
    id: "pro-1",
    name: "Sophia Martinez",
    role: "Senior Balayage & Color Master",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 124,
    location: "SoHo, New York, NY",
    city: "New York",
    salonId: 101,
    salonName: "Noir Studio & Suites",
    badge: "Top Rated Stylist",
    bio: "With over 10 years of experience in Manhattan's top salons, Sophia specializes in hand-painted balayage, lived-in blonde dimensions, and precision color correction. Certified Olaplex Specialist.",
    services: [
      { id: "s-101", name: "Custom Balayage & Gloss Treatment", price: "$185", duration: "180 mins", description: "Hand-painted highlights tailored to your hair shape with luxury glossing & bond treatment." },
      { id: "s-102", name: "Women's Signature Haircut & Style", price: "$85", duration: "60 mins", description: "Precision cut, clarifying wash, and signature blowout styling." },
      { id: "s-103", name: "Brazilian Keratin Smoothing", price: "$220", duration: "120 mins", description: "Long-lasting frizz reduction and glossy shine for up to 4 months." },
      { id: "s-104", name: "Full Highlights & Root Smudge", price: "$165", duration: "150 mins", description: "Dimensional full head foils with seamless root blending." },
    ],
    portfolio: [
      { id: "p-1", title: "Dimensional Sun-Kissed Balayage", category: "Color", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80", likes: 89 },
      { id: "p-2", title: "Platinum Blonde Transformation", category: "Color", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", likes: 112 },
      { id: "p-3", title: "Textured Layered Cut", category: "Cut", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80", likes: 64 },
    ],
    reviews: [
      { id: "r-1", author: "Jessica Miller", rating: 5, date: "2 days ago", comment: "Sophia is a true color magician! My balayage looks so natural and smooth.", serviceName: "Custom Balayage & Gloss" },
      { id: "r-2", author: "Emily Roberts", rating: 5, date: "1 week ago", comment: "Best haircut I've had in NYC. She listened to exactly what I wanted!", serviceName: "Women's Signature Haircut" },
    ],
    workingHours: [
      { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ]
  },
  {
    id: "pro-2",
    name: "Dr. Maya Chen",
    role: "Lead Medical Esthetician",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 184,
    location: "Beverly Hills, Los Angeles, CA",
    city: "Los Angeles",
    salonId: 102,
    salonName: "The Ritual MedSpa & Wellness",
    badge: "Licensed Esthetician",
    bio: "Clinical skin specialist with 12 years of experience combining advanced medical peels, LED light therapy, and custom Hydrafacials for porcelain-smooth skin.",
    services: [
      { id: "s-201", name: "Signature Glow Hydrafacial Deluxe", price: "$165", duration: "60 mins", description: "Deep cleansing, painless extraction, antioxidant infusion, and LED light therapy." },
      { id: "s-202", name: "Precision Dermaplaning & Enzyme Peel", price: "$110", duration: "50 mins", description: "Surgical steel exfoliation removing peach fuzz and dead skin cells." },
      { id: "s-203", name: "Medical Grade TCA Chemical Peel", price: "$140", duration: "45 mins", description: "Deep skin resurfacing for hyperpigmentation and fine line reduction." },
    ],
    portfolio: [
      { id: "p-4", title: "Glass Skin Hydrafacial Results", category: "Skincare", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", likes: 145 },
    ],
    reviews: [
      { id: "r-3", author: "Sarah Jenkins", rating: 5, date: "3 days ago", comment: "My skin has never glowed like this. Dr. Maya is unmatched!", serviceName: "Signature Glow Hydrafacial" },
    ],
    workingHours: [
      { day: "Tuesday - Saturday", hours: "10:00 AM - 8:00 PM" },
    ]
  },
  {
    id: "pro-3",
    name: "Marcus Sterling",
    role: "Master Barber & Fade Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 260,
    location: "West Loop, Chicago, IL",
    city: "Chicago",
    salonId: 103,
    salonName: "Golden Ratio Barbering Co.",
    badge: "Master Barber",
    bio: "Famous for seamless skin fades, razor lineup perfection, and relaxing hot-towel beard sculpting treatments.",
    services: [
      { id: "s-301", name: "Executive Skin Fade & Haircut", price: "$50", duration: "45 mins", description: "Precision taper or skin fade with razor lineup & hot towel finish." },
      { id: "s-302", name: "Royal Hot Towel Beard Sculpting", price: "$35", duration: "30 mins", description: "Straight-razor detailing, beard oil treatment, and hot towel relaxation." },
      { id: "s-303", name: "The Full Grooming Combo", price: "$75", duration: "75 mins", description: "Skin fade cut + full beard sculpt & facial massage." },
    ],
    portfolio: [
      { id: "p-5", title: "Crisp Taper Fade", category: "Barber", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80", likes: 178 },
    ],
    reviews: [
      { id: "r-4", author: "David Vance", rating: 5, date: "Yesterday", comment: "Marcus is the cleanest barber in Chicago. Sharp lines every time.", serviceName: "Executive Skin Fade" },
    ],
    workingHours: [
      { day: "Tuesday - Saturday", hours: "9:00 AM - 9:00 PM" },
    ]
  },
  {
    id: "pro-4",
    name: "Elena Rostova",
    role: "Russian Manicure & Gel-X Specialist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 115,
    location: "Brickell, Miami, FL",
    city: "Miami",
    salonId: 104,
    salonName: "Luxe Couture Nail Bar",
    badge: "Nail Artist",
    bio: "Certified Russian dry manicure expert crafting cuticle perfection, structural gel overlays, and 3D chrome nail art.",
    services: [
      { id: "s-401", name: "Russian Gel Dry Manicure", price: "$65", duration: "75 mins", description: "Flawless cuticle clean-up using e-file technique with long-lasting gel polish." },
      { id: "s-402", name: "Gel-X Full Set with Custom Art", price: "$95", duration: "90 mins", description: "Full coverage soft gel extensions with hand-painted nail design." },
    ],
    portfolio: [
      { id: "p-6", title: "Minimalist Chrome Gel Art", category: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80", likes: 210 },
    ],
    reviews: [
      { id: "r-5", author: "Amanda Cole", rating: 5, date: "4 days ago", comment: "My Russian manicure lasted 4 full weeks without a single chip!", serviceName: "Russian Gel Dry Manicure" },
    ],
    workingHours: [
      { day: "Monday - Saturday", hours: "10:00 AM - 8:00 PM" },
    ]
  }
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
