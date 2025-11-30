import React from "react";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

function ProductsGridSkeleton({ count = 8 }: { count?: number }) {
  const items = new Array(count).fill(null);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
export default React.memo(ProductsGridSkeleton);
