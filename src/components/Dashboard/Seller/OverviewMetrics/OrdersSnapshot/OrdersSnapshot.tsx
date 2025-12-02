import { FunnelIcon, Search } from "lucide-react";

const rows = [
  {
    id: "#PO-2212",
    date: "08 Nov 25",
    amount: "14,800 AED",
    status: "Processed",
    account: "**** 8792",
  },
  {
    id: "#PO-2206",
    date: "07 Nov 25",
    amount: "12,450 AED",
    status: "Processed",
    account: "**** 8792",
  },
  {
    id: "#PO-2201",
    date: "07 Nov 25",
    amount: "2,900 AED",
    status: "Failed",
    account: "**** 8792",
  },
];

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "Processed")
    return <span className={`${base} bg-green-600 text-white`}>Processed</span>;
  if (status === "Failed")
    return <span className={`${base} bg-red-500 text-white`}>Failed</span>;
  return <span className={`${base} bg-gray-200 text-gray-800`}>{status}</span>;
}

export default function OrdersSnapshot() {
  return (
    <section className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Payouts</h3>
          <p className="text-sm text-gray-500">Recent payout transactions</p>
        </div>

        {/* Search + Filter row — responsive */}
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-3">
            <label htmlFor="payout-search" className="sr-only">
              Search Payout ID
            </label>
            <div className="flex-1 min-w-0 relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input
                id="payout-search"
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-200"
                placeholder="Search Payout ID"
                aria-label="Search Payout ID"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full bg-white text-sm shadow-sm hover:shadow transition"
              aria-label="All Filters"
            >
              <FunnelIcon className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">All Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-xs text-gray-500 uppercase">
              <th className="text-left px-4 py-3">Payout ID</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Bank Account</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id} className="bg-white">
                <td className="px-4 py-5 text-sm font-medium text-gray-800">
                  {r.id}
                </td>
                <td className="px-4 py-5 text-sm text-gray-600">{r.date}</td>
                <td className="px-4 py-5 text-sm font-semibold">{r.amount}</td>
                <td className="px-4 py-5">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-4 py-5 text-sm text-gray-600">{r.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
