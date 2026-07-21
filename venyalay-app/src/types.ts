export interface Product {comingSoon?: boolean;
  id: string;
  name: string;
  tagline: string;
  badge: "Founder Batch" | "New Arrival" | "Best Seller" | "Rare Batch";
  price: number;
  mrp: number;
  netQuantity: string;
  region: string;
  colour: string;
  aroma: string;
  taste: string;
  story: string;
  gradient: string;
  image?: string;
  
  images?: string[];
  batchCode: string;
  packagingDate: string;
  bestBefore: string;
  category: "Floral Honey" | "Founder Batch" | "New Arrivals" | "Best Sellers";
  nutrition: {
    energyKcal: number;
    proteinG: number;
    carbohydrateG: number;
    totalSugarsG: number;
    addedSugarsG: number;
    fatG: number;
    sodiumMg: number;
  };
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  address: Address;
}

export interface Address {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CampaignPost {
  day: number;
  question: string;
  teaser: string;
  answer: string;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BeeAndMeEpisode {
  id: string;
  pillar: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface RitualLog {
  date: string;
  ritual: "morning" | "night" | "food" | "pooja";
}

export type RewardLevel = "Explorer" | "Ritual Member" | "Honey Guardian" | "VENYALAYON";
