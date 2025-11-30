export default function TasksQuickActions() {
  const tasks = [
    { title: "Complete product info for 5 items", tone: "red" },
    { title: "Upload missing documents", tone: "red" },
    { title: "Review pending orders", tone: "blue" },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="font-semibold">Tasks & Quick Actions</h4>
        <button className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-3 py-2 text-white text-sm whitespace-nowrap">
          + Add Product
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((t, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-md p-3 ${
              t.tone === "red" ? "bg-rose-50" : "bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  t.tone === "red" ? "bg-rose-500" : "bg-sky-500"
                }`}
              />
              <div className="text-sm truncate">{t.title}</div>
            </div>
            <button className="text-sm font-medium text-slate-600 whitespace-nowrap">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
