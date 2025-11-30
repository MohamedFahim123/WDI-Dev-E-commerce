type OrderStatus = { label: string; value: number; bg: string; text: string };

export default function OrdersSnapshot() {
  const statuses: OrderStatus[] = [
    { label: "Pending", value: 12, bg: "bg-amber-50", text: "text-amber-700" },
    { label: "In Progress", value: 18, bg: "bg-sky-50", text: "text-sky-700" },
    {
      label: "Shipped",
      value: 32,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    { label: "Returned", value: 2, bg: "bg-rose-50", text: "text-rose-700" },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h4 className="font-semibold mb-4">Orders Snapshot</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statuses.map((s, i) => (
          <div
            key={i}
            className={`rounded-lg border ${s.bg} p-4 flex flex-col items-center justify-center`}
          >
            <div className={`text-2xl sm:text-3xl font-bold ${s.text}`}>
              {s.value}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
