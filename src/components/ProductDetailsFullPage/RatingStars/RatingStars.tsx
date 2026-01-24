"use client";

import { Star } from "lucide-react";

type Props = {
  value?: number | null;
  count?: number | null;
};

export function RatingStars({ value, count }: Props) {
  const safeValue = Number.isFinite(value as number) ? (value as number) : 0;

  const full = Math.floor(safeValue);
  const hasHalf = safeValue - full >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && hasHalf);

          return (
            <Star
              key={i}
              className={`h-4 w-4 ${
                filled ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"
              }`}
            />
          );
        })}
      </div>

      <span className="font-medium text-zinc-900">{safeValue.toFixed(1)}</span>

      {typeof count === "number" && (
        <span className="text-xs text-zinc-500">({count} reviews)</span>
      )}
    </div>
  );
}
