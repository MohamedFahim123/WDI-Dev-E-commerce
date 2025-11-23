import React from "react";

export function CartItemRowSkeleton() {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg skeleton-shimmer" />

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <div className="h-4 w-3/4 rounded skeleton-shimmer" />
            <div className="h-3 w-1/2 rounded skeleton-shimmer" />
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-zinc-200 px-2 py-1">
              <div className="h-4 w-4 rounded-full skeleton-shimmer" />
              <div className="mx-2 h-4 w-6 rounded skeleton-shimmer" />
              <div className="h-4 w-4 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="h-3 w-20 rounded skeleton-shimmer" />
            <div className="h-3 w-16 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="flex flex-col items-end justify-between text-right">
          <div className="space-y-1">
            <div className="h-4 w-16 rounded skeleton-shimmer" />
            <div className="h-3 w-14 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartItemRowSkeleton);
