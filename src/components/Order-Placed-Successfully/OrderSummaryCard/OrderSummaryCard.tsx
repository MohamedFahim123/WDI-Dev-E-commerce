"use client";

import { Button } from "@/src/components/ui/button";
import { useRouteLang } from "@/src/hooks/useLang";
import { Download, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { OrderSummary } from "../../Orders/OrderDetails/OrderDetails";
import { orderSummary } from "../OrderSuccessData";

type Props = {
  summary: OrderSummary;
};

export default function OrderSummaryCard({ summary }: Props) {
  const lang = useRouteLang();
  const s = orderSummary;

  return (
    <div className="flex flex-col gap-4">
      <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>
              {summary.currency} {summary.subtotal.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>
              {summary.shipping === 0
                ? "Free"
                : `${summary.currency} ${summary.shipping.toFixed(2)}`}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>VAT</dt>
            <dd>
              {summary.currency} {summary.vat.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between text-green-600">
            <dt>Discount</dt>
            <dd>
              -{summary.currency} {summary.discount.toFixed(2)}
            </dd>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-semibold text-[#7C3BED]">
            <dt>Total</dt>
            <dd>
              {summary.currency} {summary.total.toFixed(2)}
            </dd>
          </div>
        </dl>

        <div className="mt-3 text-xs text-muted-foreground">
          <p>Payment Method</p>
          <p className="font-medium text-foreground">{summary.payment}</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-[#e5e7eb] bg-white text-[11px] font-medium text-[#111827] hover:bg-[#f3f4f6]"
          >
            <Download size={14} />
            Download Invoice
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-[#e5e7eb] bg-white text-[11px] font-medium text-[#111827] hover:bg-[#f3f4f6]"
          >
            <LifeBuoy size={14} />
            Contact Support
          </Button>
        </div>
      </aside>

      <Link href={`/${lang}/shop`}>
        <Button
          type="button"
          className="w-full rounded-full cursor-pointer bg-[#7C3BED] text-[13px] font-medium text-white hover:bg-[#6d28d9]"
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
