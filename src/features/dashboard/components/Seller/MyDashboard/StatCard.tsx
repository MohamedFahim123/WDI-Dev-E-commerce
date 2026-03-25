export type Stat = {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "default" | "warning";
};

export default function StatCard({ stat }: { stat: Stat }) {
  const warning = stat.accent === "warning";
  return (
    <div
      className={`rounded-xl border p-3 sm:p-4 bg-white shadow-sm flex flex-col justify-between min-h-[84px] sm:min-h-[96px] ${
        warning ? "border-amber-200" : "border-[#EDEFF1]"
      }`}
    >
      <div className="text-xs sm:text-sm text-slate-500">{stat.title}</div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-lg sm:text-2xl font-bold leading-none">
          {stat.value}
        </div>
        <div className="text-right">
          {stat.subtitle ? (
            <div
              className={`text-xs sm:text-sm ${
                warning ? "text-amber-600" : "text-slate-500"
              }`}
            >
              {stat.subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
