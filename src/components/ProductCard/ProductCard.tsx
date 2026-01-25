"use client";

import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product } from "@/src/types/product.types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

type Props = {
  product: Product;
  lang: string;
};

const WDIONE_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function toWdioneAbsolute(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${WDIONE_BASE}${url}`;
  return `${WDIONE_BASE}/${url}`;
}

export default function ProductCard({ product, lang }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const pid = String(product.id);

  const inCart = useMemo(
    () => cartItems.some((item) => item.productId === pid),
    [cartItems, pid],
  );

  const wishlisted = useWishlistStore((s) => s.productIds.includes(pid));

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(pid, product.name, { lang });
  }, [toggleWishlist, pid, product.name, lang]);

  const handleAddToCart = useCallback(() => {
    if (inCart) return;
    addItem({ productId: pid, quantity: 1 }, { lang });
  }, [inCart, addItem, pid, lang]);

  const imgSrc = toWdioneAbsolute(product.imageUrl);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-md">
      <div className="relative w-full overflow-hidden rounded-b-none rounded-t-xl">
        <Link href={`/${lang}/shop/${product.id}`}>
          <div className="relative h-[170px] w-full sm:h-[190px]">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={product.name}
                width={325}
                height={325}
                loading="eager"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                No image
              </div>
            )}
          </div>
        </Link>

        <button
          name="Add To Wishlist"
          title="Add To Wishlist"
          type="button"
          onClick={handleWishlistClick}
          className={`absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
            wishlisted
              ? "border-[#ff2020] text-[#ff2020] bg-[#ff2020]"
              : "border-[#E4E4E7]"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              wishlisted ? "fill-current" : "hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
        <Link href={`/${lang}/shop/${product.id}`}>
          <h3
            className="mb-2 min-h-[40px] cursor-pointer text-[13px] font-semibold leading-snug text-[#111827] line-clamp-2 transition-colors duration-200 hover:text-[#7C3BED] sm:text-sm"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#7C3BED] sm:text-lg">
            {product.price.toFixed(2)} {product.currency}
          </span>

          {typeof product.originalPrice === "number" ? (
            <span className="text-xs text-[#71717A] line-through sm:text-sm">
              {product.originalPrice.toFixed(2)} {product.currency}
            </span>
          ) : null}
        </div>

        <button
          name={inCart ? "Already in cart" : "Add To Cart"}
          title={inCart ? "Already in cart" : "Add To Cart"}
          onClick={handleAddToCart}
          type="button"
          disabled={inCart}
          className={`mt-auto flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#7C3BED] text-xs font-semibold transition-all duration-300 sm:h-11 sm:text-sm ${
            inCart
              ? "bg-white text-[#7C3BED] opacity-60 cursor-default"
              : "bg-[#7C3BED] text-white hover:bg-white hover:text-[#7C3BED]"
          }`}
        >
          <ShoppingCart size={16} />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
