import Container from "@/src/components/Container/Container";
import OrderPlacedSuccessfully from "@/src/components/Order-Placed-Successfully/OrderPlacedSuccessfully";

export default function SuccessfullOrder() {
  return (
    <section className="py-8 lg:py-10 bg-zinc-50">
      <Container>
        <OrderPlacedSuccessfully />
      </Container>
    </section>
  );
}
