import React from "react";
type OrderSummaryCardProps = {
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
};
export default function OrderSummaryCard({
  subtotal,
  shipping,
  vat,
  total,
}: OrderSummaryCardProps) {
  return (
    <section
      aria-label="Order summary"
      className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-zinc-900">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-600">Subtotal</span>
          <span className="font-medium text-zinc-900">
            AED {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-600">Shipping</span>
          <span className="font-medium text-zinc-900">
            {shipping > 0 ? `AED ${shipping.toFixed(2)}` : "Free"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-600">VAT (15%)</span>
          <span className="font-medium text-zinc-900">
            AED {vat.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-zinc-900">Total</span>
          <span className="text-xl font-bold text-[#7C3BED]">
            AED {total.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-500">
          VAT included in total price
        </p>
      </div>
    </section>
  );
}
