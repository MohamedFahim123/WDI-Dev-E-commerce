"use client";

import { Button } from "@/src/components/ui/button";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
export interface NavLink {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
interface BuyerSidebarProps {
  collapsed?: boolean;
  navItems: NavLink[];
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
  onNavigate?: () => void;
}

export default function BuyerSidebar({
  collapsed,
  onNavigate,
  navItems,
}: BuyerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleItemClick = (href: string) => {
    router.push(href);
    if (onNavigate) onNavigate();
  };

  return (
    <Sidebar
      collapsed={collapsed}
      width="full"
      backgroundColor="#ffffff"
      rootStyles={{
        border: "1px solid #E5E7EB",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col items-center gap-2 py-4">
        <Image
          src="/assets/dashboard/profile.webp"
          alt="Profile avatar"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        {!collapsed && (
          <div className="text-center">
            <p className="text-sm font-semibold text-[#111827]">
              Ahmed Al Mansoori
            </p>
            <p className="text-xs text-gray-500">
              ahmed.almansoori@example.com
            </p>
          </div>
        )}
      </div>

      <Menu
        rootStyles={{
          paddingTop: "4px",
          paddingBottom: "8px",
        }}
        menuItemStyles={{
          button: ({ active }) => ({
            padding: "8px 16px",
            margin: "2px 0px",
            fontSize: "14px",
            fontWeight: 400,
            color: "#111827",
            backgroundColor: active ? "#F4EFFF" : "transparent",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }),
          icon: ({ active }) => ({
            marginRight: "4px",
            fontSize: "16px",
            color: active ? "#111827" : "#4B5563",
          }),
          label: {
            whiteSpace: "nowrap",
          },
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);

          return (
            <MenuItem
              key={item.href}
              active={!!active}
              icon={<Icon className="h-4 w-4" />}
              component={
                <Button
                  className="w-full text-start"
                  type="button"
                  title={item.label}
                  name={item.label}
                  onClick={() => handleItemClick(item.href)}
                />
              }
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
}
