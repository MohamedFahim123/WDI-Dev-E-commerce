"use client";

import type { Product } from "@/src/types/product.types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  lang: string;
  onRemove: () => void;
  onMoveToCart: () => void;
};

export default function WishlistItemRow({
  product,
  lang,
  onRemove,
  onMoveToCart,
}: Props) {
  return (
    <article className="flex gap-4 px-5 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <div>
            <Link href={`/${lang}/shop/${product.id}`}>
              <p className="text-sm font-medium text-zinc-900 line-clamp-2 hover:text-[#7C3BED]">
                {product.name}
              </p>
            </Link>
            {product.subtitle && (
              <p className="text-xs text-zinc-500">{product.subtitle}</p>
            )}
          </div>

          {typeof product.price === "number" && (
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#7C3BED]">
                AED {product.price.toFixed(2)}
              </span>
              {typeof product.oldPrice === "number" && (
                <span className="text-xs text-zinc-500 line-through">
                  AED {product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onMoveToCart}
              className="inline-flex items-center gap-1 text-[#7C3BED] hover:text-[#6d28d9]"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Move to cart</span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600"
            >
              <Heart className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
