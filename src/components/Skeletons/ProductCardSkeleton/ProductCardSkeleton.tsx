import React from "react";


function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7]">
      <div className="relative bg-gray-100 aspect-square animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-gray-100 rounded animate-pulse" />
        <div className="h-9 w-full bg-gray-100 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
export default React.memo(ProductCardSkeleton);
