"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { orderMeta } from "../OrderSuccessData";

export default function OrderSuccessHeader() {
  return (
    <Card className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <CardHeader className="flex flex-col items-center gap-3 pb-2 pt-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcfce7]">
          <CheckCircle2 size={28} style={{ color: "#16A34A" }} />
        </div>
        <CardTitle className="text-lg font-semibold text-[#111827]">
          Order Placed Successfully!
        </CardTitle>
        <p className="text-xs text-[#6b7280]">
          Thank you for your purchase. Your order has been confirmed.
        </p>
      </CardHeader>
      <CardContent className="pb-6 text-center text-xs text-[#4b5563]">
        <p className="mb-1">
          <span className="font-semibold">Order ID:</span>{" "}
          <span className="font-semibold text-[#111827]">
            {orderMeta.orderId}
          </span>{" "}
          · {orderMeta.placedAt}
        </p>
        <p>
          <span className="font-semibold">Estimated Delivery:</span>{" "}
          <span className="font-semibold text-[#7C3BED]">
            {orderMeta.estimate}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
