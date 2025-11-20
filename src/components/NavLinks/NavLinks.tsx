"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  const navLinks = [
    { label: "Home", href: `/${lang}` },
    { label: "Categories", href: `/${lang}/products/categories` },
    { label: "Flash Deals", href: `/${lang}/flash-deals` },
    { label: "New Arrivals", href: `/${lang}/new-arrivals` },
    { label: "Track Order", href: `/${lang}/track-order` },
  ];

  return (
    <nav className="flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`inline-block max-w-[100px] text-center text-sm hover:text-[#F97415] transition-all duration-300 ${
            pathname === link.href ? "text-[#F97415]" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
