"use client";

import { Star } from "lucide-react";

type Props = {
  value?: number;
  count?: number;
};

export function RatingStars({ value = 0, count }: Props) {
  const safe = Number.isFinite(value) ? value : 0;
  const rounded = Math.round(safe);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rounded ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"
            }`}
          />
        ))}
      </div>

      <span className="font-medium text-zinc-900">{safe.toFixed(1)}</span>

      {typeof count === "number" && (
        <span className="text-xs text-zinc-500">({count} reviews)</span>
      )}
    </div>
  );
}
