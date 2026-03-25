
import clsx from "clsx";

export default function StepperHeader({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const percent = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full bg-[#7C3BED] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        {[1, 2, 3, 4].map((i) => {
          const active = i <= step;
          return (
            <div
              key={i}
              className="flex flex-col items-center text-center w-1/4"
            >
              <div
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2",
                  active
                    ? "bg-[#7C3BED] border-[#7C3BED] text-white"
                    : "bg-white border-gray-200 text-gray-600"
                )}
              >
                {active ? (
                  <span className="text-sm font-semibold">✓</span>
                ) : (
                  <span className="text-sm font-medium">{i}</span>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {i === 1 && "Category"}
                {i === 2 && "Brand"}
                {i === 3 && "PSKU"}
                {i === 4 && "Details"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
