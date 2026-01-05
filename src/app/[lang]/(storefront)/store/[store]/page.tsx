import StoreProfileView from "@/src/components/StoreProfileView/StoreProfileView";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Single Store Page",
  description: "Explore all Store products!",
};

async function StorePage({ params }: { params: Promise<{ store: string }> }) {
  const param = await params;
  const store = param.store;
  console.log(store)

  return <StoreProfileView />;
}

export default withBlockSeller(StorePage, {
  redirectTo: (lang: string) => `/${lang}`,
});
