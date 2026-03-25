import React from "react";

const OrderSummarySkeleton: React.FC = () => {
  return (
    <div className="self-start rounded-2xl border border-[#f1f1f3] bg-white shadow-sm text-xs">
      <div className="px-4 pb-3 pt-4">
        <div className="h-4 w-28 rounded skeleton-shimmer" />
      </div>

      <div className="space-y-4 px-4 pb-4 pt-0">
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md skeleton-shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded skeleton-shimmer" />
                <div className="h-3 w-16 rounded skeleton-shimmer" />
                <div className="h-3 w-20 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full rounded skeleton-shimmer" />

        <div className="space-y-1.5 text-[11px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between"
            >
              <div className="h-3 w-16 rounded skeleton-shimmer" />
              <div className="h-3 w-20 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>

        <div className="h-px w-full rounded skeleton-shimmer" />

        <div className="flex items-center justify-between">
          <div className="h-3 w-12 rounded skeleton-shimmer" />
          <div className="h-4 w-24 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderSummarySkeleton);
