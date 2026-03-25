import MyReturnsSection from "@/src/features/returns/components/Request-Returns/MyReturnsPage/MyReturnsSection";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - My Rerturns Orders",
};

function MyReturnsRoutePage() {
  return <MyReturnsSection />;
}

export default withBlockSeller(MyReturnsRoutePage, {
  redirectTo: (lang: string) => `/${lang}`,
});

