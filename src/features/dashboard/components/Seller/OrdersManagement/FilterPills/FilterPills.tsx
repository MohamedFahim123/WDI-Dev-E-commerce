const PILL_LIST = [
  "ALL",
  "NEW",
  "PACKED",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
] as const;
type Pill = (typeof PILL_LIST)[number];

export default function FilterPills({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (p: Pill) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PILL_LIST.map((p) => {
        const isActive = p === selected;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`text-sm cursor-pointer px-3 py-1.5 rounded-full font-medium border transition-all ease-in-out duration-200 ${
              isActive
                ? "bg-violet-600 text-white border-transparent shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
            aria-pressed={isActive}
          >
            {p === "ALL" ? "All" : p.charAt(0) + p.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}
