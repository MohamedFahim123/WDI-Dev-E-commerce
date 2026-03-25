import Container from "@/src/components/Container/Container";
import React from "react";

function MyOrdersSkeleton() {
  const cards = Array.from({ length: 4 });

  return (
    <section className="min-h-screen py-8 sm:py-10 animate-pulse">
      <header className="w-full">
        <Container>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-3 w-40 rounded skeleton-shimmer" />
            <div className="h-6 w-32 rounded skeleton-shimmer" />
          </div>
        </Container>
      </header>

      <section className="pt-4">
        <Container>
          <div className="mb-6 w-full">
            <div className="h-9 w-full max-w-xl rounded-full border border-[#E4E4E7] bg-white skeleton-shimmer" />
          </div>

          <div className="mb-4 h-4 w-24 rounded skeleton-shimmer" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col rounded-2xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="h-3 w-20 rounded skeleton-shimmer" />
                  <div className="h-3 w-16 rounded skeleton-shimmer" />
                </div>

                <div className="mb-4 flex gap-2">
                  <div className="h-14 w-14 rounded-xl skeleton-shimmer" />
                  <div className="h-14 w-14 rounded-xl skeleton-shimmer" />
                  <div className="h-14 w-14 rounded-xl skeleton-shimmer" />
                </div>

                <div className="mt-auto space-y-3">
                  <div className="h-3 w-28 rounded skeleton-shimmer" />
                  <div className="h-9 w-full rounded-lg skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </section>
  );
}

export default React.memo(MyOrdersSkeleton);
