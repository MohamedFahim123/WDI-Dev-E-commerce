import React from "react";
function ShippingAddressCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 space-y-3">
      <div className="h-5 w-40 rounded skeleton-shimmer" />

      <div className="space-y-2">
        <div className="h-4 w-48 rounded skeleton-shimmer" />
        <div className="h-4 w-40 rounded skeleton-shimmer" />
        <div className="h-4 w-32 rounded skeleton-shimmer" />
        <div className="h-4 w-20 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}
export default React.memo(ShippingAddressCardSkeleton);
