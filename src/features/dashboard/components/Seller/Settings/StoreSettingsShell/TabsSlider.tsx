"use client";

import clsx from "clsx";
import { KeyboardEvent } from "react";

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
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const focus = document.activeElement as HTMLElement | null;
    if (!focus || focus.tagName !== "BUTTON") return;

    const idx = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = tabs[(idx + 1) % tabs.length];
      onChange(next.id);
      (
        document.querySelector(
          `button[data-tab="${next.id}"]`
        ) as HTMLButtonElement | null
      )?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
      onChange(prev.id);
      (
        document.querySelector(
          `button[data-tab="${prev.id}"]`
        ) as HTMLButtonElement | null
      )?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(tabs[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div className="w-full">
      {/* wrapper uses flex-wrap so pills go to next line on small screens */}
      <div
        className="flex flex-wrap gap-2 items-center py-1"
        role="tablist"
        aria-label="Store settings tabs"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t) => {
          const isActive = t.id === active;

          return (
            <button
              key={t.id}
              data-tab={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(t.id)}
              className={clsx(
                "relative cursor-pointer z-10 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                "box-border border-2 min-h-[36px] leading-[1rem]",

                isActive
                  ? "bg-[#7C3BED] text-white border-[#7C3BED]"
                  : "bg-[#DADADA] text-[#000000] border-transparent"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
