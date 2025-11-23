"use client";

import Link from "next/link";
import { useMemo } from "react";

import Container from "@/src/components/Container/Container";
import { useRouteLang } from "@/src/hooks/useLang";
import { useCartStore, type CartItem } from "@/src/stores/cartStore";
import { products } from "@/src/stores/products";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product } from "@/src/types/product.types";
import CartEmptyState from "./CartEmptyState/CartEmptyState";
import CartStoreCard from "./CartStoreCard/CartStoreCard";
import CartSummarySidebar from "./CartSummarySidebar/CartSummarySidebar";

type CartProductItem = CartItem & {
  product: Product;
};

type StoreGroup = {
  id: string;
  name: string;
  items: CartProductItem[];
};

function buildStoreName(product: Product): string {
  const category = product.specs?.Category;

  if (
    category === "Bags & Accessories" ||
    category === "Home & Office" ||
    category === "Outdoors & Travel"
  ) {
    return "Fashion Hub";
  }

  return "TechStore Official";
}

export default function CartFullPage() {
  const lang = useRouteLang();

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted);

  const groupedStores: StoreGroup[] = useMemo(() => {
    const groups: Record<string, StoreGroup> = {};

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      const storeName = buildStoreName(product);
      const key = storeName.toLowerCase().replace(/\s+/g, "-");

      if (!groups[key]) {
        groups[key] = {
          id: key,
          name: storeName,
          items: [],
        };
      }

      groups[key].items.push({ ...item, product });
    }

    return Object.values(groups);
  }, [items]);

  const subtotal = groupedStores.reduce((sum, group) => {
    return (
      sum +
      group.items.reduce(
        (inner, item) => inner + item.product.price * item.quantity,
        0
      )
    );
  }, 0);

  const shipping = items.length > 0 ? 11.99 : 0;
  const vatRate = 0.15;
  const vat = subtotal * vatRate;
  const total = subtotal + shipping + vat;
  const isEmpty = items.length === 0;

  return (
    <section className="bg-zinc-50">
      {isEmpty ? (
        <CartEmptyState lang={lang} />
      ) : (
        <Container className="py-8 lg:py-10">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">Shopping Cart</h1>
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {groupedStores.map((group) => (
                <CartStoreCard
                  key={group.id}
                  group={group}
                  isWishlisted={isWishlisted}
                  onIncreaseQuantity={(key, quantity) =>
                    updateQuantity(key, quantity + 1)
                  }
                  onDecreaseQuantity={(key, quantity) =>
                    updateQuantity(key, quantity > 1 ? quantity - 1 : 1)
                  }
                  onRemoveItem={removeItem}
                  onSaveForLater={(item) => {
                    wishlistToggle(item.product.id);
                    removeItem(item.key);
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
