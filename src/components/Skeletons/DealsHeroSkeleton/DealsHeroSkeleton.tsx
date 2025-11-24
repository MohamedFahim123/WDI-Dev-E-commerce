import Container from "../../Container/Container";

export default function DealsHeroSkeleton() {
  return (
    <section
      className="w-full bg-white"
      aria-busy="true"
      aria-label="Loading deals and coupons"
    >
      <Container>
        <div className="py-4 animate-pulse">
          <div className="mb-4 space-y-2">
            <div className="h-3 w-24 rounded skeleton-shimmer" />
            <div className="h-6 w-40 rounded skeleton-shimmer" />
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] bg-[#F9FAFB] p-3 sm:p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-20 rounded-full skeleton-shimmer" />
                <div className="h-5 w-40 rounded skeleton-shimmer" />
                <div className="h-4 w-56 max-w-full rounded skeleton-shimmer" />
                <div className="h-3 w-32 rounded skeleton-shimmer" />
              </div>

              <div className="flex flex-1 flex-col items-start gap-2 sm:items-end">
                <div className="h-8 w-24 rounded-full skeleton-shimmer" />
                <div className="h-10 w-32 rounded-full skeleton-shimmer" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="h-6 w-16 rounded-full skeleton-shimmer" />
              <div className="h-6 w-20 rounded-full skeleton-shimmer" />
              <div className="h-6 w-14 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
