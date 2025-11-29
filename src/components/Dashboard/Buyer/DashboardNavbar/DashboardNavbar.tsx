"use client";

import Link from "next/link";
import { Home, Menu, Bell, LogOut } from "lucide-react";
import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import { useRef, useState } from "react";
import LangDropDown from "@/src/components/NavCartContent/LangDropDown";

interface DashboardNavbarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onToggleMobileSidebar: () => void;
  loginType: "buyer" | "seller";
}

export default function DashboardNavbar({
  collapsed,
  setCollapsed,
  loginType,
  onToggleMobileSidebar,
}: DashboardNavbarProps) {
  const lang = useRouteLang();
  const { logout } = useAuthStore();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle sidebar"
            className="inline-flex lg:hidden rounded-md cursor-pointer border border-gray-300 bg-white p-1.5 hover:bg-gray-50"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:inline-flex rounded-md cursor-pointer border border-gray-300 bg-white p-1.5 hover:bg-gray-50"
          >
            <Menu size={18} />
          </button>

          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#7C3BED]"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/${lang}/notifications`}
            aria-label="Notifications"
            className="relative flex items-center justify-center"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Link>

          <LangDropDown
            langRef={langRef}
            currentLang={lang}
            setLangOpen={setLangOpen}
            langOpen={langOpen}
            setAuthOpen={() => {}}
            getPathForLang={(l) => `/${l}/${loginType}/profile`}
          />

          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex cursor-pointer hover:text-[#EF4343] transition-all duration-300 items-center gap-1.5 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
