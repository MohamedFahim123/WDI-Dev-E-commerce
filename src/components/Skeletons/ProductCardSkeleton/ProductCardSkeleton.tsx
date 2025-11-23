import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7]">
      <div className="relative aspect-square skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        <div className="h-5 w-2/3 rounded skeleton-shimmer" />
        <div className="h-9 w-full rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(ProductCardSkeleton);
