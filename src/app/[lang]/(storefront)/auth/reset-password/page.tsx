import { ResetPasswordForm } from "@/src/features/auth/components/ResetPasswordForm/ResetPasswordForm";
import { getResetEmailFromCookieServer } from "@/src/lib/authCookies";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const email = await getResetEmailFromCookieServer();
  const { lang } = await params;

  if (!email) redirect(`/${lang}/auth/forgot-password`);

  return <ResetPasswordForm />;
}

