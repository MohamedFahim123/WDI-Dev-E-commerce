"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

const categories = [
  "Cameras",
  "Electronics",
  "Mobiles",
  "Kitchen",
  "Accessories",
  "Labtops",
  "Televisions",
  "Category",
];

export default function CategoriesFilter() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [activeCategory, setActiveCategory] = useState("Cameras");

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // center active item when clicked
  const handleClick = (cat: string, index: number) => {
    setActiveCategory(cat);
    scrollTo(index);
  };

  return (
    <div className="w-full mb-10">
      <div
        className="
          embla
          border border-black
          rounded-[50px]
          px-4 py-3
          mx-auto
          max-w-fit
          cursor-grab
          active:cursor-grabbing
        "
        ref={emblaRef}
      >
        <div className="embla__container flex gap-4">
          {categories.map((category, index) => {
            const active = activeCategory === category;

            return (
              <button
                key={index}
                onClick={() => handleClick(category, index)}
                className={`
                  flex-shrink-0 px-4 py-1 rounded-full transition cursor-pointer
                  ${
                    active
                      ? "text-[#F97415] border border-[#F97415]"
                      : "text-[#707070] bg-white border border-white hover:text-[#F97415]"
                  }
                `}
                style={{ minWidth: 100 }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
