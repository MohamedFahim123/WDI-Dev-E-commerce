const TAB_NAMES = [
  "Offer",
  "Content",
  "Variants",
  "Insights",
  "Shipping",
] as const;

export default function TabsNav({
  active,
  onTabClick,
}: {
  active: number;
  onTabClick: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {TAB_NAMES.map((t, idx) => {
        const isActive = idx === active;
        return (
          <button
            key={t}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => onTabClick(idx)}
            className={`text-xs px-3 py-1 rounded-full border ${
              isActive
                ? "bg-[#7C3BED] text-white border-[#7C3BED]"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
