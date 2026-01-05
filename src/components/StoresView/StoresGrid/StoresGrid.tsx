"use client";

import type { Store } from "@/src/types/store.types";
import { StoreCard } from "../StoreCard/StoreCard";

type Props = {
  lang: string;
  stores: Store[];
};

export function StoresGrid({ lang, stores }: Props) {
  if (stores.length === 0) {
    return (
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-8 text-center">
        <p className="text-sm font-semibold text-foreground">No stores found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try another keyword or category.
        </p>
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stores.map((store) => (
        <StoreCard key={store.id} lang={lang} store={store} />
      ))}
    </div>
  );
}
