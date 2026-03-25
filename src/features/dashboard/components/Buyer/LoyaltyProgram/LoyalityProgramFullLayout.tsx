"use client";
import dynamic from "next/dynamic";
import LoyaltyProgramSkeleton from "./LoyaltyProgramSkeleton";

const LoyaltyProgramSection = dynamic(() => import("./LoyaltyProgramSection"), {
  loading: () => <LoyaltyProgramSkeleton />,
  ssr: false,
});
export default function LoyalityProgramFullLayout() {
  return <LoyaltyProgramSection />;
}
