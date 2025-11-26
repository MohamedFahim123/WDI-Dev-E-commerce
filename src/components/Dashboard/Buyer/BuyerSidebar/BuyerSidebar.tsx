"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MapPin,
  CreditCard,
  TicketPercent,
  Heart,
  Star,
  Bell,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useRouteLang } from "@/src/hooks/useLang";

type SidebarProps = {
  onNavigate?: () => void;
};

export default function BuyerSidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const lang = useRouteLang();
  const navItems = [
    { href: `/${lang}/buyer/profile`, label: "Profile", icon: User },
    { href: `/${lang}/buyer/addresses`, label: "Addresses", icon: MapPin },
    {
      href: `/${lang}/buyer/payment-methods`,
      label: "Payment Methods",
      icon: CreditCard,
    },
    { href: `/${lang}/buyer/coupons`, label: "Coupons", icon: TicketPercent },
    { href: `/${lang}/buyer/my-wishlist`, label: "My Wishlist", icon: Heart },
    { href: `/${lang}/buyer/loyalty`, label: "Loyalty Program", icon: Star },
    { href: `/${lang}/notifications`, label: "Notifications", icon: Bell },
    { href: `/${lang}/buyer/support`, label: "Help & Support", icon: LifeBuoy },
  ];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center gap-2 pb-4">
        <Image
          src="/assets/dashboard/profile.webp"
          alt="Profile avatar"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full bg-[#E5E7EB] object-cover"
        />
        <div className="text-center">
          <p className="text-sm font-semibold text-[#111827]">
            Ahmed Al Mansoori
          </p>
          <p className="text-xs text-[#6B7280]">ahmed.almansoori@example.com</p>
          <p className="mt-1 text-[11px] text-[#9CA3AF]">
            Member since January 2024
          </p>
        </div>
      </div>

      <div className="my-3 h-px w-full bg-[#E5E7EB]" />

      <nav aria-label="Account sections" className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[#F3E8FF] text-[#7C3BED]"
                  : "text-[#374151] hover:bg-[#F3F4F6]"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={clsx(
                  "h-4 w-4",
                  active ? "text-[#7C3BED]" : "text-[#6B7280]"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="my-3 h-px w-full bg-[#E5E7EB]" />

      <button
        type="button"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2]"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}
