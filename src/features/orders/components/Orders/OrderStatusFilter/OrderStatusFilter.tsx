"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export type FilterOptionValue = string;

export interface FilterOption {
  value: FilterOptionValue;
  label: string;
}

interface OrderStatusFilterProps {
  options: FilterOption[];
  value: FilterOptionValue;
  onChange: (newValue: FilterOptionValue) => void;
  className?: string;
}

export function OrderStatusFilter({
  options,
  value,
  onChange,
  className,
}: OrderStatusFilterProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleClick = (optionValue: string, index: number) => {
    if (optionValue === value) return;

    onChange(optionValue);
    scrollTo(index);
  };

  return (
    <div className={clsx("w-full mb-6", className)}>
      <div
        ref={emblaRef}
        aria-label="Filter orders by status"
        className={clsx(
          "embla",
          "rounded-full border border-neutral-200 bg-background",
          "px-2 py-1 text-xs shadow-sm sm:text-sm",
          "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="embla__container flex gap-2">
          {options.map((option, index) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleClick(option.value, index)}
                className={clsx(
                  "flex-shrink-0 cursor-pointer xl:px-4 md:px-3 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF5910] focus-visible:ring-offset-2",
                  active
                    ? "border border-[#BF5910] bg-orange-50 text-[#BF5910]"
                    : "text-muted-foreground bg-white border border-white hover:text-foreground"
                )}
                style={{ minWidth: 100 }}
                aria-pressed={active}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
