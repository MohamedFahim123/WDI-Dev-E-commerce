import CheckoutPage from "@/src/components/Checkout/CheckoutPage";
import Container from "@/src/components/Container/Container";
import { Metadata } from "next";

export const metadat: Metadata = {
  title: "WDI - Checkout",
  description: "Complete Your Purchase here!",
};

export default function CheckoutFullPage() {
  return (
    <section className="py-8 lg:py-10 min-h-screen bg-zinc-50">
      <Container>
        <CheckoutPage />
      </Container>
    </section>
  );
}
