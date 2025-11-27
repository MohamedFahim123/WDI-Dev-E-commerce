"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useParams, usePathname } from "next/navigation";
import Container from "../Container/Container";
import GlobalSearchBar from "../GlobalSearchBar/GlobalSearchBar";
import NavCartContent from "../NavCartContent/NavCartContent";
import NavLinks from "../NavLinks/NavLinks";
import NavLocationBadge from "../NavLocationBadge/NavLocationBadge";

export default function Navbar() {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  if (pathname.includes("/auth") || pathname.includes("/buyer")) {
    return <></>;
  }

  return (
    <header className={`shadow-sm ${pathname.includes("buyer") ? "absolute w-full": "sticky"} bg-white top-0 z-50`}>
      <Container className="grid grid-rows-[auto_1px_auto]">
        <div
          className="
            flex items-center justify-between gap-3 py-2 min-h-[56px]
            lg:grid lg:grid-cols-[auto_1fr_auto]
          "
        >
          <Link href={`/${lang}`} className="flex-shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="WDI Logo"
              loading="eager"
              width={135}
              height={40}
              style={{ width: "135px", height: "40px" }}
              fetchPriority="high"
            />
          </Link>

          <div className="hidden lg:block min-w-[500px] max-w-[672px] mx-auto">
            <GlobalSearchBar />
          </div>

          <div className="flex-shrink-0">
            <NavCartContent />
          </div>
        </div>

        <span className="h-[1px] w-full bg-[#F4F4F5] block" />

        <div className="flex items-center justify-between py-2 min-h-[40px]">
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <NavLinks lang={lang} />
            </div>

            <div className="block lg:hidden">
              <NavLocationBadge />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen(true)}
              className="
                inline-flex items-center justify-center
                p-2 rounded-md border border-[#ddd] bg-white lg:hidden
              "
            >
              <Menu size={18} />
            </button>

            <div className="hidden lg:block">
              <NavLocationBadge />
            </div>
          </div>
        </div>
      </Container>

      <div
        className={`fixed inset-0 z-[60] transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsNavOpen(false)}
        />

        <div
          className="
            absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-xl
            flex flex-col overflow-y-auto
          "
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F4F4F5]">
            <Link href={`/${lang}`} className="flex-shrink-0">
              <Image
                src="/assets/logo.svg"
                alt="WDI Logo"
                loading="eager"
                width={135}
                height={40}
                style={{ width: "135px", height: "40px" }}
                fetchPriority="high"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsNavOpen(false)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          <div className="p-4 border-b border-[#F4F4F5]">
            <GlobalSearchBar isInSideBar={true} />
          </div>

          <div className="flex-1 overflow-y-auto">
            <NavLinks
              lang={lang}
              direction="column"
              onNavigate={() => setIsNavOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
