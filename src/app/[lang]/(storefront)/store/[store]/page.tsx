import StoreProfileView from "@/src/components/StoreProfileView/StoreProfileView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Single Store Page",
  description: "Explore all Store products!",
};

export default async function StorePage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const param = await params;
  const store = param.store;
  console.log(store);

  return <StoreProfileView />;
}
