"use client";

import { languages } from "@/src/i18n/settings";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { Bell, ChevronDown, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavCartContent() {
  const quantity = useCartStore((s) => s.getQuantity());
  const wishListQuantity = useWishlistStore((s) => s.getQuantity());
  const notificationsNum = 0;

  const params = useParams();
  const pathname = usePathname();

  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const isLogined = false;

  const langRef = useRef<HTMLDivElement | null>(null);
  const authRef = useRef<HTMLDivElement | null>(null);

  const currentLang =
    (params?.lang as string | undefined) && typeof params.lang === "string"
      ? (params.lang as string)
      : "en";

  const getPathForLang = (lang: string) =>
    pathname ? pathname.replace(`/${currentLang}`, `/${lang}`) : `/${lang}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }

      if (authRef.current && !authRef.current.contains(target)) {
        setAuthOpen(false);
      }
    }

    function handleScroll() {
      setLangOpen(false);
      setAuthOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <div className="relative" ref={langRef}>
        <button
          name={currentLang}
          title={currentLang}
          type="button"
          onClick={() => {
            setLangOpen((p) => !p);
            setAuthOpen(false);
          }}
          className="border border-[#ddd] px-2 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium flex items-center gap-1 bg-white min-w-[45px] sm:min-w-[54px] sm:min-w-[60px]"
        >
          {currentLang.toUpperCase()}
          <ChevronDown size={16} className="hidden sm:inline-block" />
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
            {languages.map((lang) => (
              <Link
                title={lang.name}
                key={lang.code}
                href={getPathForLang(lang.code)}
                className="block px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => setLangOpen(false)}
              >
                {lang.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        title="Show Notifications Page"
        href={`/${currentLang}/notifications`}
        className="relative w-5 sm:w-6 flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell size={21} className="sm:h-5 sm:w-5" />
        {notificationsNum > 0 && (
          <span className="absolute -top-1 -right-2 w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[8px] sm:text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
            {notificationsNum}
          </span>
        )}
      </Link>

      <Link
        title="Show Wishlist Page"
        href={`/${currentLang}/wishlist`}
        className="relative w-5 sm:w-6 flex items-center justify-center"
        aria-label="Wishlist"
      >
        <Heart size={21} className="sm:h-5 sm:w-5" />
        <span className="absolute -top-1 -right-2 w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[8px] sm:text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
          {wishListQuantity || 0}
        </span>
      </Link>

      <Link
        title="Show Cart Page"
        href={`/${currentLang}/cart`}
        className="relative w-5 sm:w-6 flex items-center justify-center"
        aria-label="Cart"
      >
        <ShoppingCart size={21} className="sm:h-5 sm:w-5" />
        <span className="absolute -top-1 -right-2 w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[8px] sm:text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
          {quantity || 0}
        </span>
      </Link>

      {isLogined ? (
        <Link
          title="Show Profile Page"
          href={`/${currentLang}/profile`}
          className="relative w-5 sm:w-6 flex items-center justify-center"
          aria-label="Profile"
        >
          <User size={21} className="sm:h-5 sm:w-5" />
        </Link>
      ) : (
        <div className="relative" ref={authRef}>
          <button
            type="button"
            onClick={() => {
              setAuthOpen((p) => !p);
              setLangOpen(false);
            }}
            className="
              relative flex items-center justify-center
              rounded-sm border border-[#7C3BED] bg-[#7C3BED]
              text-white text-xs sm:text-sm
              px-1.5 sm:px-3 py-1
              hover:bg-white hover:text-[#7C3BED]
              transition-all duration-300
              whitespace-nowrap
            "
            aria-haspopup="menu"
            aria-expanded={authOpen}
            aria-label="Open authentication menu"
          >
            <User className="h-4 w-4 sm:mr-1" aria-hidden="true" />
            <span className="hidden sm:inline">Login / Register</span>
          </button>

          {authOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1"
              role="menu"
            >
              <Link
                href={`/${currentLang}/auth/login`}
                className="block px-3 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                onClick={() => setAuthOpen(false)}
              >
                Login
              </Link>
              <Link
                href={`/${currentLang}/auth/register`}
                className="block px-3 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                onClick={() => setAuthOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
