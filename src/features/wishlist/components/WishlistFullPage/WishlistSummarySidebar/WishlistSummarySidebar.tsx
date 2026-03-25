"use client";

import { Button } from "@/src/components/ui/button";
import { Heart } from "lucide-react";

type Props = {
  itemCount: number;
  estimatedTotal: number;
  currency: string;
  onMoveAllToCart: () => void;
  isEmpty: boolean;
};

export default function WishlistSummarySidebar({
  itemCount,
  estimatedTotal,
  currency,
  onMoveAllToCart,
  isEmpty,
}: Props) {
  return (
    <aside className="space-y-4">
      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <Heart className="h-4 w-4 text-[#7C3BED]" />
          <span>Wishlist Summary</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Items saved</span>
            <span className="font-medium text-zinc-900">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Estimated total</span>
            <span className="font-medium text-zinc-900">
              {currency} {estimatedTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-zinc-500">
          Prices and availability may change. Moving items to your cart
          doesn&apos;t reserve stock.
        </p>
      </section>

      <Button
        type="button"
        size="lg"
        disabled={isEmpty}
        className="w-full rounded-full bg-[#7C3BED] text-sm font-semibold text-white hover:bg-[#6d28d9]"
        onClick={onMoveAllToCart}
      >
        Move all to cart
      </Button>
    </aside>
  );
}
