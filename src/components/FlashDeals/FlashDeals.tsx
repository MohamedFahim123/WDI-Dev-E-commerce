"use client";

import Container from "../Container/Container";
import FullTimerBox from "../FullTimerBox/FullTimerBox";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function FlashDeals() {
  return (
    <section>
      <div className="bg-[#F97415] py-8">
        <Container className="flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl flex items-center gap-2">
            <span className="text-yellow-300 text-xl">⚡</span>
            Flash Deals
          </h2>

          <FullTimerBox />
        </Container>
      </div>
      <Container className="py-10">
        <ProductsGrid />
      </Container>
    </section>
  );
}
