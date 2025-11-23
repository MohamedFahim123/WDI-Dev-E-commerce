"use client";

import { languages } from "@/src/i18n/settings";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { ChevronDown, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function NavCartContent() {
  const quantity = useCartStore((s) => s.getQuantity());
  const wishListQuantity = useWishlistStore((s) => s.getQuantity());
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentLang =
    (params?.lang as string | undefined) && typeof params.lang === "string"
      ? (params.lang as string)
      : "en";

  const getPathForLang = (lang: string) =>
    pathname ? pathname.replace(`/${currentLang}`, `/${lang}`) : `/${lang}`;

  return (
    <div className="flex items-center space-x-5">
      <div className="relative">
        <button
          name={currentLang}
          title={currentLang}
          type="button"
          onClick={() => setOpen(!open)}
          className="border border-[#ddd] px-2 py-1 rounded text-sm font-medium flex items-center gap-1 bg-white min-w-[60px]"
        >
          {currentLang.toUpperCase()}
          <ChevronDown size={20} />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
            {languages.map((lang) => (
              <Link
                title={lang.name}
                key={lang.code}
                href={getPathForLang(lang.code)}
                className="block px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {lang.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        title="Show Wishlist Page"
        href={`/${currentLang}/wishlist`}
        className="relative w-6"
      >
        <Heart size={20} />
        <span className="absolute -top-1 -right-2 w-[18px] h-[18px] text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
          {wishListQuantity || 0}
        </span>
      </Link>

      <Link
        title="Show Cart Page"
        href={`/${currentLang}/cart`}
        className="relative w-6"
      >
        <ShoppingCart size={20} />
        <span className="absolute -top-1 -right-2 w-[18px] h-[18px] text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
          {quantity || 0}
        </span>
      </Link>

      <Link
        title="Show Profile Page"
        href={`/${currentLang}/profile`}
        className="relative w-6"
      >
        <User size={20} />
      </Link>
    </div>
  );
}
