"use client";

import { useAuthStore } from "@/src/stores/authStore";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import AuthMenu from "./AuthMenu";
import CartButton from "./CartButton";
import NotificationsMenu from "./NotificationsMenu";
import useOutsideClose from "./useOutsideClose";
import WishlistButton from "./WishlistButton";

export default function NavCartContent() {
  const params = useParams();
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null);
  const authRef = useRef<HTMLDivElement | null>(null);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);
  const hydrateFromServer = useAuthStore((s) => s.hydrateFromServer);
  const quantity = useCartStore((s) => s.getQuantity());
  const wishListQuantity = useWishlistStore((s) => s.getQuantity());
  const loading = useAuthStore((s) => s.loading);
  const logout = useAuthStore((s) => s.logout);

  const currentLang = typeof params?.lang === "string" ? params.lang : "en";

  useEffect(() => {
    (async () => {
      await hydrateFromServer();
    })();
  }, [hydrateFromServer]);

  const isSeller = useMemo(
    () => role?.trim()?.toLowerCase() === "seller",
    [role, logout],
  );

  useOutsideClose(langRef, () => setLangOpen(false));
  useOutsideClose(authRef, () => setAuthOpen(false), true);

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* <LangDropDown
        langOpen={langOpen}
        currentLang={currentLang}
        langRef={langRef}
        setAuthOpen={setAuthOpen}
        getPathForLang={getPathForLang}
        setLangOpen={setLangOpen}
      /> */}

      {isAuthenticated && <NotificationsMenu currentLang={currentLang} />}

      {!isSeller && (
        <>
          <WishlistButton currentLang={currentLang} count={wishListQuantity} />
          <CartButton currentLang={currentLang} count={quantity} />
        </>
      )}

      <AuthMenu
        authOpen={authOpen}
        setAuthOpen={setAuthOpen}
        setLangOpen={setLangOpen}
        currentLang={currentLang}
        authRef={authRef}
        loading={loading}
      />
    </div>
  );
}
