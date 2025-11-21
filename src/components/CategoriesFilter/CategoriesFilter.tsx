"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";

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
          overFlowHidden
        "
        ref={emblaRef}
      >
        <div className="embla__container flex xl:gap-4 md:gap-3">
          {categories.map((category, index) => {
            const active = activeCategory === category;

            return (
              <button
                name={category}
                title={category}
                type="button"
                key={index}
                onClick={() => handleClick(category, index)}
                className={`
                  flex-shrink-0 xl:px-4 md:px-2 py-1 rounded-full transition cursor-pointer
                  ${
                    active
                      ? "text-[#BF5910] border border-[#BF5910]"
                      : "text-[#707070] bg-white border border-white hover:text-[#BF5910]"
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
