export type Product = {
  id: number;
  name: string;
  img: string;
  rating: number | null;
  reviewCount: number | null;
  currentPrice: number | null;
  originalPrice: number | null;
  discountCount: number | null;
  badge: "OFF" | "HOT" | "NEW"
};
