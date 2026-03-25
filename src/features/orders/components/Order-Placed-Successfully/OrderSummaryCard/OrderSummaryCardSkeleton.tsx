import React from "react";

function OrderSummaryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 space-y-4">
      <div className="h-5 w-32 rounded skeleton-shimmer" />

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="h-3 w-20 rounded skeleton-shimmer" />
          <div className="h-3 w-16 rounded skeleton-shimmer" />
        </div>
      ))}

      <div className="h-px w-full bg-[#E5E7EB]" />

      <div className="flex items-center justify-between">
        <div className="h-4 w-16 rounded skeleton-shimmer" />
        <div className="h-5 w-24 rounded skeleton-shimmer" />
      </div>

      <div className="h-10 w-full rounded-md skeleton-shimmer" />
      <div className="h-10 w-full rounded-md skeleton-shimmer" />
      <div className="h-10 w-full rounded-full skeleton-shimmer" />
    </div>
  );
}
export default React.memo(OrderSummaryCardSkeleton);
