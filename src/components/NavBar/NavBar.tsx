import Image from "next/image";
import Link from "next/link";
import GlobalSearchBar from "../GlobalSearchBar/GlobalSearchBar";
import NavCartContent from "../NavCartContent/NavCartContent";
import NavLinks from "../NavLinks/NavLinks";
import NavLocationBadge from "../NavLocationBadge/NavLocationBadge";
import Container from "../Container/Container";

export default function Navbar() {
  return (
    <header
      className="shadow-sm sticky bg-white top-0 z-50"
    >
      <Container className="grid grid-rows-[auto_1px_auto]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center py-2 gap-4">
          <Link href="/" className="flex-shrink-0">
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

          <div className="min-w-[500px] max-w-[672px] mx-auto">
            <GlobalSearchBar />
          </div>

          <div>
            <NavCartContent />
          </div>
        </div>

        <span className="h-[1px] w-full bg-[#F4F4F5] block"></span>

        <div className="grid grid-cols-[1fr_auto] items-center py-2">
          <NavLinks />
          <NavLocationBadge />
        </div>
      </Container>
    </header>
  );
}
