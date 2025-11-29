"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  direction?: "row" | "column";
  onNavigate?: () => void;
  lang: string;
};

export default function NavLinks({
  direction = "row",
  onNavigate,
  lang,
}: NavLinksProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: `/${lang}` },
    { label: "Shop", href: `/${lang}/shop` },
    {
      label: "Flash Deals",
      href: `/${lang}/flash-deals`,
    },
    { label: "Request Return", href: `/${lang}/request-return` },
    { label: "My Orders", href: `/${lang}/my-orders` },
    {label: "Create Store",href: `/${lang}/create-store`}
  ];

  const isRow = direction === "row";

  return (
    <nav
      className={
        isRow
          ? "flex items-center space-x-6"
          : "flex flex-col divide-y divide-gray-100"
      }
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const base = "transition-all duration-200";

        if (isRow) {
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`${base} text-sm hover:text-[#BF5910] ${
                isActive ? "text-[#BF5910]" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`
              flex items-center justify-between px-5 py-3 text-sm font-medium
              hover:bg-gray-50
              ${isActive ? "text-[#BF5910]" : "text-gray-700"}
              ${base}
            `}
          >
            {link.label}
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
        );
      })}
    </nav>
  );
}
