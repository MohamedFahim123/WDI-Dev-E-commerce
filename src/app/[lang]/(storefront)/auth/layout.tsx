import { requireGuest } from "@/src/lib/guards/serverRoleGuard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function AuthRootLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { lang } = await params;

  await requireGuest({
    lang,
    redirectTo: (l, role) => `/${l}/${role}/profile`,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#7C3BED1A] via-[#FAFAFA] to-[#F974151A] px-4 py-6 flex items-center justify-center">
      <section
        aria-label="Authentication"
        className="
          w-full max-w-md rounded-3xl
          bg-gradient-to-br from-[#F974151A] via-[#FAFAFA] to-[#7C3BED1A]
          shadow-[0_18px_45px_rgba(15,23,42,0.18)]
          px-6 py-8
          sm:bg-white sm:bg-none sm:px-8 sm:py-10
        "
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to home page"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-[#7C3BED] hover:underline transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        {children}
      </section>
    </div>
  );
}
