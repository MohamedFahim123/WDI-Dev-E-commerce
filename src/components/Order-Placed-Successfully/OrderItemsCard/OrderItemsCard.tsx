"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import Image from "next/image";
import { orderItems } from "../OrderSuccessData";

const AED = (v: number) => `AED ${v.toFixed(2)}`;

export default function OrderItemsCard() {
  return (
    <Card className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-4 pt-0">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs">
            <Image
              src={item.imageSrc}
              alt={item.name}
              width={80}
              height={80}
              className="h-14 w-14 rounded-md bg-[#e5e7eb] object-cover"
            />
            <div className="space-y-0.5">
              <p className="text-[12px] font-semibold text-[#111827]">
                {item.name}
              </p>
              <p className="text-[11px] font-semibold text-[#111827]">
                {AED(item.price)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
