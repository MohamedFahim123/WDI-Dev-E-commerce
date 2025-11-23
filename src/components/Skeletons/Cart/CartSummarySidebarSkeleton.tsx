import React from "react";

export function CartSummarySidebarSkeleton() {
  return (
    <aside className="space-y-4">
      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full skeleton-shimmer" />
          <div className="h-4 w-24 rounded skeleton-shimmer" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="h-9 flex-1 rounded-full skeleton-shimmer" />
          <div className="h-9 w-20 rounded-full skeleton-shimmer" />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="h-4 w-28 rounded skeleton-shimmer" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded skeleton-shimmer" />
            <div className="h-3 w-20 rounded skeleton-shimmer" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded skeleton-shimmer" />
            <div className="h-3 w-20 rounded skeleton-shimmer" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded skeleton-shimmer" />
            <div className="h-3 w-20 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-3">
          <div className="flex items-baseline justify-between">
            <div className="h-3 w-12 rounded skeleton-shimmer" />
            <div className="h-5 w-24 rounded skeleton-shimmer" />
          </div>
          <div className="mt-1 h-3 w-32 rounded skeleton-shimmer" />
        </div>
      </section>

      <div className="h-10 w-full rounded-full skeleton-shimmer" />
    </aside>
  );
}

export default React.memo(CartSummarySidebarSkeleton);
