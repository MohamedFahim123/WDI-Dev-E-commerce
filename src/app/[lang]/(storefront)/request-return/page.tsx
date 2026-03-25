import MyRequestReturnsSection from "@/src/features/returns/components/Request-Returns/MyRequestReturnsSection";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Request Return / Exchange Request",
};

function RequestReturnsPage() {
  return <MyRequestReturnsSection />;
}

export default withBlockSeller(RequestReturnsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});

