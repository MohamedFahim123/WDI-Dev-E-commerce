import { Product } from "@/src/types/product.types";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type CartItemRowProps = {
  item: { product: Product; quantity: number };
  isWishlisted: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onSaveForLater: () => void;
};

function CartItem({
  item,
  isWishlisted,
  onIncrease,
  onDecrease,
  onRemove,
  onSaveForLater,
}: CartItemRowProps) {
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 px-5 py-4">
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
            <p className="line-clamp-2 text-sm font-medium text-zinc-900">
              {product.name}
            </p>
            {product.subtitle && (
              <p className="text-xs text-zinc-500">{product.subtitle}</p>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <div
              className="flex items-center rounded-full border border-zinc-200"
              aria-label={`Quantity for ${product.name}`}
            >
              <button
                type="button"
                onClick={onDecrease}
                className="px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 text-sm font-medium text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncrease}
                className="px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="text-[11px] text-rose-500">
              Only {Math.max(3, 5 - (quantity - 1))} left
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={onSaveForLater}
              className="inline-flex items-center gap-1 text-zinc-600 hover:text-[#7C3BED]"
              aria-pressed={isWishlisted}
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  isWishlisted ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>Save for later</span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between text-right">
          <div>
            <p className="text-sm font-semibold text-violet-600">
              AED {(product.price * quantity).toFixed(2)}
            </p>
            {typeof product.oldPrice === "number" && (
              <p className="text-xs text-zinc-500 line-through">
                AED {(product.oldPrice * quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
