"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useAuthStore } from "@/src/stores/authStore";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";

import LangDropDown from "./LangDropDown";
import NotificationsButton from "./NotificationsButton";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import AuthMenu from "./AuthMenu";
import useOutsideClose from "./useOutsideClose";

export default function NavCartContent() {
  const params = useParams();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null);
  const authRef = useRef<HTMLDivElement | null>(null);

  const { isAuthenticated, hydrateFromStorage } = useAuthStore();
  const quantity = useCartStore((s) => s.getQuantity());
  const wishListQuantity = useWishlistStore((s) => s.getQuantity());
  const notificationsNum = 0;

  const currentLang = typeof params?.lang === "string" ? params.lang : "en";

  const getPathForLang = (lang: string) =>
    pathname ? pathname.replace(`/${currentLang}`, `/${lang}`) : `/${lang}`;

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  useOutsideClose(langRef, () => setLangOpen(false));
  useOutsideClose(authRef, () => setAuthOpen(false), true);

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <LangDropDown
        langOpen={langOpen}
        currentLang={currentLang}
        langRef={langRef}
        setAuthOpen={setAuthOpen}
        getPathForLang={getPathForLang}
        setLangOpen={setLangOpen}
      />

      {isAuthenticated && (
        <NotificationsButton
          currentLang={currentLang}
          count={notificationsNum}
        />
      )}

      <WishlistButton currentLang={currentLang} count={wishListQuantity} />
      <CartButton currentLang={currentLang} count={quantity} />

      <AuthMenu
        authOpen={authOpen}
        setAuthOpen={setAuthOpen}
        setLangOpen={setLangOpen}
        currentLang={currentLang}
        authRef={authRef}
      />
    </div>
  );
}
