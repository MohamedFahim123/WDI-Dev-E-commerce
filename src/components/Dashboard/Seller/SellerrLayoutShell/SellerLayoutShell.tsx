"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import clsx from "clsx";
import {
  Bell,
  ChartBar,
  FilePlus,
  LayoutDashboardIcon,
  LucideSettings2,
  Package,
  Receipt ,
  Settings,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "../../Buyer/BuyerSidebar/BuyerSidebar";
import BuyerSidebarSkeleton from "../../Buyer/BuyerSidebar/BuyerSidebarSkeleton";
import DashboardNavbar from "../../Buyer/DashboardNavbar/DashboardNavbar";

const BuyerSidebar = dynamic(
  () => import("../../Buyer/BuyerSidebar/BuyerSidebar"),
  {
    ssr: false,
    loading: () => <BuyerSidebarSkeleton />,
  }
);

interface SellerLayoutShellProps {
  children: ReactNode;
}

export function SellerLayoutShell({ children }: SellerLayoutShellProps) {
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

  const navItems: NavLink[] = [
    { href: `/${lang}/seller/profile`, label: "Profile", icon: User },
    {
      href: `/${lang}/seller/my-dashboard`,
      label: "My Dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      href: `/${lang}/seller/overview-metrics`,
      label: "Overview Metrics",
      icon: ChartBar,
    },
    {
      href: `/${lang}/seller/order-management`,
      label: "Order Managment",
      icon: Receipt ,
    },
    { href: `/${lang}/seller/catalog`, label: "Catalog", icon: Package },
    {
      href: `/${lang}/seller/add-product`,
      label: "Add Product",
      icon: FilePlus,
    },
    {
      href: `/${lang}/seller/notifications`,
      label: "Notifications",
      icon: Bell,
    },
    {
      href: `/${lang}/seller/notifications-preferences`,
      label: "Notification Settings",
      icon: LucideSettings2,
    },
    {
      href: `/${lang}/seller/store-settings`,
      label: "Store Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <div
        className={clsx(
          "hidden lg:block transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          "lg:sticky lg:top-0 lg:self-start",
          "lg:overflow-auto"
        )}
      >
        <BuyerSidebar navItems={navItems} collapsed={collapsed} />
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
            navItems={navItems}
            collapsed={false}
            onNavigate={() => setMobileSidebarOpen(false)}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          loginType={"seller"}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <section className="flex-1 px-4 py-6 lg:px-8">{children}</section>
      </div>
    </div>
  );
}
