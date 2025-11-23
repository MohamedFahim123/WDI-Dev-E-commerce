import React from "react";

function FilterBarSkeleton() {
  return (
    <div className="w-full border-b border-gray-100 pb-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <div className="h-9 w-full rounded-full skeleton-shimmer md:w-[180px]" />
        <div className="h-9 w-full rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(FilterBarSkeleton);
