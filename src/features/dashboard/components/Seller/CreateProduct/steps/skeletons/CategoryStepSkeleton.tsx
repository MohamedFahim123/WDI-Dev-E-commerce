export default function CategoryStepSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-5 w-48 bg-gray-200 rounded" />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-11 bg-gray-100 rounded" />
            <div className="h-11 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-11 bg-gray-100 rounded" />
            <div className="h-11 bg-gray-100 rounded" />
          </div>
        </div>

    
      </div>
    </div>
  );
}
