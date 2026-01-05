import { SellerLayoutShell } from "@/src/components/Dashboard/Seller/SellerrLayoutShell/SellerLayoutShell";
import {
  getAuthTokenFromCookieServer,
  getRoleFromCookieServer,
} from "@/src/lib/authCookies";
import { redirect } from "next/navigation";
interface BuyerLayoutProps {
  children: React.ReactNode;

  params: Promise<{ lang: string }>;
}

export default async function SellerLayout({ children, params }: BuyerLayoutProps) {
  const token = await getAuthTokenFromCookieServer();
  const role = await getRoleFromCookieServer();
  const { lang } = await params;

  if (!token && !role) {
    redirect(`/${lang}/auth/login`);
  }
  return <SellerLayoutShell>{children}</SellerLayoutShell>;
}
