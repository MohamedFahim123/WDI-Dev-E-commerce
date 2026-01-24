"use client";

import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { handleShareThisProduct } from "@/src/lib/ShareProduct";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product, ProductVariant } from "@/src/types/product.types";

import { useRouteLang } from "@/src/hooks/useLang";
import { ProductMainInfoCard } from "./ProductMainInfoCard";
import { ProductPaymentCard } from "./ProductPaymentCard";
import { ProductSellerInfoCard } from "./ProductSellerInfoCard";
import { ProductShippingReturnsCard } from "./ProductShippingReturnsCard";

type Props = {
  product: Product;
};

export function ProductInfoPanel({ product }: Props) {
  const lang = useRouteLang();
  const pathname = usePathname();

  const addItem = useCartStore((s) => s.addItem);
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const pid = String(product.id);
  const wishlisted = wishlistIds.includes(pid);

  const [selectedColorId, setSelectedColorId] = useState(
    product.colors?.[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const variant: ProductVariant | undefined = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return undefined;
    return (
      product.variants.find((v) => v.colorId === selectedColorId) ??
      product.variants[0]
    );
  }, [product.variants, selectedColorId]);

  const outOfStock = !variant || variant.stock <= 0;

  const handleAddToCart = useCallback(() => {
    if (!variant || outOfStock) {
      toast.error("This variant is currently out of stock.");
      return;
    }

    addItem({
      productId: pid,
      variantId: variant.id,
      quantity,
    });
  }, [addItem, outOfStock, pid, quantity, variant]);

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(pid, product.name);
  }, [pid, product.name, toggleWishlist]);

  const handleShareClick = useCallback(() => {
    handleShareThisProduct(pathname, product);
  }, [pathname, product]);

  return (
    <aside className="space-y-4 lg:space-y-5">
      <ProductMainInfoCard
        product={product}
        variant={variant}
        selectedColorId={selectedColorId}
        onSelectColor={setSelectedColorId}
        quantity={quantity}
        onIncreaseQuantity={() =>
          setQuantity((q) => (variant && q < variant.stock ? q + 1 : q))
        }
        onDecreaseQuantity={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
        wishlisted={wishlisted}
        onWishlistClick={handleWishlistClick}
        onShareClick={handleShareClick}
        onAddToCart={handleAddToCart}
        outOfStock={outOfStock}
      />

      <ProductPaymentCard />
      <ProductShippingReturnsCard />
      <ProductSellerInfoCard lang={lang} />
    </aside>
  );
}
