import React from "react";

function SKUCardRowSkeleton() {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-sm animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-36 bg-gray-100 rounded" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
        <div>
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
        <div>
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
        <div>
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
        <div>
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
export default React.memo(SKUCardRowSkeleton);
