"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

import Container from "@/src/components/Container/Container";
import { useRouteLang } from "@/src/hooks/useLang";
import { useCartStore, type CartItem } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product } from "@/src/types/product.types";

import { CartPageSkeleton } from "../Skeletons/Cart/CartPageSkeleton";
import CartEmptyState from "./CartEmptyState/CartEmptyState";
import CartStoreCard from "./CartStoreCard/CartStoreCard";
import CartSummarySidebar from "./CartSummarySidebar/CartSummarySidebar";

type CartProductItem = CartItem & { product: Product };

type StoreGroup = {
  id: string;
  name: string;
  items: CartProductItem[];
};

export default function CartFullPage() {
  const lang = useRouteLang();

  const items = useCartStore((s) => s.items);
  const meta = useCartStore((s) => s.meta);
  const loading = useCartStore((s) => s.loading);
  const error = useCartStore((s) => s.error);

  const hydrateCart = useCartStore((s) => s.hydrate);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted);
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);

  useEffect(() => {
    hydrateCart({ lang });
    hydrateWishlist({ lang });
  }, [hydrateCart, hydrateWishlist, lang]);

  const groupedStores: StoreGroup[] = useMemo(() => {
    if (items.length === 0) return [];

    const storeName = meta?.companyName || "TechStore Official";
    const key = storeName.toLowerCase().replace(/\s+/g, "-");

    return [
      {
        id: key,
        name: storeName,
        items: items.map((i) => ({ ...i, product: i.product })),
      },
    ];
  }, [items, meta?.companyName]);

  const computedSubtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  const subtotal = meta?.amountUntaxed ?? computedSubtotal;
  const vat = meta?.amountTax ?? 0;
  const total = meta?.amountTotal ?? subtotal + vat;

  const shipping = Math.max(0, total - subtotal - vat);

  const isEmpty = !loading && items.length === 0;

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (error) {
    return (
      <section className="bg-zinc-50">
        <Container className="py-10 space-y-4">
          <p className="text-sm text-rose-600">Failed to load cart: {error}</p>
          <button
            type="button"
            onClick={() => hydrateCart({ lang })}
            className="rounded-full bg-[#7C3BED] px-5 py-2 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-zinc-50">
      {isEmpty ? (
        <CartEmptyState lang={lang} />
      ) : (
        <Container className="py-8 lg:py-10">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900">Shopping Cart</h1>

            {meta?.name ? (
              <span className="text-xs text-zinc-500">Order: {meta.name}</span>
            ) : null}
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {groupedStores.map((group) => (
                <CartStoreCard
                  key={group.id}
                  group={group}
                  isWishlisted={(productId) => isWishlisted(productId)}
                  onIncreaseQuantity={(key, currentQty) =>
                    updateQuantity(key, currentQty + 1, { lang })
                  }
                  onDecreaseQuantity={(key, currentQty) =>
                    updateQuantity(key, currentQty > 1 ? currentQty - 1 : 1, {
                      lang,
                    })
                  }
                  onRemoveItem={(key) => removeItem(key, { lang })}
                  onSaveForLater={(item) => {
                    wishlistToggle(String(item.product.id), item.product.name, {
                      lang,
                    });
                    removeItem(item.key, { lang });
                  }}
                />
              ))}

              <div className="mt-2 flex justify-center">
                <Link
                  href={`/${lang}/shop`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-violet-200 px-5 py-2 text-sm font-medium text-[#7C3BED] hover:bg-violet-50 md:w-auto"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <CartSummarySidebar
              lang={lang}
              subtotal={subtotal}
              shipping={shipping}
              vat={vat}
              total={total}
              isEmpty={isEmpty}
            />
          </div>
        </Container>
      )}
    </section>
  );
}
