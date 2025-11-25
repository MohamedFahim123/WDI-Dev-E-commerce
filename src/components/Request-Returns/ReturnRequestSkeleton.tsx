"use client";

import React from "react";
import ReturnItemCardSkeleton from "./ReturnItemCard/ReturnItemCardSkeleton";

function ReturnRequestSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ReturnItemCardSkeleton key={idx} />
      ))}
    </div>
  );
}

export default React.memo(ReturnRequestSkeleton);
