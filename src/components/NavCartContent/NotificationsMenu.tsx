"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useRef, useState } from "react";

import useOutsideClose from "./useOutsideClose";
import { useNotificationsData } from "@/src/hooks/useNotificationsMenuData";

interface Props {
  currentLang: string;
  loginType?: "buyer" | "seller";
}

export default function NotificationsMenu({ currentLang, loginType }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClose(ref, () => setOpen(false), true);

  const { top3, unreadCount, loading, markReadOne, markAllRead } =
    useNotificationsData(currentLang, { limit: 20, staleMs: 30_000 });

  const viewMoreHref = `/${currentLang}/${
    loginType ? `${loginType}/notifications` : "notifications"
  }`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        title="Show Notifications"
        aria-label="Notifications"
        aria-expanded={open}
        className="relative cursor-pointer w-5 sm:w-6 flex items-center justify-center"
      >
        <Bell size={21} className="sm:h-5 sm:w-5" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[8px] sm:text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            top-full mt-2
            left-1/2 -translate-x-1/2
            sm:left-auto sm:right-0 sm:translate-x-0 
            w-[60vw] sm:w-80
            bg-white shadow-lg border border-[#ddd] rounded z-50
            py-1"
          style={{
            paddingTop: `max(6px, env(safe-area-inset-top))`,
            maxHeight: "calc(100vh - 120px)",
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          <div className="px-3 pb-1 border-b border-[#eee] flex items-center justify-between gap-2">
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-800">
                Notifications
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500">
                {loading ? "Loading..." : `${unreadCount} unread`}
              </div>
            </div>

            <button
              type="button"
              onClick={markAllRead}
              className="text-[11px] sm:text-xs font-semibold text-[#7C3BED] hover:underline disabled:opacity-60"
              disabled={loading}
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-[calc(100vh-120px)] overflow-auto">
            {top3.map((n) => (
              <Link
                key={n.id}
                href={n.ctaHref ?? `/${currentLang}/notifications`}
                onClick={() => {
                  // mark as read then close
                  markReadOne(n.id);
                  setOpen(false);
                }}
                className="block px-3 py-2 text-sm hover:bg-gray-50 border-b last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <div className="text-gray-800 font-medium text-sm line-clamp-2">
                    {n.title}
                  </div>
                  {n.timeLabel && (
                    <div className="text-xs text-gray-400 ml-2">
                      {n.timeLabel}
                    </div>
                  )}
                </div>

                {n.ctaLabel && (
                  <div className="text-[12px] text-gray-500 mt-1 line-clamp-2">
                    {n.ctaLabel}
                  </div>
                )}
              </Link>
            ))}

            {!loading && top3.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>

          <div className="pt-1">
            <Link
              href={viewMoreHref}
              onClick={() => setOpen(false)}
              className="block text-center text-sm px-3 py-2 hover:bg-gray-50 text-[#7C3BED] font-medium"
            >
              View more
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
