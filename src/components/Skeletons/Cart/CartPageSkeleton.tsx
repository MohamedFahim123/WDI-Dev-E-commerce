import React from "react";
import CartStoreCardSkeleton from "./CartStoreCardSkeleton";
import CartSummarySidebarSkeleton from "./CartSummarySidebarSkeleton";

export function CartPageSkeleton() {
  return (
    <div>
      <div className="mb-6 h-7 w-40 rounded skeleton-shimmer" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <CartStoreCardSkeleton itemsCount={2} />
          <CartStoreCardSkeleton itemsCount={1} />

          <div className="mt-2 flex justify-center">
            <div className="h-9 w-full rounded-full skeleton-shimmer md:w-40" />
          </div>
        </div>

        <CartSummarySidebarSkeleton />
      </div>
    </div>
  );
}

export default React.memo(CartPageSkeleton);
