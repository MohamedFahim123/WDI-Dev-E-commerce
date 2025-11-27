"use client"
import dynamic from "next/dynamic";
import HelpSupportSkeleton from "./HelpSupportSkeleton";

const HelpSupportSection = dynamic(() => import("./HelpSupportSection"), {
  loading: () => <HelpSupportSkeleton />,
  ssr: false,
});

export default function HelpSupportLayout() {
  return <HelpSupportSection />;
}
