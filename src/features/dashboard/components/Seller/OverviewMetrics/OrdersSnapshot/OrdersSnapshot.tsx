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

      <div className="hidden sm:block">
        <div className="overflow-hidden rounded">
          <table className="min-w-full table-fixed">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[28%]" />
            </colgroup>

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
                  <td className="px-4 py-5 text-sm font-medium text-gray-800 truncate">
                    {r.id}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 truncate">
                    {r.date}
                  </td>
                  <td className="px-4 py-5 text-sm font-semibold truncate">
                    {r.amount}
                  </td>
                  <td className="px-4 py-5">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 truncate">
                    {r.account}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sm:hidden space-y-3">
        {rows.map((r) => (
          <article
            key={r.id}
            className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {r.id}
                  </div>
                  <div className="text-xs text-gray-500">{r.date}</div>
                </div>

                <div className="mt-2 text-sm text-gray-700">{r.account}</div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div>
                    Amount:{" "}
                    <span className="font-medium text-gray-800">
                      {r.amount}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Pay: </span>
                    <span className="text-gray-700">{r.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 self-start">
                <StatusPill status={r.status} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
