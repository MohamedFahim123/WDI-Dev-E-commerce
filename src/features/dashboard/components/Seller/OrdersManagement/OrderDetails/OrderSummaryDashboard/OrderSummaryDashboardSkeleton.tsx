export default function OrderSummaryDashboardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-5 space-y-4">
      <div className="h-5 w-36 rounded skeleton-shimmer" />
      <div className="space-y-2">
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        <div className="h-3 w-1/3 rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
        <div className="h-3 w-1/4 rounded skeleton-shimmer" />
      </div>

      <div className="h-8 w-full rounded skeleton-shimmer" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-10 rounded skeleton-shimmer" />
        <div className="h-10 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}
