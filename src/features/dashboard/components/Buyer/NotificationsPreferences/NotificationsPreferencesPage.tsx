"use client";
import dynamic from "next/dynamic";
import NotificationsPreferencesSkeleton from "./NotificationsPreferencesSkeleton";

const NotificationsPreferencesSection = dynamic(
  () => import("./NotificationsPreferencesSection"),
  {
    loading: () => <NotificationsPreferencesSkeleton />,
    ssr: false,
  }
);

export default function NotificationsPreferencesPage() {
  return <NotificationsPreferencesSection />;
}
