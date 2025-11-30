import React from "react";

function FeatureCardSkeleton() {
  return (
    <div
      className="
        flex items-start gap-3
        h-full
        w-full min-w-[220px]
        rounded-md bg-[#FFF5EE]
        px-3 py-3 shadow-sm
        sm:px-4 sm:py-4
      "
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 p-2 sm:h-12 sm:w-12 sm:p-3">
        <div className="h-6 w-6 skeleton-shimmer rounded" />
      </div>

      <div className="flex flex-col w-full">
        <div className="h-4 w-2/3 rounded skeleton-shimmer mb-1" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}
export default React.memo(FeatureCardSkeleton);
