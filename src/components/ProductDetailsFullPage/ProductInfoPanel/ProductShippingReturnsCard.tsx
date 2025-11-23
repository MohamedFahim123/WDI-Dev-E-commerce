import {
  Truck,
  MapPin,
  DollarSign,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function ProductShippingReturnsCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm text-xs text-zinc-600">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-50 text-violet-500">
          <Truck className="h-4 w-4" />
        </div>
        <span>Shipping &amp; Returns</span>
      </div>

      <hr className="border-zinc-100" />

      <ul className="space-y-3 text-xs">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-zinc-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-900">
              Estimated Delivery
            </p>
            <p className="text-[11px] text-zinc-500">2–3 business days</p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <DollarSign className="mt-0.5 h-4 w-4 text-zinc-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-900">Shipping Fee</p>
            <p className="text-[11px] text-zinc-500">
              AED 5.99 · Free shipping on orders over AED 50
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <RotateCcw className="mt-0.5 h-4 w-4 text-zinc-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-900">
              14-Day Returns
            </p>
            <p className="text-[11px] text-zinc-500">
              Return within 14 days for a full refund
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-zinc-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-900">
              Warranty Included
            </p>
            <p className="text-[11px] text-zinc-500">
              2-year manufacturer warranty
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
