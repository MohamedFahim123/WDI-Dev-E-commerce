export default function TopSellingProducts() {
  const items = [
    { name: "Premium Headphones", sold: 156, sales: "AED 78000.00" },
    { name: "Wireless Mouse", sold: 234, sales: "AED 46800.00" },
    { name: "USB-C Cable", sold: 312, sales: "AED 31200.00" },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h4 className="font-semibold mb-4">Top Selling Products</h4>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <div>
              <div className="font-medium text-sm sm:text-base">{it.name}</div>
              <div className="text-xs text-slate-400">{it.sold} sold</div>
            </div>
            <div className="font-semibold text-sm sm:text-base">{it.sales}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
