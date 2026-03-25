import { Funnel, Search } from "lucide-react";
import React from "react";

type StatusFilter = "all" | "active" | "pending" | "out_of_stock";
type StockFilter = "all" | "in" | "out";

export type ToolbarProps = {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
  stockFilter: StockFilter;
  setStockFilter: React.Dispatch<React.SetStateAction<StockFilter>>;
};
export default function CatalogToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  stockFilter,
  setStockFilter,
}: ToolbarProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            <Search className="h-4 w-4" />
          </span>
          <input
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for SKU or product..."
            className="w-full rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-10 py-2 text-sm placeholder:text-[#9CA3AF] outline-none focus:ring-1 focus:ring-[#7C3BED]"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm appearance-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="out_of_stock">Out of stock</option>
          </select>

          <select
            aria-label="Filter by stock"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as StockFilter)}
            className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm appearance-none"
          >
            <option value="all">All Stock</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>

          <button
            type="button"
            className="w-full inline-flex items-center gap-2 justify-center rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
            onClick={() => {
              const el = document.querySelector(
                'select[aria-label="Filter by status"]'
              ) as HTMLSelectElement | null;
              el?.focus();
            }}
          >
            <Funnel className="h-4 w-4" />
            All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
