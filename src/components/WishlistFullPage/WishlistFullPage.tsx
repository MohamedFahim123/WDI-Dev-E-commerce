"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

import Container from "@/src/components/Container/Container";
import { useRouteLang } from "@/src/hooks/useLang";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product } from "@/src/types/product.types";

import EmptyWishlist from "./EmptyWishlist/EmptyWishlist";
import WishlistItemRow from "./WishlistItemRow/WishlistItemRow";
import WishlistSummarySidebar from "./WishlistSummarySidebar/WishlistSummarySidebar";

type WishlistProductItem = { product: Product };

type StoreGroup = {
  id: string;
  name: string;
  items: WishlistProductItem[];
};

function buildStoreName(product: Product): string {
  const category = product.specs?.["Category"];

  if (
    category === "Bags & Accessories" ||
    category === "Home & Office" ||
    category === "Outdoors & Travel"
  ) {
    return "Fashion Hub";
  }

  return "TechStore Official";
}

export default function WishlistFullPage() {
  const lang = useRouteLang();

  const wishlistItems = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlistCount = useWishlistStore((s) => s.getQuantity());
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);

  const addItem = useCartStore((s) => s.addItem);
  const hydrateCart = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrateWishlist({ lang });
    hydrateCart({ lang });
  }, [hydrateWishlist, hydrateCart, lang]);

  const groupedStores: StoreGroup[] = useMemo(() => {
    const groups: Record<string, StoreGroup> = {};

    for (const product of wishlistItems) {
      const storeName = buildStoreName(product);
      const key = storeName.toLowerCase().replace(/\s+/g, "-");

      if (!groups[key]) {
        groups[key] = { id: key, name: storeName, items: [] };
      }

      groups[key].items.push({ product });
    }

    return Object.values(groups);
  }, [wishlistItems]);

  const isEmpty = wishlistCount === 0;

  const estimatedTotal = useMemo(() => {
    return groupedStores.reduce((sum, group) => {
      return (
        sum +
        group.items.reduce(
          (inner, item) => inner + (item.product.price ?? 0),
          0,
        )
      );
    }, 0);
  }, [groupedStores]);

  const currency = wishlistItems[0]?.currency || "EGP";

  const handleAddProductToCart = (product: Product) => {
    addItem({ productId: String(product.id), quantity: 1 }, { lang });
  };

  const handleMoveAllToCart = () => {
    if (isEmpty) return;

    groupedStores.forEach((group) => {
      group.items.forEach(({ product }) => {
        handleAddProductToCart(product);
        toggleWishlist(product.id, product.name, { lang });
      });
    });
  };

  const handleRemoveFromWishlist = (productId: string | number) => {
    toggleWishlist(productId, undefined, { lang });
  };

  return (
    <section className="bg-zinc-50">
      {isEmpty ? (
        <EmptyWishlist lang={lang} />
      ) : (
        <Container className="py-8 lg:py-10">
          <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-zinc-900">My Wishlist</h1>
            <p className="text-sm text-zinc-500">
              You have{" "}
              <span className="font-semibold text-zinc-900">
                {wishlistCount}
              </span>{" "}
              item{wishlistCount === 1 ? "" : "s"} saved for later.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {groupedStores.map((group) => (
                <section
                  key={group.id}
                  aria-label={`Wishlist items from ${group.name}`}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-[11px] font-semibold text-[#7C3BED]"
                      >
                        {group.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">
                        {group.name}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {group.items.length} item
                      {group.items.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-100">
                    {group.items.map(({ product }) => (
                      <WishlistItemRow
                        key={product.id}
                        product={product}
                        lang={lang}
                        onRemove={() => handleRemoveFromWishlist(product.id)}
                        onMoveToCart={() => {
                          handleAddProductToCart(product);
                          handleRemoveFromWishlist(product.id);
                        }}
                      />
                    ))}
                  </div>
                </section>
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

            <WishlistSummarySidebar
              itemCount={wishlistCount}
              estimatedTotal={estimatedTotal}
              currency={currency}
              onMoveAllToCart={handleMoveAllToCart}
              isEmpty={isEmpty}
            />
          </div>
        </Container>
      )}
    </section>
  );
}
