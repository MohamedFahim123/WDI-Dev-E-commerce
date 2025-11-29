import CreateStoreFullPage from "@/src/components/CreaetStore/CreateStoreFullPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Create a Store",
  description:
    "You can create a store now and Sell Your Own Products throught us!",
};

export default function CreateStorePage() {
  return (
    <section className="py-6">
      <CreateStoreFullPage />
    </section>
  );
}
