import { VerifyEmailForResetForm } from "@/src/components/Auth/VerifyEmailForResetForm/VerifyEmailForResetForm";
import { getResetEmailFromCookieServer } from "@/src/lib/authCookies";
import { redirect } from "next/navigation";

export default async function VerifyAccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const email = await getResetEmailFromCookieServer();
  const { lang } = await params;

  if (!email) redirect(`/${lang}/auth/forgot-password`);

  return <VerifyEmailForResetForm email={email} />;
}
