import Image from "next/image";

export function ProductPaymentCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/assets/products/tabby.webp"
            alt="Tabby"
            width={100}
            height={40}
            className="h-[40px] w-[100px] object-contain"
          />
          <span className="text-sm font-semibold text-zinc-600">&amp;</span>
          <Image
            src="/assets/products/tamara.webp"
            alt="Tamara"
            width={100}
            height={40}
            className="h-[40px] w-[100px] object-contain"
          />
        </div>
        <p className="text-xs text-center text-zinc-600">
          Pay later with Tabby or Tamara. Split your purchase into easy,
          interest-free payments at checkout.
        </p>
        <p className="text-[11px] text-center text-[#7C3BED] underline underline-offset-2">
          Learn more about Tabby &amp; Tamara
        </p>
      </div>
    </div>
  );
}
