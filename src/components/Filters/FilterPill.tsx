"use client";

type FilterPillProps = {
  label: string;
  active: boolean;
  selectedLabel?: string;
  widthClass?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FilterPill = ({
  label,
  active,
  selectedLabel,
  widthClass = "w-[120px]",
  onClick,
}: FilterPillProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center justify-between whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors",
        widthClass,
        active
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-emerald-600/40 bg-white text-gray-800 hover:bg-emerald-50",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={
          "ml-1 flex-1 truncate text-right text-xs " +
          (active ? "text-emerald-50" : "text-gray-500")
        }
      >
        {selectedLabel ?? ""}
      </span>
      <svg
        aria-hidden="true"
        className={
          "ml-1 h-3 w-3 shrink-0 " +
          (active ? "fill-white" : "fill-emerald-700")
        }
        viewBox="0 0 16 16"
      >
        <path d="M4 6l4 4 4-4z" />
      </svg>
    </button>
  );
};
