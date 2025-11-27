"use client";

import { useState } from "react";
import { Bell, Mail, Globe2 } from "lucide-react";
import clsx from "clsx";

type ToggleRowProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={clsx(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/60 focus-visible:ring-offset-1",
        checked ? "bg-[#8b5cf6]" : "bg-gray-200"
      )}
    >
      <span
        className={clsx(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

function ToggleRow({ label, description, enabled, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <ToggleSwitch checked={enabled} onChange={onToggle} />
    </div>
  );
}

export default function NotificationsPreferencesSection() {
  const [pushSettings, setPushSettings] = useState({
    orderUpdates: true,
    promotions: true,
    priceDrops: false,
    backInStock: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmations: true,
    newsletter: false,
    shoppingTips: false,
  });

  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [currency, setCurrency] = useState("AED");

  return (
    <section className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">
        Notifications &amp; Preferences
      </h1>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <header className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f3ff]">
            <Bell className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Push Notifications
          </h2>
        </header>

        <div className="space-y-4 pt-1">
          <ToggleRow
            label="Order Updates"
            description="Notifications about your order status"
            enabled={pushSettings.orderUpdates}
            onToggle={() =>
              setPushSettings((p) => ({
                ...p,
                orderUpdates: !p.orderUpdates,
              }))
            }
          />
          <ToggleRow
            label="Promotions & Offers"
            description="Special deals and exclusive offers"
            enabled={pushSettings.promotions}
            onToggle={() =>
              setPushSettings((p) => ({
                ...p,
                promotions: !p.promotions,
              }))
            }
          />
          <ToggleRow
            label="Price Drops"
            description="Alerts when wishlist items go on sale"
            enabled={pushSettings.priceDrops}
            onToggle={() =>
              setPushSettings((p) => ({
                ...p,
                priceDrops: !p.priceDrops,
              }))
            }
          />
          <ToggleRow
            label="Back in Stock"
            description="Notify when out-of-stock items are available"
            enabled={pushSettings.backInStock}
            onToggle={() =>
              setPushSettings((p) => ({
                ...p,
                backInStock: !p.backInStock,
              }))
            }
          />
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <header className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f3ff]">
            <Mail className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Email Preferences
          </h2>
        </header>

        <div className="space-y-4 pt-1">
          <ToggleRow
            label="Order Confirmations"
            description="Email receipts and tracking info"
            enabled={emailSettings.orderConfirmations}
            onToggle={() =>
              setEmailSettings((p) => ({
                ...p,
                orderConfirmations: !p.orderConfirmations,
              }))
            }
          />
          <ToggleRow
            label="Newsletter"
            description="Weekly deals and new arrivals"
            enabled={emailSettings.newsletter}
            onToggle={() =>
              setEmailSettings((p) => ({
                ...p,
                newsletter: !p.newsletter,
              }))
            }
          />
          <ToggleRow
            label="Shopping Tips"
            description="Helpful guides and product recommendations"
            enabled={emailSettings.shoppingTips}
            onToggle={() =>
              setEmailSettings((p) => ({
                ...p,
                shoppingTips: !p.shoppingTips,
              }))
            }
          />
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <header className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f3ff]">
            <Globe2 className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Language &amp; Region
          </h2>
        </header>

        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <label
              htmlFor="preferred-language"
              className="text-xs font-medium text-gray-700"
            >
              Preferred Language
            </label>
            <select
              id="preferred-language"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="block w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm text-gray-900 focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40"
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="currency"
              className="text-xs font-medium text-gray-700"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="block w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm text-gray-900 focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40"
            >
              <option value="AED">AED د.إ</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </div>
        </div>
      </article>
    </section>
  );
}
