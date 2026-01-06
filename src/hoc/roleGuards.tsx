import type { ReactElement, ReactNode } from "react";
import { guardRole } from "@/src/lib/guards/serverRoleGuard";

type Role = "buyer" | "seller";

type Awaitable<T> = T | Promise<T>;
type ServerComponent<P> = (props: P) => Awaitable<ReactElement>;

type Opts = {
  redirectTo?: string | ((lang: string) => string);
  loginRedirectTo?: string | ((lang: string) => string);
  requireAuth?: boolean;

  fallback?: ReactNode;
};

type ParamsLike = { lang?: unknown };
type PropsWithParams = { params?: unknown };

function isThenable<T = unknown>(v: unknown): v is PromiseLike<T> {
  return (
    typeof v === "object" &&
    v !== null &&
    "then" in v &&
    typeof v.then === "function"
  );
}

async function resolveLangFromProps(props: unknown): Promise<string> {
  if (!props || typeof props !== "object") return "en";

  const maybeParams = (props as PropsWithParams).params;

  const params = isThenable<ParamsLike>(maybeParams)
    ? await maybeParams
    : (maybeParams as ParamsLike | undefined);

  const rawLang = params?.lang;
  return typeof rawLang === "string" && rawLang.length > 0 ? rawLang : "en";
}

function resolveTarget(
  target: Opts["redirectTo"] | Opts["loginRedirectTo"],
  lang: string,
  fallbackValue: string
) {
  if (!target) return fallbackValue;
  return typeof target === "function" ? target(lang) : target;
}

function createServerGuard(config: {
  requireAuth?: boolean;
  allowRoles?: Role[];
  denyRoles?: Role[];
}) {
  return function withGuard<P extends object>(
    Component: ServerComponent<P>,
    opts?: Opts
  ) {
    const Guarded = async (props: P) => {
      const lang = await resolveLangFromProps(props);

      const redirectTo = resolveTarget(opts?.redirectTo, lang, `/${lang}`);
      const loginRedirectTo = resolveTarget(
        opts?.loginRedirectTo,
        lang,
        `/${lang}/auth/login`
      );

      await guardRole({
        lang,
        requireAuth: opts?.requireAuth ?? config.requireAuth ?? true,
        allowRoles: config.allowRoles,
        denyRoles: config.denyRoles,
        redirectTo,
        loginRedirectTo,
      });

      return await Component(props);
    };

    return Guarded;
  };
}

export const withBlockSeller = createServerGuard({
  denyRoles: ["seller"],
  requireAuth: false,
});

export const withBlockBuyer = createServerGuard({
  denyRoles: ["buyer"],
  requireAuth: false,
});

export const withSellerOnly = createServerGuard({
  allowRoles: ["seller"],
  requireAuth: true,
});

export const withBuyerOnly = createServerGuard({
  allowRoles: ["buyer"],
  requireAuth: true,
});
