import Container from "@/src/components/Container/Container";
import React from "react";

function ReturnItemRequestSkeleton() {
  const reasonSkeletons = Array.from({ length: 5 });
  const methodSkeletons = Array.from({ length: 2 });
  const policySkeletons = Array.from({ length: 3 });

  return (
    <div className="min-h-screen py-8 sm:py-10 animate-pulse">
      <header className="w-full">
        <Container>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-3 w-44 rounded skeleton-shimmer" />
            <div className="h-6 w-40 rounded skeleton-shimmer" />
          </div>
        </Container>
      </header>

      <section className="py-6">
        <Container>
          <form className="mx-auto max-w-2xl space-y-8">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="h-16 w-16 rounded-md skeleton-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-4/5 rounded skeleton-shimmer" />
                  <div className="h-3 w-3/5 rounded skeleton-shimmer" />

                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="h-4 w-20 rounded-full skeleton-shimmer" />
                    <div className="h-4 w-24 rounded-full skeleton-shimmer" />
                  </div>

                  <div className="mt-2 h-4 w-16 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>

            <section className="space-y-3">
              <div className="h-4 w-40 rounded skeleton-shimmer" />

              <div className="space-y-2">
                {reasonSkeletons.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3"
                  >
                    <div className="h-4 w-4 rounded-full skeleton-shimmer" />
                    <div className="h-3 w-32 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="h-4 w-44 rounded skeleton-shimmer" />

              <div className="flex flex-wrap gap-3">
                <div className="h-16 w-16 rounded-md skeleton-shimmer" />
                <div className="h-16 w-16 rounded-md skeleton-shimmer" />
                <div className="h-16 w-16 rounded-md skeleton-shimmer" />
              </div>
            </section>

            <section className="space-y-3">
              <div className="h-4 w-32 rounded skeleton-shimmer" />

              <div className="space-y-2">
                {methodSkeletons.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3"
                  >
                    <div className="h-4 w-4 rounded-full skeleton-shimmer" />
                    <div className="h-3 w-40 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>

              <div className="mt-2 space-y-1">
                <div className="h-3 w-28 rounded skeleton-shimmer" />
                <div className="h-11 w-full rounded-2xl skeleton-shimmer" />
              </div>
            </section>

            <section className="space-y-3">
              <div className="h-4 w-40 rounded skeleton-shimmer" />

              <div className="space-y-2">
                {policySkeletons.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-9 w-full rounded-2xl skeleton-shimmer"
                  />
                ))}
              </div>

              <div className="mt-2 h-9 w-full rounded-full skeleton-shimmer" />
            </section>

            <section className="space-y-3">
              <div className="h-4 w-32 rounded skeleton-shimmer" />

              <div className="min-h-[120px] w-full rounded-2xl skeleton-shimmer" />

              <div className="mt-2 h-10 w-full rounded-full skeleton-shimmer" />
            </section>
          </form>
        </Container>
      </section>
    </div>
  );
}

export default React.memo(ReturnItemRequestSkeleton);
