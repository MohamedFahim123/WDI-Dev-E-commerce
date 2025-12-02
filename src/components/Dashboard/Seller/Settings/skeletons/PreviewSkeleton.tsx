export default function PreviewSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 w-28 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="h-20 bg-gray-100 rounded" />
        <div className="h-32 bg-gray-100 rounded" />
      </div>
      <div className="h-10 w-24 bg-gray-200 rounded" />
    </div>
  );
}
