import React from "react";
import Container from "@/src/components/Container/Container";

function ReturnStatusDetailsSkeleton() {
  const steps = Array.from({ length: 5 });

  return (
    <div className="min-h-screen py-8 sm:py-10 overflow-x-hidden animate-pulse">
      <header className="w-full">
        <Container>
          <div className="flex flex-col gap-2 pt-2">
            <div className="h-3 w-48 rounded skeleton-shimmer" />
            <div className="h-6 w-36 rounded skeleton-shimmer" />
          </div>
        </Container>
      </header>

      <section className="py-4">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col gap-8">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="h-16 w-16 rounded-md skeleton-shimmer" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-4/5 rounded skeleton-shimmer" />
                  <div className="h-3 w-3/5 rounded skeleton-shimmer" />

                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="h-4 w-16 rounded-full skeleton-shimmer" />
                    <div className="h-4 w-20 rounded-full skeleton-shimmer" />
                  </div>

                  <div className="mt-2 h-4 w-20 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <div className="h-4 w-40 rounded skeleton-shimmer" />

              <div className="flex flex-wrap gap-4 text-[11px]">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className="h-3 w-20 rounded skeleton-shimmer"
                  />
                ))}
              </div>

              <div className="space-y-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3"
                  >
                    <div className="h-4 w-4 rounded-full skeleton-shimmer" />
                    <div className="h-3 w-32 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <div className="h-9 w-40 rounded-full skeleton-shimmer" />
                <div className="h-9 w-40 rounded-full skeleton-shimmer" />
              </div>
            </section>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default React.memo(ReturnStatusDetailsSkeleton);
