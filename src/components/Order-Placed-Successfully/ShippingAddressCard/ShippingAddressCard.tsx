"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { shippingAddress } from "../OrderSuccessData";

export default function ShippingAddressCard() {
  const a = shippingAddress;
  return (
    <Card className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-[11px] text-[#4b5563]">
        <p className="text-[12px] font-semibold text-[#111827]">{a.name}</p>
        <p>{a.line1}</p>
        <p>{a.city}</p>
        {a.country && <p>{a.country}</p>}
        <p className="mt-1">{a.phone}</p>
      </CardContent>
    </Card>
  );
}
