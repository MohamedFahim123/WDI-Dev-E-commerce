import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import Container from "../Container/Container";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function SuperOffer() {
  return (
    <section className="w-full">
      <div
        className="
          bg-[#BF5910] text-white 
          px-4 sm:px-6 py-10 sm:py-14
          flex flex-col items-center justify-center text-center
        "
      >
        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <h2
            className="
              font-bold uppercase tracking-wide
              text-3xl sm:text-4xl md:text-5xl
              drop-shadow-sm
            "
          >
            SUPER OFFER
          </h2>

          <p
            className="
              text-base sm:text-lg md:text-xl 
              text-white/90 leading-relaxed
            "
          >
            Discover your own products and exclusive deals today!
          </p>
        </div>
      </div>

      <Container className="py-10 overflow-hidden">
        <CategoriesFilter />
        <ProductsGrid />
      </Container>
    </section>
  );
}
