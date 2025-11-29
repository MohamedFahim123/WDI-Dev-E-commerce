import { SellerLayoutShell } from "@/src/components/Dashboard/Seller/SellerrLayoutShell/SellerLayoutShell";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return <SellerLayoutShell>{children}</SellerLayoutShell>;
}
