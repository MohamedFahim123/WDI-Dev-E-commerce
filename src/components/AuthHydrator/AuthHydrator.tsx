"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/stores/authStore";

export default function AuthHydrator() {
  const hydrate = useAuthStore((s) => s.hydrateFromServer);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (loading) hydrate();
  }, [loading, hydrate]);

  return null;
}
