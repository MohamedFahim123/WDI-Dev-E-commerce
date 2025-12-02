import React from "react";

function CreateProductFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-11 w-48 bg-gray-200 rounded-md" />
        <div className="mt-2 h-3 w-64 bg-gray-100 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-11 bg-gray-100 rounded-md" />
        <div className="h-11 bg-gray-100 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-28 bg-gray-100 rounded-md" />
        <div className="h-28 bg-gray-100 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-11 bg-gray-100 rounded-md" />
        <div className="h-32 bg-gray-100 rounded-md" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <div className="h-10 w-24 bg-gray-100 rounded-md" />
        <div className="h-10 w-40 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
export default React.memo(CreateProductFormSkeleton);
