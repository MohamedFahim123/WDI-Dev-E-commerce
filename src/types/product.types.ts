export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductVariant = {
  id: string;
  colorId?: string;
  size?: string;
  stock: number;
};
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  colors?: ProductColor[];
  variants?: ProductVariant[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  badges?: string[];
  img: string;
  originalPrice: number | null;
  discountCount: number | null;
  badge: "OFF" | "HOT" | "NEW";
}
