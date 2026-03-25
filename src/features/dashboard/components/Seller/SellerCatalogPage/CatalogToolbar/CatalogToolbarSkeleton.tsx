import React from "react";

function CatalogToolbarSkeleton() {
  return (
    <div className="mb-4 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <div className="h-10 w-full rounded-md border border-[#E5E7EB] bg-gray-100 px-10 py-2" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
          <div className="h-10 w-full rounded-md border border-[#E5E7EB] bg-gray-100" />
          <div className="h-10 w-full rounded-md border border-[#E5E7EB] bg-gray-100" />
          <div className="h-10 w-full rounded-md border border-[#E5E7EB] bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
export default React.memo(CatalogToolbarSkeleton);
