"use client";

import { ReactNode, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import BuyerSidebarSkeleton from "../BuyerSidebar/BuyerSidebarSkeleton";

const BuyerSidebar = dynamic(() => import("../BuyerSidebar/BuyerSidebar"), {
  loading: () => <BuyerSidebarSkeleton />,
  ssr: false,
});

interface BuyerLayoutShellProps {
  children: ReactNode;
}

export function BuyerLayoutShell({ children }: BuyerLayoutShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] translate-y-[110px]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between lg:mb-6">
          <h1 className="text-xl font-semibold text-[#000000]">My Account</h1>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white p-2 text-[#4B5563] hover:bg-[#F3F4F6] lg:hidden"
            aria-label="Open account menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-6">
          <aside className="hidden w-full max-w-xs shrink-0 lg:block">
            <BuyerSidebar />
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-[60] lg:hidden transition-opacity duration-200",
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close account menu"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-black/30"
        />

        <div
          className={clsx(
            "absolute inset-x-0 top-0 h-full bg-[#F9FAFB] transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-y-0" : "-translate-y-full"
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col px-4 pt-4 pb-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">
                My Account
              </h2>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white p-2 text-[#4B5563] hover:bg-[#F3F4F6]"
                aria-label="Close account menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-4">
              <BuyerSidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
