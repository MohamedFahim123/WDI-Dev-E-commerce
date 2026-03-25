"use client";

import { Search } from "lucide-react";

interface NotificationsSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotificationsSearchInput({
  value,
  onChange,
}: NotificationsSearchInputProps) {
  return (
    <div className="w-full max-w-xs">
      <label htmlFor="notifications-search" className="sr-only">
        Search notifications
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <Search
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </span>
        <input
          id="notifications-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="h-9 w-full rounded-full bg-[#e5e5ea] pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none border border-transparent focus:border-[#d0d0d5]"
        />
      </div>
    </div>
  );
}
