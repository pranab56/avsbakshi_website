export interface Hotel {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  images?: string[];
  averageRating?: number;
  rating?: number;
  ratingCount?: number;
  isWishlisted?: boolean;
  status?: string;
  isVerified?: boolean;
  uid: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  price?: number;
  currency?: string;
  amenities?: string[];
  structureType?: string;
  videoUrl?: string;
  verifiedAt?: string;
  location?: {
    type?: string;
    coordinates?: [number, number];
  };
  listing?: {
    purpose?: string;
    bedrooms?: number;
    bathrooms?: number;
    garage?: number;
    totalArea?: number;
    landArea?: number;
    yearBuilt?: number;
    landmarks?: { name: string; distanceInKm: number }[];
  };
}

export interface Review {
  _id?: string;
  id?: string;
  property?: Hotel | string;
  customer?: {
    _id?: string;
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
  rating?: number;
  comment?: string;
  createdAt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  publishDate: string;
  images?: string[];
  authorName?: string;
  authorImage?: string;
  slug?: string;
  tags?: string[];
}

export interface Transaction {
  _id: string;
  amount: number;
  netAmount?: number;
  currency: string;
  status: string;
  paymentMethod?: string;
  gateway?: string;
  createdAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
  };
  reference?: {
    id?: {
      uid?: string;
      roomClass?: string;
    };
  };
}

export interface WishlistItem {
  _id: string;
  property: Hotel;
  createdAt: string;
}

export interface Reservation {
  _id: string;
  uid?: string;
  property: Hotel;
  customer?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    image?: string;
    isVerified?: boolean;
  };
  guests: {
    adults: number;
    children: number;
    pets: number;
  };
  checkIn: string;
  checkOut: string;
  status: string;
  roomClass: string;
  pricing?: {
    pricePerUnit?: number;
    units?: number;
    subtotal?: number;
    serviceFee?: number;
    discount?: number;
    total?: number;
    currency?: string;
    isPaid?: boolean;
  };
  createdAt?: string;
}

export interface ApiError {
  status?: number | string;
  data?: {
    message?: string;
    errorMessages?: { path?: string; message: string }[];
  };
  message?: string;
}

export interface RootState {
  auth: {
    token: string | null;
    user?: {
      _id: string;
      role: string;
      email: string;
      firstName?: string;
      lastName?: string;
    } | null;
  };
}
