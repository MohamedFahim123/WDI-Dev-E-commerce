import CreateStoreFullPage from "@/src/components/CreaetStore/CreateStoreFullPage";
import { withSellerOnly } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Create a Store",
  description:
    "You can create a store now and Sell Your Own Products throught us!",
};

function CreateStorePage() {
  return (
    <section className="py-6">
      <CreateStoreFullPage />
    </section>
  );
}
export default withSellerOnly(CreateStorePage, {
  redirectTo: (lang: string) => `/${lang}`,
});
