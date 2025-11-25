import React from "react";

function OrderItemsCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 space-y-4">
      <div className="h-5 w-32 rounded skeleton-shimmer" />

      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-md skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 rounded skeleton-shimmer" />
            <div className="h-4 w-20 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default React.memo(OrderItemsCardSkeleton);
