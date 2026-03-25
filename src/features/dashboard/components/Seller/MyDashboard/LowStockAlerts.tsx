export default function LowStockAlerts() {
  const alerts = [
    { title: "Laptop Stand", left: 3, min: 10 },
    { title: "Phone Case", left: 5, min: 20 },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Low Stock Alerts</h4>
        <div className="text-amber-600 text-sm">⚠️</div>
      </div>

      <div className="mt-3 space-y-3">
        {alerts.map((a, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-md border border-amber-100 bg-amber-50 p-3 gap-3"
          >
            <div>
              <div className="font-medium text-sm">{a.title}</div>
              <div className="text-xs text-amber-600">
                Only {a.left} left (min: {a.min})
              </div>
            </div>

            <div className="self-stretch sm:self-auto flex items-center">
              <button className="text-xs border rounded-full px-3 py-1 bg-white shadow-sm whitespace-nowrap">
                Re-stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
