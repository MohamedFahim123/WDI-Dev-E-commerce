"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import Link from "next/link";

type Props = {
  message?: string;
};

export function ProductError({ message }: Props) {
  const lang = useRouteLang();
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="mb-4 text-6xl">😕</div>
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">
        {message ?? "We couldn’t load this product right now."}
      </p>
      <Link
        href={`/${lang}/shop`}
        className="inline-block rounded-md bg-[#7C3BED] hover:text-[#7C3BED] border-1 border-[#7C3BED] text-white px-5 py-2 font-medium hover:bg-white transition"
      >
        Back to Shop
      </Link>
    </div>
  );
}
