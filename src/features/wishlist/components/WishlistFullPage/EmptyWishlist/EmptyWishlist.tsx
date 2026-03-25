"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  lang: string;
};

function EmptyWishlist({ lang }: Props) {
  return (
    <div
      className="flex flex-col h-[70vh] items-center justify-center bg-white px-6 py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
        <Heart className="h-7 w-7" aria-hidden="true" />
      </div>

      <p className="text-lg font-semibold text-zinc-900">
        Your Wishlist is Empty
      </p>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        Save items you love and quickly add them to your cart when you&apos;re
        ready to buy.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center justify-center rounded-lg bg-[#7C3BED] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6d28d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
        >
          Start Shopping
        </Link>

        <Link
          href={`/${lang}`}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default React.memo(EmptyWishlist);
