import React from "react";

function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7]">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-14 w-14 rounded-full skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded skeleton-shimmer" />
            <div className="h-3 w-1/3 rounded skeleton-shimmer" />
            <div className="h-3 w-1/2 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="h-6 w-16 rounded-full skeleton-shimmer" />
          <div className="h-6 w-20 rounded-full skeleton-shimmer" />
          <div className="h-6 w-14 rounded-full skeleton-shimmer" />
        </div>

        <div className="mt-4 h-12 rounded-lg skeleton-shimmer" />
      </div>

      <div className="px-4 pb-4">
        <div className="h-11 w-full rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(StoreCardSkeleton);
