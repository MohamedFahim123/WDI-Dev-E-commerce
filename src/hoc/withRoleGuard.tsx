"use client";

import type { ComponentType, ReactNode } from "react";
import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/stores/authStore";
import { useRouteLang } from "@/src/hooks/useLang";

type GuardOptions = {
  requireAuth?: boolean;
  allowRoles?: string[];
  denyRoles?: string[];
  redirectTo?: string | ((lang: string) => string);
  fallback?: ReactNode;

  autoHydrate?: boolean;
};

function normalizeRole(role?: string | null) {
  return (role ?? "").trim().toLowerCase();
}

function DefaultFallback() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-[#E4E4E7] border-t-[#7C3BED] animate-spin" />
    </div>
  );
}

export function withRoleGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: GuardOptions
) {
  const {
    requireAuth = false,
    allowRoles,
    denyRoles,
    redirectTo,
    fallback,
    autoHydrate = true,
  } = options;

  const allow = allowRoles?.map(normalizeRole);
  const deny = denyRoles?.map(normalizeRole);

  const Guarded: React.FC<P> = (props) => {
    const router = useRouter();
    const lang = useRouteLang();

    const loading = useAuthStore((s) => s.loading);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const role = useAuthStore((s) => s.role);
    const hydrateFromServer = useAuthStore((s) => s.hydrateFromServer);

    const hydrateOnce = useRef(false);
    useEffect(() => {
      if (!autoHydrate) return;
      if (hydrateOnce.current) return;

      if (loading) {
        hydrateOnce.current = true;
        hydrateFromServer();
      }
    }, [autoHydrate, loading, hydrateFromServer]);

    const redirectTarget = useMemo(() => {
      if (!redirectTo) return `/${lang}`;
      return typeof redirectTo === "function" ? redirectTo(lang) : redirectTo;
    }, [redirectTo, lang]);

    const canDecide = !loading;

    const currentRole = normalizeRole(role);

    const isAllowed =
      canDecide &&
      (!requireAuth || isAuthenticated) &&
      (allow?.length ? allow.includes(currentRole) : true) &&
      (deny?.length ? !deny.includes(currentRole) : true);

    const redirected = useRef(false);
    useEffect(() => {
      if (!canDecide) return;

      if (!isAllowed && !redirected.current) {
        redirected.current = true;
        router.replace(redirectTarget);
      }
    }, [canDecide, isAllowed, router, redirectTarget]);

    if (!canDecide) return <>{fallback ?? <DefaultFallback />}</>;
    if (!isAllowed) return <>{fallback ?? <DefaultFallback />}</>;

    return <WrappedComponent {...props} />;
  };

  Guarded.displayName = `withRoleGuard(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Guarded;
}
