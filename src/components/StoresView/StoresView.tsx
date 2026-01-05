"use client";

import { useMemo, useState } from "react";
import Container from "@/src/components/Container/Container";

import type { Store } from "@/src/types/store.types";
import { StoresHeader } from "./StoresHeader/StoresHeader";
import { StoresToolbar } from "./StoresToolbar/StoresToolbar";
import { StoresGrid } from "./StoresGrid/StoresGrid";

type SortKey = "recommended" | "name_asc";

function getAllCountries(items: Store[]) {
  const set = new Set<string>();
  items.forEach((s) => s.country && set.add(s.country));
  return ["All", ...Array.from(set)];
}

export default function StoresView({
  lang,
  initialStores,
  serverTotal,
  limit,
  offset,
  apiError,
}: {
  lang: string;
  initialStores: Store[];
  serverTotal: number;
  limit: number;
  offset: number;
  apiError?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("recommended");

  const countries = useMemo(
    () => getAllCountries(initialStores),
    [initialStores]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = initialStores.filter((store) => {
      const matchesQuery =
        !q ||
        store.name.toLowerCase().includes(q) ||
        (store.city ?? "").toLowerCase().includes(q) ||
        (store.state ?? "").toLowerCase().includes(q) ||
        (store.country ?? "").toLowerCase().includes(q) ||
        (store.storeAddress ?? "").toLowerCase().includes(q);

      const matchesCountry =
        activeCountry === "All" || store.country === activeCountry;

      return matchesQuery && matchesCountry;
    });

    const sorted = [...base].sort((a, b) => {
      if (sortKey === "name_asc") return a.name.localeCompare(b.name);
      const v = Number(Boolean(b.isActive)) - Number(Boolean(a.isActive));
      if (v !== 0) return v;
      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [query, activeCountry, sortKey, initialStores]);

  return (
    <section className="py-6">
      <StoresHeader lang={lang} serverTotal={serverTotal} />

      <Container className="py-10 overflow-hidden">
        {apiError ? (
          <div className="mb-6 rounded-xl border border-[#E4E4E7] bg-white p-4">
            <p className="text-sm font-semibold text-foreground">
              Failed to load stores
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{apiError}</p>
          </div>
        ) : null}

        <StoresToolbar
          query={query}
          onQueryChange={setQuery}
          categories={countries}
          activeCategory={activeCountry}
          onCategoryChange={setActiveCountry}
          sortKey={sortKey}
          onSortChange={setSortKey}
          total={filtered.length}
          serverTotal={serverTotal}
        />

        <StoresGrid lang={lang} stores={filtered} />

        <div className="mt-10 flex items-center justify-between">
          <a
            className={`text-sm font-semibold ${
              offset <= 0 ? "pointer-events-none opacity-50" : "text-[#7C3BED]"
            }`}
            href={`/${lang}/stores?limit=${limit}&offset=${Math.max(
              0,
              offset - limit
            )}`}
          >
            ← Previous
          </a>

          <a
            className={`text-sm font-semibold ${
              offset + limit >= serverTotal
                ? "pointer-events-none opacity-50"
                : "text-[#7C3BED]"
            }`}
            href={`/${lang}/stores?limit=${limit}&offset=${offset + limit}`}
          >
            Next →
          </a>
        </div>
      </Container>
    </section>
  );
}
