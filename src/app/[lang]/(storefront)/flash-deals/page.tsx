import FlashDealsFullContent from "@/src/components/FlashDealsFullContent/FlashDealsFullContent";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Flash Deals",
  description: "Create Your Best Purchase through us!",
};

function FlashDealsPage() {
  return <FlashDealsFullContent />;
}

export default withBlockSeller(FlashDealsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
