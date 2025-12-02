import CreateProductPage from "@/src/components/Dashboard/Seller/CreateProduct/CreateProductPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Create Product",
  description:
    "Create your own products now and get the best payment through us!",
};

export default function CreateProductDashboardPage() {
  return <CreateProductPage />;
}
