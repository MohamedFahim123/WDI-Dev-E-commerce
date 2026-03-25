import Container from "@/src/components/Container/Container";
import React from "react";

function MyReturnsSkeleton() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen py-8 sm:py-10 animate-pulse">
      <header className="w-full">
        <Container>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-3 w-40 rounded skeleton-shimmer" />
            <div className="h-6 w-32 rounded skeleton-shimmer" />
          </div>
        </Container>
      </header>

      <section className="py-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                <div className="flex w-full flex-col gap-2 rounded-t-2xl px-4 pt-4 pb-3">
                  <div className="flex gap-3">
                    <div className="h-14 w-14 rounded-md skeleton-shimmer" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-4/5 rounded skeleton-shimmer" />
                      <div className="h-3 w-2/3 rounded skeleton-shimmer" />

                      <div className="mt-2 flex flex-wrap gap-2">
                        <div className="h-4 w-16 rounded-full skeleton-shimmer" />
                        <div className="h-4 w-20 rounded-full skeleton-shimmer" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-1">
                    <div className="h-5 w-24 rounded-full skeleton-shimmer" />
                  </div>

                  <div className="mt-1 h-4 w-16 rounded skeleton-shimmer" />
                </div>

                <div className="px-4 pb-4 pt-1">
                  <div className="h-9 w-full rounded-full skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default React.memo(MyReturnsSkeleton);
