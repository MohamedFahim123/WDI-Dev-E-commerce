import { BuyerLayoutShell } from "@/src/components/Dashboard/Buyer/BuyerLayoutShell/BuyerLayoutShell";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return <BuyerLayoutShell>{children}</BuyerLayoutShell>;
}
