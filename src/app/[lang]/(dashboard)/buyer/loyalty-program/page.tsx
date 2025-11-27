import LoyalityProgramFullLayout from "@/src/components/Dashboard/Buyer/LoyaltyProgram/LoyalityProgramFullLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Loyality Program",
};

export default function LoyalityProgramPage() {
  return <LoyalityProgramFullLayout />;
}
