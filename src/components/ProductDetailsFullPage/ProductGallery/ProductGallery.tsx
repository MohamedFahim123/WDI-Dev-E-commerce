"use client";

import type { Product } from "@/src/types/product.types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { Play } from "lucide-react";
import dynamic from "next/dynamic";
const Lightbox = dynamic(
  () => import("@/src/components/ui/Lightbox/Lightbox"),
  {
    ssr: false,
  },
);

type Props = {
  product: Product;
};

export function ProductGallery({ product }: Props) {
  const plugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const images = useMemo(() => product.images ?? [], [product.images]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  const handlePreviewClick = () => {
    if (!images.length) return;
    setIsPreviewOpen(true);
  };

  const slides = useMemo(
    () =>
      images.map((img) => ({
        src: img.url,
        alt: img.alt,
      })),
    [images],
  );

  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 flex items-center justify-center text-sm text-zinc-500">
          No image
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={`${image.id}-${index}`}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 540px, 100vw"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />

                {product.badge === "OFF" ? (
                  <div className="absolute left-3 top-3 rounded bg-[#BF5910] px-2 py-1 text-xs font-medium text-white">
                    -{product.discountCount}%
                  </div>
                ) : product.badge === "HOT" ? (
                  <div className="absolute left-3 top-3 rounded bg-[#DC2626] px-2 py-1 text-xs font-medium text-white">
                    {product.badge}
                  </div>
                ) : (
                  product.badge && (
                    <div className="absolute left-3 top-3 rounded bg-[#F3E8FF] px-2 py-1 text-xs font-medium text-[#7C3BED]">
                      {product.badge}
                    </div>
                  )
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={`${image.id}-thumb-${index}`}
              type="button"
              onClick={() => handleThumbClick(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                isActive
                  ? "border-violet-500 ring-2 ring-violet-200"
                  : "border-zinc-200 hover:border-violet-300"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="120px"
                loading="eager"
              />
            </button>
          );
        })}

        <button
          type="button"
          onClick={handlePreviewClick}
          aria-label="Open image preview"
          className="flex aspect-square items-center justify-center rounded-lg border border-violet-200 bg-zinc-50 text-violet-500 transition hover:border-violet-400 hover:bg-violet-50"
        >
          <Play className="h-5 w-5 cursor-pointer" />
        </button>
      </div>

      {slides.length > 0 && (
        <Lightbox
          open={isPreviewOpen}
          close={() => setIsPreviewOpen(false)}
          slides={slides}
          index={selectedIndex}
        />
      )}
    </div>
  );
}
