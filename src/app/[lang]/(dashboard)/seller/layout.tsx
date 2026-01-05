import { SellerLayoutShell } from "@/src/components/Dashboard/Seller/SellerrLayoutShell/SellerLayoutShell";
import { requireRole } from "@/src/lib/guards/serverRoleGuard";
interface BuyerLayoutProps {
  children: React.ReactNode;

  params: Promise<{ lang: string }>;
}

export default async function SellerLayout({
  children,
  params,
}: BuyerLayoutProps) {
  const { lang } = await params;

  await requireRole({ lang, role: "seller" });

  return <SellerLayoutShell>{children}</SellerLayoutShell>;
}
