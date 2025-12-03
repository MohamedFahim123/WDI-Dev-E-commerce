export default function OrderActionsCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-4 space-y-3">
      <div className="flex gap-3">
        <div className="h-10 w-32 rounded-full skeleton-shimmer" />
        <div className="h-10 w-32 rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}
