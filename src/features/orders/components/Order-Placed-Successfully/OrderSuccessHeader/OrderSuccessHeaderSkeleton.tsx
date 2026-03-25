import React from "react";

function OrderSuccessHeaderSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center gap-3 text-center">
      <div className="h-10 w-10 rounded-full skeleton-shimmer" />
      <div className="h-5 w-48 rounded skeleton-shimmer" />
      <div className="h-4 w-64 rounded skeleton-shimmer" />
      <div className="h-4 w-40 rounded skeleton-shimmer" />
    </div>
  );
}
export default React.memo(OrderSuccessHeaderSkeleton);
