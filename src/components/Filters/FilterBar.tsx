"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";

import { parseRange } from "@/src/services/productFilterService";
import {
  DEFAULT_FILTERS,
  useShopStore,
  type ShopFilters,
} from "@/src/stores/shopStore";
import { DropdownPortal } from "./DropdownPortal";
import { FilterPill } from "./FilterPill";

type Option = { value: string; label: string };
type ColorOption = Option & { hex?: string };

const FiltersOffcanvas = dynamic(() => import("./FilterOffcanvas"), {
  ssr: false,
});

type Props = {
  categories: Option[];
  priceOptions: Option[];

  brands: Option[];
  colors: ColorOption[];
  sizes: Option[];

  priceCurrency?: string;
};

type QuickFilterKey = Extract<
  keyof ShopFilters,
  "sort" | "categoryId" | "price"
>;

type FilterConfig = {
  key: QuickFilterKey;
  label: string;
  options: Option[];
};

const SORT_OPTIONS: Option[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
];

function getOptionLabel(opts: Option[], value: string) {
  return opts.find((o) => o.value === value)?.label;
}

function getPriceFallbackLabel(value: string, currency?: string) {
  const r = parseRange(value);
  if (!r) return undefined;
  const c = currency ? `${currency} ` : "";
  return `${c}${r.min} – ${c}${r.max}`;
}

function activeCount(filters: ShopFilters) {
  const entries = Object.entries(filters) as Array<
    [keyof ShopFilters, unknown]
  >;
  return entries.filter(
    ([k, v]) => k !== "sort" && String(v ?? "all") !== "all",
  ).length;
}

export default function FilterBar({
  categories,
  priceOptions,
  brands,
  colors,
  sizes,
  priceCurrency,
}: Props) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const filters = useShopStore((s) => s.filters);
  const setFilters = useShopStore((s) => s.setFilters);
  const setAllFilters = useShopStore((s) => s.setAllFilters);
  const resetFilters = useShopStore((s) => s.resetFilters);

  const [openKey, setOpenKey] = useState<QuickFilterKey | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const [openAll, setOpenAll] = useState(false);
  const [draft, setDraft] = useState<ShopFilters>(filters);

  useEffect(() => {
    if (openAll) setDraft(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAll]);

  const syncUrl = (next: ShopFilters) => {
    const qs = new URLSearchParams(sp.toString());

    if (next.categoryId && next.categoryId !== "all")
      qs.set("category_id", next.categoryId);
    else qs.delete("category_id");

    if (next.price && next.price !== "all") {
      const r = parseRange(next.price);
      if (r) {
        qs.set("min_price", String(r.min));
        qs.set("max_price", String(r.max));
      } else {
        qs.delete("min_price");
        qs.delete("max_price");
      }
    } else {
      qs.delete("min_price");
      qs.delete("max_price");
    }

    if (next.sort && next.sort !== "relevance") qs.set("sort", next.sort);
    else qs.delete("sort");

    if (next.brandId && next.brandId !== "all")
      qs.set("company_id", next.brandId);
    else qs.delete("company_id");

    if (next.colorId && next.colorId !== "all")
      qs.set("color_id", next.colorId);
    else qs.delete("color_id");

    if (next.sizeId && next.sizeId !== "all") qs.set("size_id", next.sizeId);
    else qs.delete("size_id");

    if (!qs.get("limit")) qs.set("limit", "20");
    qs.set("offset", "0");

    router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
  };

  const filterConfigs: FilterConfig[] = useMemo(() => {
    const base: FilterConfig[] = [
      { key: "categoryId", label: "Category", options: categories },
      { key: "price", label: "Price", options: priceOptions },
    ];
    return base.filter((f) => f.options.length > 1);
  }, [categories, priceOptions]);

  const optionsByKey: Record<QuickFilterKey, Option[]> = useMemo(
    () => ({
      sort: SORT_OPTIONS,
      categoryId: categories,
      price: priceOptions,
    }),
    [categories, priceOptions],
  );

  const handleOpen = (
    key: QuickFilterKey,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const handleSelect = (key: QuickFilterKey, value: string) => {
    const next = { ...filters, [key]: value } as ShopFilters;
    setFilters({ [key]: value } as Partial<ShopFilters>);
    syncUrl(next);
    setOpenKey(null);
  };

  const renderDropdownMenu = () => {
    if (!openKey) return null;
    const options = optionsByKey[openKey];
    if (!options) return null;

    return (
      <div className="w-56 rounded-md border border-gray-200 bg-white shadow-md">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(openKey, opt.value)}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-emerald-50"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  const actives = useMemo(() => activeCount(filters), [filters]);

  return (
    <>
      <div className="w-full border-b border-gray-100 pb-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <button
            type="button"
            onClick={(e) => handleOpen("sort", e)}
            className="flex w-full items-center justify-between rounded-full border border-emerald-600/40 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-emerald-50 md:w-[220px]"
          >
            <span className="mr-1">Sort by</span>
            <span className="flex-1 truncate text-right text-xs text-gray-500">
              {getOptionLabel(
                SORT_OPTIONS,
                String(filters.sort ?? "relevance"),
              ) ?? "Relevance"}
            </span>
            <ChevronDown size={15} />
          </button>

          <div className="w-full md:flex-1">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-2 md:gap-3">
                {filterConfigs.map((filter) => {
                  const selectedValue = String(filters[filter.key] ?? "all");
                  const active = selectedValue !== "all";

                  let selectedLabel: string | undefined;

                  if (active) {
                    selectedLabel = getOptionLabel(
                      filter.options,
                      selectedValue,
                    );

                    if (!selectedLabel && filter.key === "price") {
                      selectedLabel = getPriceFallbackLabel(
                        selectedValue,
                        priceCurrency,
                      );
                    }

                    if (!selectedLabel && filter.key === "categoryId") {
                      selectedLabel = `Category ${selectedValue}`;
                    }
                  }

                  return (
                    <FilterPill
                      key={filter.key}
                      label={filter.label}
                      active={active}
                      selectedLabel={selectedLabel}
                      widthClass="w-[130px] sm:w-[150px]"
                      onClick={(e) => handleOpen(filter.key, e)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAll(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 md:w-auto"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters {actives > 0 ? `(${actives})` : ""}
          </button>
        </div>
      </div>

      <DropdownPortal
        anchorRect={anchorRect}
        open={!!openKey}
        onClose={() => setOpenKey(null)}
      >
        {renderDropdownMenu()}
      </DropdownPortal>

      <FiltersOffcanvas
        open={openAll}
        onClose={() => setOpenAll(false)}
        draft={draft}
        setDraft={setDraft}
        categories={categories}
        priceOptions={priceOptions}
        brands={brands}
        colors={colors}
        sizes={sizes}
        onClear={() => {
          resetFilters();
          setDraft(DEFAULT_FILTERS);
          syncUrl(DEFAULT_FILTERS);
          setOpenAll(false);
        }}
        onApply={() => {
          setAllFilters(draft);
          syncUrl(draft);
          setOpenAll(false);
        }}
      />
    </>
  );
}
