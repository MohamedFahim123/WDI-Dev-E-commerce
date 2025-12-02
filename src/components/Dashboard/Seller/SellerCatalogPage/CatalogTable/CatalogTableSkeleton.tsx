import React from "react";
function CatalogTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="text-xs text-[#6B7280]">
            <th className="py-3 px-4 w-1/4">
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            </th>
            <th className="py-3 px-4 w-1/6">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </th>
            <th className="py-3 px-4 w-1/6">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </th>
            <th className="py-3 px-4 w-1/6">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </th>
            <th className="py-3 px-4 w-1/12">
              <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
            </th>
            <th className="py-3 px-4 w-1/6">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i} className="border-t last:border-b">
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-40 bg-gray-100 rounded mt-2 animate-pulse" />
              </td>
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </td>
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </td>
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </td>
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
              </td>
              <td className="py-4 px-4 align-top">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default React.memo(CatalogTableSkeleton);
