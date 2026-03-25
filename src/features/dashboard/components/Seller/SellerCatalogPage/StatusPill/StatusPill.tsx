import clsx from "clsx";

export type SKUStatus = "active" | "pending" | "out_of_stock" | undefined;

export default function StatusPill({ status }: { status?: SKUStatus }) {
  if (!status) return null;
  const base =
    "inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full font-medium";
  if (status === "active")
    return (
      <span className={clsx(base, "bg-[#EEF8F2] text-[#059669]")}>active</span>
    );
  if (status === "pending")
    return (
      <span className={clsx(base, "bg-[#FEF7E6] text-[#B45309]")}>pending</span>
    );
  return (
    <span className={clsx(base, "bg-[#FEECF0] text-[#DC2626]")}>
      out_of_stock
    </span>
  );
}
