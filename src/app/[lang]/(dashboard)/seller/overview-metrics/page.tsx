import OverviewMetrics from "@/src/components/Dashboard/Seller/OverviewMetrics/OverviewMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Overview Metrics ( Payouts )",
};
export default function PayoutPageDashobard() {
  return <OverviewMetrics />;
}
