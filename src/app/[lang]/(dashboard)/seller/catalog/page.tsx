import SellerCatalogPage from "@/src/features/dashboard/components/Seller/SellerCatalogPage/SellerCatalogPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "WDI - Products Catalog",
  description: "Explore Your Products Catalog here!",
};
export default function ProductsCatalog() {
  return <SellerCatalogPage />;
}

