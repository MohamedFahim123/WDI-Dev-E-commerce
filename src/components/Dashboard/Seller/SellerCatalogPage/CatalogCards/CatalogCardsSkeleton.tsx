import React from "react";
import SKUCardRowSkeleton from "../SKUCardRow/SKUCardRowSkeleton";
function CatalogCardsSkeleton() {
  return (
    <div className="space-y-3 sm:hidden mt-2">
      <SKUCardRowSkeleton />
      <SKUCardRowSkeleton />
      <SKUCardRowSkeleton />
    </div>
  );
}
export default React.memo(CatalogCardsSkeleton);
