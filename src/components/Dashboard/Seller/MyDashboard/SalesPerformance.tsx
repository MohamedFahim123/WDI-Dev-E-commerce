export default function SalesPerformance() {
  const days = [
    { day: "Mon", value: "AED 12000.00" },
    { day: "Tue", value: "AED 19000.00" },
    { day: "Wed", value: "AED 15000.00" },
    { day: "Thu", value: "AED 22000.00" },
    { day: "Fri", value: "AED 18000.00" },
    { day: "Sat", value: "AED 25000.00" },
    { day: "Sun", value: "AED 21000.00" },
  ];

  const points = [40, 60, 50, 80, 55, 95, 75];
  const width = 700;
  const height = 140;
  const step = width / (points.length - 1);
  const pathD = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${i * step} ${height - (p / 100) * height}`
    )
    .join(" ");

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-base">Sales Performance</h3>
        <button className="text-xs border rounded-full px-3 py-1 text-slate-600 hover:bg-slate-50 whitespace-nowrap">
          Last 7 Days
        </button>
      </div>

      <div className="mt-4">
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-36 sm:h-44 md:h-52"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d={`${pathD} L ${width} ${height} L 0 ${height} Z`}
              fill="url(#grad)"
              stroke="none"
            />
            <path
              d={pathD}
              fill="none"
              stroke="#7C3AED"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((p, i) => {
              const y = height - (p / 100) * height;
              return (
                <circle
                  key={i}
                  cx={i * step}
                  cy={y}
                  r={3.5}
                  fill="#fff"
                  stroke="#7C3AED"
                  strokeWidth={2}
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {days.map((d, i) => (
            <div
              key={i}
              className="flex-shrink-0 min-w-[80px] xs:min-w-[90px] text-center"
            >
              <div className="inline-block px-2 py-1 bg-slate-100 text-[13px] rounded-full text-slate-700 whitespace-nowrap">
                {d.value}
              </div>
              <div className="mt-2 text-xs text-slate-500">{d.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
