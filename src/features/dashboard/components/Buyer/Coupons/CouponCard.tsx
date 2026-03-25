"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import type { Coupon } from "./CouponsSection";
import clsx from "clsx";

const VARIANT_STYLES: Record<Coupon["variant"], { bg: string; text: string }> =
  {
    purple: {
      bg: "bg-[#F3E8FF]",
      text: "text-[#7C3BED]",
    },
    blue: {
      bg: "bg-[#DBEAFE]",
      text: "text-[#1D4ED8]",
    },
    pink: {
      bg: "bg-[#FCE7F3]",
      text: "text-[#BE185D]",
    },
  };

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const styles = VARIANT_STYLES[coupon.variant];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "inline-flex items-center rounded-sm px-2 py-[2px] text-[11px] font-semibold uppercase tracking-wide",
              styles.bg,
              styles.text
            )}
          >
            {coupon.badge}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
          <span className="inline-block h-1 w-1 rounded-full bg-[#6B7280]" />
          <span>Expires {coupon.expiresOn}</span>
        </div>
      </div>

      <div className="mt-2 space-y-1 text-xs leading-relaxed text-[#4B5563]">
        <p className="font-medium text-[#111827]">{coupon.title}</p>
        {coupon.description && <p>{coupon.description}</p>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#111827]">
          {coupon.code}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-[11px] font-medium text-[#4B5563] hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
          aria-label={`Copy coupon code ${coupon.code}`}
        >
          <Copy className="h-3.5 w-3.5" />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </article>
  );
}
