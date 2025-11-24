"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { Product, ProductVariant } from "@/src/types/product.types";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { handleShareThisProduct } from "@/src/lib/ShareProduct";

import { ProductMainInfoCard } from "./ProductMainInfoCard";
import { ProductPaymentCard } from "./ProductPaymentCard";
import { ProductShippingReturnsCard } from "./ProductShippingReturnsCard";
import { ProductSellerInfoCard } from "./ProductSellerInfoCard";
import { useRouteLang } from "@/src/hooks/useLang";

type Props = {
  product: Product;
};

export function ProductInfoPanel({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const lang = useRouteLang();

  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.productIds.includes(product.id));

  const pathname = usePathname();

  const [selectedColorId, setSelectedColorId] = useState(
    product.colors?.[0]?.id
  );
  const [quantity, setQuantity] = useState(1);

  const variant: ProductVariant | undefined = useMemo(
    () =>
      product.variants?.find((v) => v.colorId === selectedColorId) ??
      product.variants?.[0],
    [product, selectedColorId]
  );

  const outOfStock = !variant || variant.stock <= 0;

  const handleAddToCart = useCallback(() => {
    if (!variant || outOfStock) {
      toast.error("This variant is currently out of stock.");
      return;
    }

    addItem({
      productId: product.id,
      variantId: variant.id,
      quantity,
    });
  }, [variant, outOfStock, addItem, product.id, quantity]);

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(product.id);
  }, [toggleWishlist, product.id]);

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
