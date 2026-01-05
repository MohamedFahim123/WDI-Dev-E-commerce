import { BuyerLayoutShell } from "@/src/components/Dashboard/Buyer/BuyerLayoutShell/BuyerLayoutShell";
import { requireRole } from "@/src/lib/guards/serverRoleGuard";

export default async function BuyerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  await requireRole({ lang, role: "buyer" });

  return <BuyerLayoutShell>{children}</BuyerLayoutShell>;
}
