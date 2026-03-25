export default function BrandStepSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-5 w-48 bg-gray-200 rounded" />
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-20 rounded border bg-gray-100" />
          <div className="h-20 rounded border bg-gray-100" />
        </div>

        <div className="h-11 bg-gray-100 rounded w-full" />

        <div className="mt-4 h-20 rounded border bg-gray-100" />
      </div>
    </div>
  );
}
