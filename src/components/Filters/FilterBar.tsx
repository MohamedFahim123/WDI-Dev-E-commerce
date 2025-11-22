"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown } from "lucide-react";
import { MouseEvent, useState } from "react";

import { useShopStore } from "@/src/stores/shopStore";
import { DropdownPortal } from "./DropdownPortal";
import { FilterPill } from "./FilterPill";
import { FILTERS, SORT_KEY, SORT_OPTIONS } from "./config";
import { getOptionsForKey, getOptionLabel, isFilterActive } from "./helpers";

export default function FilterBar() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const filters = useShopStore((s) => s.filters);
  const setFilters = useShopStore((s) => s.setFilters);

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const handleOpen = (key: string, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const handleSelect = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setOpenKey(null);
  };

  const renderDropdownMenu = () => {
    if (!openKey) return null;
    const options = getOptionsForKey(openKey);
    if (!options) return null;

    return (
      <div className="w-48 rounded-md border border-gray-200 bg-white shadow-md">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(openKey, opt.value)}
            className="block w-full px-3 py-1.5 text-left text-sm hover:bg-emerald-50"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full border-b border-gray-100 pb-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <button
            type="button"
            onClick={(e) => handleOpen(SORT_KEY, e)}
            className="flex w-full items-center justify-between rounded-full border border-emerald-600/40 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-emerald-50 md:w-[180px]"
          >
            <span className="mr-1">Sort by</span>
            <span className="flex-1 truncate text-right text-xs text-gray-500">
              {getOptionLabel(SORT_OPTIONS, filters[SORT_KEY])}
            </span>
            <ChevronDown size={15} />
          </button>

          <div className="w-full md:flex-1">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-2 md:gap-3">
                {FILTERS.map((filter) => {
                  const selectedValue = filters[filter.value];
                  const active = isFilterActive(filter, selectedValue);

                  return (
                    <FilterPill
                      key={filter.value}
                      label={filter.label}
                      active={active}
                      selectedLabel={
                        selectedValue &&
                        selectedValue !== filter.options[0]?.value
                          ? getOptionLabel(filter.options, selectedValue)
                          : undefined
                      }
                      widthClass="w-[110px] sm:w-[120px]"
                      onClick={(e) => handleOpen(filter.value, e)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DropdownPortal
        anchorRect={anchorRect}
        open={!!openKey}
        onClose={() => setOpenKey(null)}
      >
        {renderDropdownMenu()}
      </DropdownPortal>
    </>
  );
}
