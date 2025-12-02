"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";

type Tab = { id: string; label: string };

export default function TabsSlider({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
  });
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!emblaApi || !activeRef.current) return;
    const index = tabs.findIndex((t) => t.id === active);
    if (index >= 0) emblaApi.scrollTo(index);
  }, [active, emblaApi, tabs]);

  return (
    <div className="w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-2 px-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              ref={(el) => {
                if (t.id === active) activeRef.current = el;
              }}
              onClick={() => onChange(t.id)}
              className={clsx(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition",
                t.id === active
                  ? "bg-[#7C3BED] text-white border border-[#7C3BED]"
                  : "bg-[#F3F4F6] text-[#374151]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
