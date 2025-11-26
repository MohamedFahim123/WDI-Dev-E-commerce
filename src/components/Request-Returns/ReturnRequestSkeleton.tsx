
import React from "react";
import Container from "@/src/components/Container/Container";
import ReturnItemCardSkeleton from "./ReturnItemCard/ReturnItemCardSkeleton";

function ReturnRequestSkeleton() {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-10 animate-pulse">
      <header className="w-full">
        <Container>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-3 w-40 rounded skeleton-shimmer" />
            <div className="h-6 w-64 rounded skeleton-shimmer" />
          </div>

          <div className="mt-4 hidden items-center gap-3 sm:flex">
            <div className="h-10 w-full max-w-md rounded-full skeleton-shimmer" />
            <div className="h-10 w-32 rounded-full skeleton-shimmer" />
          </div>
        </Container>
      </header>

      <section className="py-6">
        <Container>
          <div className="mb-4 flex flex-col gap-3 sm:hidden">
            <div className="h-10 w-full rounded-full skeleton-shimmer" />
            <div className="h-10 w-32 rounded-full skeleton-shimmer" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skeletonItems.map((_, idx) => (
              <ReturnItemCardSkeleton key={idx} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default React.memo(ReturnRequestSkeleton);
