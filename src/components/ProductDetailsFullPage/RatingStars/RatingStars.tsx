"use client";

import { Star } from "lucide-react";

type Props = {
  value: number;
  count?: number;
};

export function RatingStars({ value, count }: Props) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const index = i + 1;
          const filled = index <= Math.floor(rounded);
          const half = !filled && index - 0.5 === rounded;

          return (
            <Star
              key={index}
              className={`h-4 w-4 ${
                filled || half
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300"
              }`}
            />
          );
        })}
      </div>
      <span className="font-medium text-zinc-900">{value.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="text-xs text-zinc-500">({count} reviews)</span>
      )}
    </div>
  );
}
