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

export default function CatalogTable({ items }: { items: SKU[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="text-xs text-[#6B7280]">
            <th className="py-3 px-4 w-1/4">SKU Details</th>
            <th className="py-3 px-4 w-1/6">Partner/Catalog SKU</th>
            <th className="py-3 px-4 w-1/6">Price</th>
            <th className="py-3 px-4 w-1/6">Estimated Fees</th>
            <th className="py-3 px-4 w-1/12">Stock</th>
            <th className="py-3 px-4 w-1/6">Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((s, idx) => (
            <tr
              key={s.id}
              className={clsx(
                "border-t last:border-b",
                idx % 2 === 0 ? "bg-white" : "bg-[transparent]"
              )}
            >
              <td className="py-4 px-4 align-top break-words">
                <div className="text-sm font-semibold text-[#111827] truncate">
                  {s.id}
                </div>
                <div className="text-xs text-[#6B7280] mt-1 truncate">
                  {s.title}
                </div>
              </td>

              <td className="py-4 px-4 align-top break-words">
                <div className="text-sm text-[#111827] truncate">
                  {s.partnerSku}
                </div>
              </td>

              <td className="py-4 px-4 align-top break-words">
                <div className="text-sm text-[#111827] truncate">{s.price}</div>
              </td>

              <td className="py-4 px-4 align-top break-words">
                <div className="text-sm text-[#111827] truncate">{s.fees}</div>
              </td>

              <td className="py-4 px-4 align-top break-words">
                <div
                  className={clsx(
                    "text-sm font-medium",
                    s.stock && s.stock > 0 ? "text-[#111827]" : "text-[#EF4444]"
                  )}
                >
                  {s.stock}
                </div>
              </td>

              <td className="py-4 px-4 align-top break-words">
                <StatusPill status={s.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
