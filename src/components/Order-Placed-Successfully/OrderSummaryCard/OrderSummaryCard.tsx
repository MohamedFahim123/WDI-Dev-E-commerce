"use client";

import { Download, LifeBuoy } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { orderSummary } from "../OrderSuccessData";
import Row from "@/src/components/Checkout/Row/Row";

const AED = (v: number) => `AED ${v.toFixed(2)}`;

export default function OrderSummaryCard() {
  const s = orderSummary;

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm text-xs">
        <CardHeader className="px-4 pb-3 pt-4">
          <CardTitle className="text-[13px] font-semibold text-[#111827]">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-4 pt-0">
          <div className="space-y-1.5 text-[11px]">
            <Row label="Subtotal" value={AED(s.subtotal)} />
            <Row
              label="Shipping"
              value={s.shipping === 0 ? "Free" : AED(s.shipping)}
            />
            <Row label="VAT (15%)" value={AED(s.vat)} />
            <Row
              label="Discount"
              value={`-AED ${s.discount.toFixed(2)}`}
              labelClass="text-emerald-600"
              valueClass="text-emerald-600"
            />
          </div>

          <Separator className="bg-[#f3f4f6]" />

          <Row
            label="Total"
            value={AED(s.total)}
            labelClass="text-[12px] font-semibold text-[#111827]"
            valueClass="text-[14px] font-semibold"
          />
          <div className="mt-[-6px] text-right text-[14px] font-semibold">
            <span className="text-[#7C3BED]">{AED(s.total)}</span>
          </div>

          <div className="space-y-1.5 pt-1 text-[11px] text-[#4b5563]">
            <p>
              <span className="font-semibold">Payment Method&nbsp;</span>
              {s.paymentMethod} **** {s.paymentLast4}
            </p>
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
        </CardContent>
      </Card>

      <Button
        type="button"
        className="w-full rounded-full bg-[#7C3BED] text-[13px] font-medium text-white hover:bg-[#6d28d9]"
      >
        Continue Shopping
      </Button>
    </div>
  );
}
