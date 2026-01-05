"use client";

import type { Store } from "@/src/types/store.types";
import { MapPin, Store as StoreIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { formatStoreLocation } from "@/src/lib/api/mappers/store.mapper";

export function StoreCard({ lang, store }: { lang: string; store: Store }) {
  const href = `/${lang}/store/${store.id}`;

  const logoSrc =
    store.logoUrl && store.logoUrl.trim().length > 0
      ? store.logoUrl
      : "/assets/logos/companylogo.webp";

  const location = formatStoreLocation(store);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-md">
      <Link href={href} className="block">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-[#f3f3f3]">
              <Image
                src={logoSrc}
                alt={`${store.name} logo`}
                width={56}
                height={56}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p
                  className="truncate text-sm font-semibold text-[#111827] transition-colors hover:text-[#7C3BED]"
                  title={store.name}
                >
                  {store.name}
                </p>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    store.isActive
                      ? "bg-[#F3E8FF] text-[#7C3BED]"
                      : "bg-[#FEE2E2] text-[#DC2626]"
                  }`}
                >
                  {store.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {location ? (
                <div className="mt-1 flex items-center gap-1 text-xs text-[#71717A]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{location}</span>
                </div>
              ) : null}
            </div>
          </div>

          {store.description ? (
            <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
              {store.description}
            </p>
          ) : null}

          <div className="mt-4 rounded-lg border border-[#f2f2f2] bg-white p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#71717A]">Min order</span>
              <span className="font-bold text-foreground">
                {(store.minOrderAmount ?? 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-auto px-4 pb-4">
        <Button
          asChild
          size="sm"
          className="
            h-11 w-full rounded-md border border-[#7C3BED]
            bg-[#7C3BED] text-white font-semibold
            transition-all duration-300
            hover:bg-white hover:text-[#7C3BED]
          "
        >
          <Link href={href} aria-label={`Visit ${store.name} store`}>
            <span className="inline-flex items-center gap-2">
              <StoreIcon className="h-4 w-4" />
              Visit Store
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
