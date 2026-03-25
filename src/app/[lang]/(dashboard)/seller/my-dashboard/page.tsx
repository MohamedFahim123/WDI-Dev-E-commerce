import SellerDashboardPage from "@/src/features/dashboard/components/Seller/MyDashboard/SellerDashboardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - My Dashboard",
  description: "Explore Your Store Stats now!",
};

export default function MyDashbaordSellerPage() {
  return <SellerDashboardPage />;
}

