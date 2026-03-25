import type { ApiStore } from "@/src/types/api/store.api.types";
import type { Store } from "@/src/types/store.types";

export function mapApiStoreToStore(s: ApiStore): Store {
  const safeStoreEmail = typeof s.store_email === "string" ? s.store_email : "";
  const safeSellerName = s.seller_name?.trim() ? s.seller_name : null;

  return {
    id: s.id,
    name: s.name,
    description: s.description || "",

    logoUrl: s.logo_url || null,
    bannerUrl: s.banner_url || null,

    city: s.city || null,
    state: s.state || null,
    country: s.country || null,
    storeAddress: s.store_address || null,

    isActive: Boolean(s.is_active),
    minOrderAmount: Number(s.min_order_amount ?? 0),

    sellerName: safeSellerName ?? (safeStoreEmail ? safeStoreEmail : null),
  };
}

export function mapApiStoresToStores(stores: ApiStore[]): Store[] {
  return stores.map(mapApiStoreToStore);
}

export function formatStoreLocation(store: Store) {
  const parts = [store.city, store.state, store.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "";
}
