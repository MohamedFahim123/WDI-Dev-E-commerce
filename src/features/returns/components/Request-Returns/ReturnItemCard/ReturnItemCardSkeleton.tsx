import React from "react";

function ReturnItemCardSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex gap-3 px-4 pt-4 pb-2">
        <div className="h-14 w-14 rounded-md skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded skeleton-shimmer" />
          <div className="h-3 w-2/3 rounded skeleton-shimmer" />
          <div className="mt-1 flex gap-2">
            <div className="h-4 w-16 rounded-full skeleton-shimmer" />
            <div className="h-4 w-24 rounded-full skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 pt-1">
        <div className="h-4 w-20 rounded skeleton-shimmer" />
      </div>

      <div className="px-4 pb-4 pt-1">
        <div className="h-9 w-full rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(ReturnItemCardSkeleton);
