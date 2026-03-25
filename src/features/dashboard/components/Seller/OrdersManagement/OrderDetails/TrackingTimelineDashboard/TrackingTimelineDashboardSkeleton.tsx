export default function TrackingTimelineDashboardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-5 space-y-4">
      <div className="h-5 w-28 rounded skeleton-shimmer" />

      <div className="space-y-4 mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative pl-8">
            <div className="absolute left-0 top-0 h-6 w-6 rounded-full skeleton-shimmer" />
            <div className="h-4 w-36 rounded skeleton-shimmer" />
            <div className="mt-2 h-3 w-24 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>

      <div className="h-12 w-full rounded skeleton-shimmer" />
    </div>
  );
}
