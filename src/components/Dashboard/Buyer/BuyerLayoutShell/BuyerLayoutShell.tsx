"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { useAuthStore } from "@/src/stores/authStore";
import { useRouteLang } from "@/src/hooks/useLang";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import BuyerSidebarSkeleton from "../BuyerSidebar/BuyerSidebarSkeleton";

const BuyerSidebar = dynamic(() => import("../BuyerSidebar/BuyerSidebar"), {
  ssr: false,
  loading: () => <BuyerSidebarSkeleton />,
});

interface BuyerLayoutShellProps {
  children: ReactNode;
}

export function BuyerLayoutShell({ children }: BuyerLayoutShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  const router = useRouter();
  const lang = useRouteLang();

  const user = useAuthStore((s) => s.user);
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    (async () => {
      await hydrateFromStorage();
      setIsHydrating(false);
    })();
  }, [hydrateFromStorage]);

  useEffect(() => {
    if (!isHydrating && !user?.id) {
      router.replace(`/${lang}/auth/login`);
    }
  }, [isHydrating, user, router, lang]);

  if (isHydrating || !user?.id) return null;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div
        className={clsx(
          "hidden lg:block transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <BuyerSidebar collapsed={collapsed} />
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-200",
          mobileSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setMobileSidebarOpen(false)}
        />

        <div
          className={clsx(
            "absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <BuyerSidebar
            collapsed={false}
            onNavigate={() => setMobileSidebarOpen(false)}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <section className="flex-1 px-4 py-6 lg:px-8">{children}</section>
      </div>
    </div>
  );
}
