import React from "react";

function OrderTrackingCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 space-y-4">
      <div className="h-5 w-40 rounded skeleton-shimmer" />

      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full skeleton-shimmer" />
          <div className="flex-1 space-y-1">
            <div className="h-4 w-32 rounded skeleton-shimmer" />
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}

      <div className="h-12 w-full rounded-md skeleton-shimmer" />
    </div>
  );
}
export default React.memo(OrderTrackingCardSkeleton);
