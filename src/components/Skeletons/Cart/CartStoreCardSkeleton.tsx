import React from "react";
import { CartItemRowSkeleton } from "./CartItemRowSkeleton";

type Props = {
  itemsCount?: number;
};

export function CartStoreCardSkeleton({ itemsCount = 2 }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full skeleton-shimmer" />
          <div className="h-4 w-32 rounded skeleton-shimmer" />
        </div>
        <div className="h-3 w-16 rounded skeleton-shimmer" />
      </div>

      <div className="divide-y divide-zinc-100">
        {Array.from({ length: itemsCount }).map((_, index) => (
          <CartItemRowSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default React.memo(CartStoreCardSkeleton);
