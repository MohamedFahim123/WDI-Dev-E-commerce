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
    <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-square bg-gray-100">
        <Link href={`/${lang}/shop/${product.id}`}>
          <Image
            src={product.img}
            alt={product.name}
            width={325}
            height={325}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </Link>

        <button
          name="Add To Wishlist"
          title="Add To Wishlist"
          type="button"
          onClick={handleWishlistClick}
          className="absolute right-3 top-3 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {product.badge === "OFF" ? (
          <div className="absolute left-3 top-3 rounded bg-[#C2410C] px-2 py-1 text-xs font-medium text-white">
            -{product.discountCount}%
          </div>
        ) : product.badge === "HOT" ? (
          <div className="absolute left-3 top-3 rounded bg-[#DC2626] px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </div>
        ) : (
          product.badge && (
            <div className="absolute left-3 top-3 rounded bg-[#F3E8FF] px-2 py-1 text-xs font-medium text-[#7C3BED]">
              {product.badge}
            </div>
          )
        )}
      </div>

      <div className="p-4">
        <Link href={`/${lang}/shop/${product.id}`}>
          <h3
            className="mb-2 min-h-[40px] cursor-pointer text-sm font-semibold leading-tight text-[#000000] line-clamp-2 transition-colors duration-200 hover:text-[#7C3BED]"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {product.rating && product.reviewCount && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-[#71717A]">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#7C3BED]">
            {product.price.toFixed(2)} $
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#7C3BED] line-through">
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
          className={`flex w-full items-center justify-center gap-2 rounded-md border border-[#7C3BED] py-2 px-4 text-sm font-medium transition-all duration-300 ${
            inCart
              ? "bg-white cursor-default text-[#7C3BED] opacity-60"
              : "bg-[#7C3BED] text-white cursor-pointer hover:bg-white hover:text-[#7C3BED]"
          }`}
        >
          <ShoppingCart size={18} />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
