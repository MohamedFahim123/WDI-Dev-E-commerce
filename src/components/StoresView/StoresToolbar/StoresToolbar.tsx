import { Search } from "lucide-react";

type SortKey = "recommended" | "name_asc";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  categories: string[];
  activeCategory: string;
  onCategoryChange: (v: string) => void;

  sortKey: SortKey;
  onSortChange: (v: SortKey) => void;

  total: number;
  serverTotal?: number;
};

export function StoresToolbar({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
  sortKey,
  onSortChange,
  total,
  serverTotal,
}: Props) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search stores, city, country..."
            className="
              h-11 w-full rounded-full border border-[#E4E4E7] bg-white pl-10 pr-4
              text-sm text-foreground shadow-[0px_1px_2px_rgba(0,0,0,0.04)]
              outline-none transition
              focus:border-[#7C3BED] focus:ring-2 focus:ring-[#7C3BED]/20
            "
          />
        </div>

        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
          <div className="text-xs text-muted-foreground">
            Showing {total.toLocaleString()}
            {typeof serverTotal === "number"
              ? ` of ${serverTotal.toLocaleString()}`
              : ""}{" "}
            stores
          </div>

          <select
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="
              h-11 w-full rounded-full border border-[#E4E4E7] bg-white px-4 text-sm
              shadow-[0px_1px_2px_rgba(0,0,0,0.04)]
              outline-none transition
              focus:border-[#7C3BED] focus:ring-2 focus:ring-[#7C3BED]/20
              sm:w-[220px]
            "
          >
            <option value="recommended">Recommended</option>
            <option value="name_asc">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`
                rounded-full border px-4 py-2 text-xs font-semibold transition
                ${
                  active
                    ? "border-[#7C3BED] bg-[#7C3BED] text-white"
                    : "border-[#E4E4E7] bg-white text-[#707070] hover:border-[#7C3BED] hover:text-[#7C3BED]"
                }
              `}
              aria-pressed={active}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
