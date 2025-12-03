import { Download, LifeBuoy } from "lucide-react";

type Summary = {
  subtotal: number;
  shipping: number;
  vat: number;
  discount: number;
  total: number;
  currency: string;
  payment: string;
};

export default function OrderSummaryDashboard({
  summary,
}: {
  summary: Summary;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#111827]">
            Order Summary
          </h2>
          <p className="text-sm text-gray-500 mt-1">Summary & payment</p>
        </div>
        <div className="text-sm text-right text-gray-500">
          <div>{summary.payment}</div>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Subtotal</dt>
          <dd className="font-medium">
            {summary.currency} {summary.subtotal.toFixed(2)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Shipping</dt>
          <dd>
            {summary.shipping === 0
              ? "Free"
              : `${summary.currency} ${summary.shipping.toFixed(2)}`}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">VAT</dt>
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

        <hr className="my-3" />

        <div className="flex justify-between items-center text-base font-semibold text-[#7C3BED]">
          <dt>Total</dt>
          <dd>
            {summary.currency} {summary.total.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 space-y-2">
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 bg-white text-sm font-medium hover:bg-gray-50">
          <Download size={14} /> Download Invoice
        </button>
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 bg-white text-sm font-medium hover:bg-gray-50">
          <LifeBuoy size={14} /> Contact Support
        </button>
      </div>
    </div>
  );
}
