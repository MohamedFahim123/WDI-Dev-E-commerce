export default function DetailsStepSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-5 w-56 bg-gray-200 rounded" />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <div className="h-8 w-20 bg-gray-100 rounded" />
        <div className="h-8 w-20 bg-gray-100 rounded" />
        <div className="h-8 w-20 bg-gray-100 rounded" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-11 bg-gray-100 rounded" />
          <div className="h-11 bg-gray-100 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-24 bg-gray-100 rounded" />
          <div className="h-24 bg-gray-100 rounded" />
        </div>

        <div className="h-20 bg-gray-100 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-11 bg-gray-100 rounded" />
          <div className="h-11 bg-gray-100 rounded" />
          <div className="h-11 bg-gray-100 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-11 bg-gray-100 rounded" />
          <div className="h-11 bg-gray-100 rounded" />
          <div className="h-11 bg-gray-100 rounded" />
        </div>

   
      </div>
    </div>
  );
}
