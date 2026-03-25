"use client";

// import LangDropDown from "@/src/components/NavCartContent/LangDropDown";
import NotificationsMenu from "@/src/components/NavCartContent/NotificationsMenu";
import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import { Home, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

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
  const logout = useAuthStore((s) => s.logout);

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
          <NotificationsMenu loginType={loginType} currentLang={lang} />
          {/* 
          <LangDropDown
            langRef={langRef}
            currentLang={lang}
            setLangOpen={setLangOpen}
            langOpen={langOpen}
            setAuthOpen={() => {}}
            getPathForLang={(l) => `/${l}/${loginType}/profile`}
          /> */}

          <button
            type="button"
            onClick={async () => await logout()}
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
