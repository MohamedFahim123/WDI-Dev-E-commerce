"use client";

import { Clock } from "lucide-react";
import Container from "../Container/Container";
import FullTimerBox from "../FullTimerBox/FullTimerBox";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function FlashDeals() {
  return (
    <section className="w-full">
      <div className="bg-[#C2410C] px-4 sm:px-6 py-10 flex flex-col items-center justify-center text-center">
        <Container
          className="
            flex flex-col items-center justify-center gap-4
            text-center
            sm:gap-5
            md:flex-row md:justify-between md:text-left
          "
        >
          <h2
            className="
              text-white font-bold text-2xl sm:text-3xl
              flex items-center justify-center md:justify-start gap-2
            "
          >
            <span className="text-yellow-300 text-2xl sm:text-3xl">⚡</span>
            Flash Deals
          </h2>

          <div className="w-full max-w-[260px]">
            <div className="flex items-center gap-3 border border-white/40 py-1 rounded-lg text-white min-w-64 justify-center">
              <span className="flex items-center gap-1 text-sm">
                <Clock size={14} /> Ends in:
              </span>
              <FullTimerBox />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <ProductsGrid />
      </Container>
    </section>
  );
}
