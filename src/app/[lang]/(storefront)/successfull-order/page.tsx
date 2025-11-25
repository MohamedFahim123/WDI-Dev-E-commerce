import Container from "@/src/components/Container/Container";
import SuccessOrder from "@/src/components/Order-Placed-Successfully/SuccessOrder";

export default function SuccessfullOrder() {
  return (
    <section className="py-8 lg:py-10 bg-zinc-50">
      <Container>
        <SuccessOrder />
      </Container>
    </section>
  );
}
