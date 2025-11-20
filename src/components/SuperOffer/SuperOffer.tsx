import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import Container from "../Container/Container";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function SuperOffer() {
  return (
    <section>
      <div className="bg-[#F97415] text-white p-6 text-center">
        <h2 className="font-bold text-4xl">SUPER OFFER</h2>
        <p className="text-xl">Discover your own products</p>
      </div>

      <Container className="py-10 overFlowHidden">
        <CategoriesFilter />
        <ProductsGrid />
      </Container>
    </section>
  );
}
