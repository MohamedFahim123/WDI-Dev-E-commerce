"use client";

import type { ShopFilters } from "@/src/stores/shopStore";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";

type Option = { value: string; label: string };
type ColorOption = Option & { hex?: string };

type Props = {
  open: boolean;
  onClose: () => void;

  draft: ShopFilters;
  setDraft: React.Dispatch<React.SetStateAction<ShopFilters>>;

  onApply: () => void;
  onClear: () => void;

  categories: Option[];
  brands: Option[];
  colors: ColorOption[];
  sizes: Option[];
  priceOptions: Option[];
};

function activeCount(filters: ShopFilters) {
  const entries = Object.entries(filters) as Array<
    [keyof ShopFilters, unknown]
  >;
  return entries.filter(
    ([k, v]) => k !== "sort" && String(v ?? "all") !== "all",
  ).length;
}

export default function FiltersOffcanvas({
  open,
  onClose,
  draft,
  setDraft,
  onApply,
  onClear,
  categories,
  brands,
  colors,
  sizes,
  priceOptions,
}: Props) {
  // ESC close
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock body scroll
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const count = useMemo(() => activeCount(draft), [draft]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* overlay */}
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 h-screen bg-black/40"
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className="absolute right-0 top-0 h-screen w-[92%] max-w-md bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Filters</p>
            <p className="text-xs text-zinc-500">{count} active</p>
          </div>

          <button
            type="button"
            className="rounded-full p-2 hover:bg-zinc-100"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-132px)] overflow-y-auto px-4 py-4 space-y-6">
          {/* Category */}
          <section className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Category</p>
            <select
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              value={String(draft.categoryId ?? "all")}
              onChange={(e) =>
                setDraft((p) => ({ ...p, categoryId: e.target.value }))
              }
            >
              {categories.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </section>

          {/* Price */}
          <section className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Price</p>
            <select
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              value={String(draft.price ?? "all")}
              onChange={(e) =>
                setDraft((p) => ({ ...p, price: e.target.value }))
              }
            >
              {priceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </section>

          {/* Brand */}
          <section className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Brand</p>
            <select
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              value={String(draft.brandId ?? "all")}
              onChange={(e) =>
                setDraft((p) => ({ ...p, brandId: e.target.value }))
              }
            >
              {brands.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </section>

          {/* Color */}
          <section className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Color</p>

            <div className="grid grid-cols-2 gap-2">
              {colors.map((c) => {
                const selected = String(draft.colorId ?? "all") === c.value;

                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() =>
                      setDraft((p) => ({
                        ...p,
                        colorId: selected ? "all" : c.value,
                      }))
                    }
                    className={[
                      "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                      selected ? "border-[#7C3BED]" : "border-zinc-200",
                    ].join(" ")}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-zinc-300"
                      style={{ backgroundColor: c.hex || "transparent" }}
                    />
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Size */}
          <section className="space-y-2">
            <p className="text-sm font-semibold text-zinc-900">Size</p>
            <select
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              value={String(draft.sizeId ?? "all")}
              onChange={(e) =>
                setDraft((p) => ({ ...p, sizeId: e.target.value }))
              }
            >
              {sizes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </section>
        </div>

        <div className="border-t border-zinc-200 px-4 py-4 flex gap-2">
          <button
            type="button"
            className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            onClick={onClear}
          >
            Clear all
          </button>

          <button
            type="button"
            className="w-full rounded-full bg-[#7C3BED] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d28d9]"
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </aside>
    </div>
  );
}
