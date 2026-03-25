import clsx from "clsx";
import StatusPill, { type SKUStatus } from "../StatusPill/StatusPill";

export type SKU = {
  id: string;
  title: string;
  subtitle?: string;
  partnerSku?: string;
  price?: string;
  fees?: string;
  stock?: number;
  status?: SKUStatus;
};

export default function SKUCardRow({ s }: { s: SKU }) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-[#111827]">{s.id}</div>
          <div className="text-xs text-[#6B7280] mt-1">{s.title}</div>
        </div>

        <div className="text-sm text-[#111827]">{s.price}</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
        <div>
          <div className="text-[11px]">Partner SKU</div>
          <div className="text-sm text-[#111827]">{s.partnerSku}</div>
        </div>

        <div>
          <div className="text-[11px]">Estimated Fees</div>
          <div className="text-sm text-[#111827]">{s.fees}</div>
        </div>

        <div>
          <div className="text-[11px]">Stock</div>
          <div
            className={clsx(
              "text-sm font-medium",
              s.stock && s.stock > 0 ? "text-[#111827]" : "text-[#EF4444]"
            )}
          >
            {s.stock}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[11px]">Status</div>
          <div>
            <StatusPill status={s.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
