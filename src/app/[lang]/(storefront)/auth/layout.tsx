import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthRootLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white sm:bg-gradient-to-br from-[#7C3BED1A] via-[#FAFAFA] to-[#F974151A] px-4 py-6 flex items-center justify-center">
      <section
        className="w-full max-w-md shadow-none rounded-3xl bg-white  sm:shadow-[0_18px_45px_rgba(15,23,42,0.18)] px-6 py-8 sm:px-8 sm:py-10"
        aria-label="Authentication"
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:text-[#7C3BED] hover:underline transition-all duration-200"
            aria-label="Back to home page"
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
