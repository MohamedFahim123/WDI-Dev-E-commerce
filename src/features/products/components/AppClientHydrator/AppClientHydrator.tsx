"use client";

import { useEffect } from "react";
import type { Product } from "@/src/types/product.types";
import { useCatalogSeedStore } from "@/src/stores/catalogSeedStore";

export default function AppClientHydrator({
  initialSeedProducts,
}: {
  initialSeedProducts: Product[];
}) {
  const hydrateSeed = useCatalogSeedStore((s) => s.hydrateSeed);

  useEffect(() => {
    hydrateSeed(initialSeedProducts);
  }, [hydrateSeed, initialSeedProducts]);

  return null;
}
