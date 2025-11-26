"use client";
import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import React from "react";

function Footer() {
  const pathname = usePathname();
  if (pathname.includes("/auth") || pathname.includes("/buyer")) {
    return <></>;
  }

  return (
    <footer className="border-t border-[#E4E4E7] py-4">
      <Container>
        <div className="text-center h-full flex items-center justify-center">
          <h4 className="text-[#71717A] font-semibold text-sm leading-6">
            © 2025 WDI. All rights reserved.
          </h4>
        </div>
      </Container>
    </footer>
  );
}
export default React.memo(Footer);
