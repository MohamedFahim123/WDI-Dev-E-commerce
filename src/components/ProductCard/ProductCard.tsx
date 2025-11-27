"use client";

import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { Product } from "@/src/types/product.types";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  lang: string;
};

export default function ProductCard({ product, lang }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) =>
    s.productIds.includes(product.id)
  );

  const inCart = cartItems.some((item) => item.productId === product.id);

  const handleWishlistClick = () => {
    toggleWishlist(product.id);
  };

  const handleAddToCart = () => {
    if (inCart) return;

    addItem({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-md">
      <div className="relative w-full overflow-hidden rounded-b-none rounded-t-xl">
        <Link href={`/${lang}/shop/${product.id}`}>
          <div className="relative h-[170px] w-full sm:h-[190px]">
            <Image
              src={product.img}
              alt={product.name}
              width={325}
              height={325}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {product.badge === "OFF" && product.discountCount ? (
          <div className="absolute left-3 top-3 rounded-full bg-[#BF5910] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            {product.discountCount}% OFF
          </div>
        ) : product.badge === "HOT" ? (
          <div className="absolute left-3 top-3 rounded-full bg-[#DC2626] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            HOT
          </div>
        ) : (
          product.badge && (
            <div className="absolute left-3 top-3 rounded-full bg-[#F3E8FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#7C3BED] shadow-sm">
              {product.badge}
            </div>
          )
        )}

        <button
          name="Add To Wishlist"
          title="Add To Wishlist"
          type="button"
          onClick={handleWishlistClick}
          className={`absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
            isWishlisted
              ? "border-[#ff2020] text-[#ff2020] bg-[#ff2020]"
              : "border-[#E4E4E7]"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-current" : "hover:text-red-500"
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

        {product.rating && product.reviewCount && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs font-semibold text-[#111827]">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-[#71717A]">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="mb-3 flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#7C3BED] sm:text-lg">
            {product.price.toFixed(2)} $
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#71717A] line-through sm:text-sm">
              {product.originalPrice.toFixed(2)} $
            </span>
          )}
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
