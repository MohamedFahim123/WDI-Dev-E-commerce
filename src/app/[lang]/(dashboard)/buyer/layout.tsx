import { BuyerLayoutShell } from "@/src/components/Dashboard/Buyer/BuyerLayoutShell/BuyerLayoutShell";
import {
  getAuthTokenFromCookieServer,
  getRoleFromCookieServer,
} from "@/src/lib/authCookies";
import { redirect } from "next/navigation";

interface BuyerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function BuyerLayout({
  children,
  params,
}: BuyerLayoutProps) {
  const { lang } = await params;

  const token = await getAuthTokenFromCookieServer();
  const role = await getRoleFromCookieServer();

  if (!token) redirect(`/${lang}/auth/login`);

  if (role !== "buyer") redirect(`/${lang}`);

  return <BuyerLayoutShell>{children}</BuyerLayoutShell>;
}
