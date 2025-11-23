import React from "react";

export function ProductGallerySkeleton() {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl skeleton-shimmer" />

      <div className="grid grid-cols-4 gap-3">
        <div className="aspect-square rounded-lg skeleton-shimmer" />
        <div className="aspect-square rounded-lg skeleton-shimmer" />
        <div className="aspect-square rounded-lg skeleton-shimmer" />
        <div className="aspect-square rounded-lg skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductInfoPanelSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded skeleton-shimmer" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-4 w-16 rounded-full skeleton-shimmer" />
        <div className="h-4 w-24 rounded skeleton-shimmer" />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-7 w-24 rounded skeleton-shimmer" />
        <div className="h-5 w-16 rounded skeleton-shimmer" />
        <div className="h-6 w-14 rounded-full skeleton-shimmer" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-20 rounded skeleton-shimmer" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full skeleton-shimmer" />
          <div className="h-8 w-8 rounded-full skeleton-shimmer" />
          <div className="h-8 w-8 rounded-full skeleton-shimmer" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-20 rounded skeleton-shimmer" />
        <div className="flex flex-wrap gap-2">
          <div className="h-9 w-16 rounded-md skeleton-shimmer" />
          <div className="h-9 w-16 rounded-md skeleton-shimmer" />
          <div className="h-9 w-16 rounded-md skeleton-shimmer" />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <div className="h-10 w-full rounded-md skeleton-shimmer" />
        <div className="h-10 w-full rounded-md skeleton-shimmer sm:w-32" />
      </div>

      <div className="space-y-2 pt-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-11/12 rounded skeleton-shimmer" />
        <div className="h-3 w-4/5 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductTabsSkeleton() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="h-4 w-24 rounded skeleton-shimmer" />
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-11/12 rounded skeleton-shimmer" />
        <div className="h-3 w-10/12 rounded skeleton-shimmer" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-24 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
        <div className="h-3 w-1/3 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:p-8">
      <div className="mb-6 space-y-2">
        <div className="h-3 w-32 rounded skeleton-shimmer" />
        <div className="h-7 w-1/2 rounded skeleton-shimmer" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallerySkeleton />
        <ProductInfoPanelSkeleton />
      </div>

      <ProductTabsSkeleton />
    </div>
  );
}

export default React.memo(ProductDetailsSkeleton);
