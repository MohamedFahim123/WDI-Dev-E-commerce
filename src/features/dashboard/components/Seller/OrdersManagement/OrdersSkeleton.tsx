

export default function OrdersSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="h-10 bg-gray-200 rounded-full w-full max-w-2xl" />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
