import OrdersManagement from "@/src/components/Dashboard/Seller/OrdersManagement/OrdersManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Order Management",
};
export default function OrderManagmentPage() {
  return <OrdersManagement />;
}
