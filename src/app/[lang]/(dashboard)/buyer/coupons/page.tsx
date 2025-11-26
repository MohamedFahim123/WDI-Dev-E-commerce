import CouponsContainer from "@/src/components/Dashboard/Buyer/Coupons/CouponsContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Coupons",
  description: "Manage your saved payment cards.",
};
export default function CouponsPage() {
  return <CouponsContainer />;
}
