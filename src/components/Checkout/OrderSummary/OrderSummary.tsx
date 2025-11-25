import { Separator } from "@/src/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { AED } from "../Checkoutdata";
import Row from "../Row/Row";
import Image from "next/image";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  vat: number;
  discount: number;
  total: number;
};

function OrderSummary({
  subtotal,
  shipping,
  vat,
  discount,
  total,
}: OrderSummaryProps) {
  return (
    <Card className="self-start rounded-2xl border border-[#f1f1f3] bg-white shadow-sm text-xs">
      <CardHeader className="px-4 pb-3 pt-4">
        <CardTitle className="text-[13px] font-semibold text-[#111827]">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pb-4 pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/products/prod7.webp"
              alt={"Product Image"}
              width={100}
              height={100}
              className="h-12 w-12  rounded-md object-cover bg-gray-300"
            />
            <div className="space-y-0.5">
              <p className="text-[12px] font-semibold text-[#111827]">
                Premium Wireless Headphones
              </p>
              <p className="text-[11px] text-[#6b7280]">Qty: 1</p>
              <p className="text-[11px] font-semibold text-[#111827]">
                AED 39.99
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/assets/products/prod6.webp"
              alt={"Product Image"}
              width={100}
              height={100}
              className="h-12 w-12  rounded-md object-cover bg-gray-300"
            />
            <div className="space-y-0.5">
              <p className="text-[12px] font-semibold text-[#111827]">
                USB-C Charging Cable
              </p>
              <p className="text-[11px] text-[#6b7280]">Qty: 2</p>
              <p className="text-[11px] font-semibold text-[#111827]">
                AED 39.99
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-[#f3f4f6]" />

        <div className="space-y-1.5 text-[11px]">
          <Row label="Subtotal" value={AED(subtotal)} />
          <Row label="Shipping" value={AED(shipping)} />
          <Row label="VAT (15%)" value={AED(vat)} />
          <Row
            label="Discount"
            value={`- ${AED(discount)}`}
            labelClass="text-emerald-600"
            valueClass="text-emerald-600"
          />
        </div>

        <Separator className="bg-[#f3f4f6]" />

        <Row
          label="Total"
          value={AED(total)}
          labelClass="text-[12px] font-semibold text-[#111827]"
          valueClass="text-[14px] font-semibold text-[#7C3BED]"
        />
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
