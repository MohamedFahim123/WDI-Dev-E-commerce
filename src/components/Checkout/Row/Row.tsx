import { cn } from "@/src/lib/utils";
import React from "react";

function Row({
  label,
  value,
  labelClass,
  valueClass,
}: {
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("text-muted-foreground", labelClass)}>{label}</span>
      <span className={cn("font-medium", valueClass)}>{value}</span>
    </div>
  );
}

export default React.memo(Row);
