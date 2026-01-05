import Checkout from "@/src/components/Checkout/Checkout";
import Container from "@/src/components/Container/Container";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

export const metadat: Metadata = {
  title: "WDI - Checkout",
  description: "Complete Your Purchase here!",
};

function CheckoutFullPage() {
  return (
    <section className="py-8 lg:py-10 min-h-screen bg-zinc-50">
      <Container>
        <Checkout />
      </Container>
    </section>
  );
}

export default withBlockSeller(CheckoutFullPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
