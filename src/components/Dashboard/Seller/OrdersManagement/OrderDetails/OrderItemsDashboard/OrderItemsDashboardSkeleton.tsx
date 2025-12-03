export default function OrderItemsDashboardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-5 space-y-4">
      <div className="h-5 w-24 rounded skeleton-shimmer" />
      <ul className="space-y-4 mt-2">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-14 w-14 rounded-xl skeleton-shimmer" />
              <div className="min-w-0 space-y-2">
                <div className="h-4 w-36 rounded skeleton-shimmer" />
                <div className="h-3 w-24 rounded skeleton-shimmer" />
              </div>
            </div>
            <div className="h-4 w-20 rounded skeleton-shimmer" />
          </li>
        ))}
      </ul>
    </div>
  );
}
