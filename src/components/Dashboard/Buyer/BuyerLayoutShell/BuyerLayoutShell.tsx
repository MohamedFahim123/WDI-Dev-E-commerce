"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import clsx from "clsx";
import {
  Bell,
  CreditCard,
  Heart,
  LifeBuoy,
  LucideSettings2,
  MapPin,
  Star,
  TicketPercent,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "../BuyerSidebar/BuyerSidebar";
import BuyerSidebarSkeleton from "../BuyerSidebar/BuyerSidebarSkeleton";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";

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

  const lang = useRouteLang();

  const user = useAuthStore((s) => s.user);
  const hydrateFromServer = useAuthStore((s) => s.hydrateFromServer);
  const isHydrating = useAuthStore((s) => s.loading);

  useEffect(() => {
    (async () => {
      await hydrateFromServer();
    })();
  }, [hydrateFromServer]);

  if (isHydrating || !user?.id) return null;
  const navItems: NavLink[] = [
    { href: `/${lang}/buyer/profile`, label: "Profile", icon: User },
    { href: `/${lang}/buyer/addresses`, label: "Addresses", icon: MapPin },
    {
      href: `/${lang}/buyer/payment-methods`,
      label: "Payment Methods",
      icon: CreditCard,
    },
    { href: `/${lang}/buyer/coupons`, label: "Coupons", icon: TicketPercent },
    { href: `/${lang}/buyer/my-wishlist`, label: "Wishlist", icon: Heart },
    {
      href: `/${lang}/buyer/loyalty-program`,
      label: "Loyalty Program",
      icon: Star,
    },
    {
      href: `/${lang}/buyer/notifications`,
      label: "Notifications",
      icon: Bell,
    },
    {
      href: `/${lang}/buyer/notifications-preferences`,
      label: "Notification Settings",
      icon: LucideSettings2,
    },
    {
      href: `/${lang}/buyer/help-support`,
      label: "Help & Support",
      icon: LifeBuoy,
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
        <BuyerSidebar user={user} navItems={navItems} collapsed={collapsed} />
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
          loginType={"buyer"}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <section className="flex-1 px-4 py-6 lg:px-8">{children}</section>
      </div>
    </div>
  );
}
