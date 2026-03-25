import { Search, Sliders } from "lucide-react";
import Link from "next/link";

type Row = {
  id: string;
  date: string;
  customer: string;
  items: number;
  total: string;
  pay: string;
  status: string;
};

const rows: Row[] = [
  {
    id: "#41389",
    date: "08 Nov 25",
    customer: "Ahmed M.",
    items: 2,
    total: "239 AED",
    pay: "COD",
    status: "NEW",
  },
  {
    id: "#41388",
    date: "07 Nov 25",
    customer: "Sara M.",
    items: 1,
    total: "159 AED",
    pay: "Card",
    status: "PACKED",
  },
  {
    id: "#41378",
    date: "07 Nov 25",
    customer: "Laila K.",
    items: 3,
    total: "390 AED",
    pay: "Card",
    status: "SHIPPED",
  },
];

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold";
  if (status === "NEW")
    return <span className={`${base} bg-purple-600 text-white`}>NEW</span>;
  if (status === "PACKED")
    return <span className={`${base} bg-gray-200 text-gray-700`}>PACKED</span>;
  if (status === "SHIPPED")
    return <span className={`${base} bg-green-600 text-white`}>SHIPPED</span>;
  if (status === "DELIVERED")
    return <span className={`${base} bg-blue-600 text-white`}>DELIVERED</span>;
  if (status === "RETURNED")
    return <span className={`${base} bg-red-500 text-white`}>RETURNED</span>;
  return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
}

export default function OrdersTable({
  lang,
  loginType,
}: {
  lang: string;
  loginType: "seller" | "buyer";
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <label htmlFor="order-search" className="sr-only">
              Search Orders
            </label>

            <div className="relative min-w-0">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>

              <input
                id="order-search"
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-full bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-100 min-w-0"
                placeholder="Order ID / Customer / SKU"
                aria-label="Search orders"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full bg-white text-sm shadow-sm hover:shadow transition"
            >
              <Sliders className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">All Filters</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden sm:block overflow-x-hidden">
        <table className="w-full table-auto">
          <thead className="border-y">
            <tr className="text-xs text-gray-500 uppercase">
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Pay</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id} className="bg-white">
                <td>
                  <Link className="px-6 py-5 text-sm font-medium text-gray-800 whitespace-nowrap hover:underline transition-all duration-200 hover:text-[#7C3BED]" href={`/${lang}/${loginType}/order-management/${r.id.split("#").join("")}`}>
                    {r.id}
                  </Link>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                  {r.date}
                </td>
                <td className="px-6 py-5 text-sm text-gray-700">
                  {r.customer}
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">{r.items}</td>
                <td className="px-6 py-5 text-sm font-semibold">{r.total}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{r.pay}</td>
                <td className="px-6 py-5">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3 p-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="border border-gray-100 rounded-lg p-3 bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-800">
                    {r.id}
                  </div>
                  <div className="text-xs text-gray-500">{r.date}</div>
                </div>

                <div className="mt-2 text-sm text-gray-700">{r.customer}</div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div>
                    Items:{" "}
                    <span className="font-medium text-gray-800">{r.items}</span>
                  </div>
                  <div>
                    Total: <span className="font-semibold">{r.total}</span>
                  </div>
                  <div>
                    Pay: <span className="text-gray-700">{r.pay}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 self-start">
                <StatusPill status={r.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
