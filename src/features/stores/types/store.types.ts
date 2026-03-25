export type Store = {
  id: number;
  name: string;
  description?: string;

  logoUrl?: string | null;
  bannerUrl?: string | null;

  city?: string | null;
  state?: string | null;
  country?: string | null;
  storeAddress?: string | null;

  isActive: boolean;
  minOrderAmount?: number;

  sellerName?: string | null;
};
