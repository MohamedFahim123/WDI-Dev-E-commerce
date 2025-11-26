import { ReactNode } from "react";
import { BuyerLayoutShell } from "@/src/components/Dashboard/Buyer/BuyerLayoutShell/BuyerLayoutShell";

interface BuyerLayoutProps {
  children: ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return <BuyerLayoutShell>{children}</BuyerLayoutShell>;
}
