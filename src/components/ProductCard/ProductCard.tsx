"use client";

import { Product } from "@/src/types/product.types";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7] hover:shadow-md transition-shadow duration-300">
      <div className="relative bg-gray-100 aspect-square">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.img}
            alt={product.name}
            width={325}
            height={325}
            className="w-full h-full object-cover"
          />
        </Link>

        <button
          name={"Add To Wishlist"}
          title={"Add To Wishlist"}
          type="button"
          onClick={toggleWishlist}
          className="absolute cursor-pointer top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {product.badge === "OFF" ? (
          <div className="absolute top-3 left-3 bg-[#BF5910] text-white text-xs font-medium px-2 py-1 rounded">
            -{product.discountCount}%
          </div>
        ) : product.badge === "HOT" ? (
          <div className="absolute top-3 left-3 bg-[#D93C3C] text-white text-xs font-medium px-2 py-1 rounded">
            {product.badge}
          </div>
        ) : (
          product.badge && (
            <div className="absolute top-3 left-3 text-black text-xs font-medium px-2 py-1 rounded">
              {product.badge}
            </div>
          )
        )}
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3
            className="text-sm font-semibold text-[#000000] mb-2 leading-tight cursor-pointer hover:text-[#7C3BED] transition-colors duration-200 line-clamp-2 min-h-[40px]"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {product.rating && product.reviewCount && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-[#71717A]">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {product.currentPrice && (
            <span className="text-lg font-bold text-[#7C3BED]">
              {product.currentPrice.toFixed(2)} ₽
            </span>
          )}
          {product.originalPrice && (
            <span className="text-sm text-[#7C3BED] line-through">
              {product.originalPrice.toFixed(2)} ₽
            </span>
          )}
        </div>

        <button
          name={"Add To Wishlist"}
          title={"Add To Wishlist"}
          type="button"
          className="w-full flex gap-4 justify-center items-center border-1 cursor-pointer border-[#7C3BED] bg-[#7C3BED] hover:bg-white text-white hover:text-[#7C3BED] py-2 px-4 rounded-md text-sm font-medium transition-all duration-300"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
