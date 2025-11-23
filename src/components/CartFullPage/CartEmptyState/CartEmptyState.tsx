import Link from "next/link";

export default function CartEmptyState({ lang }: { lang: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-lg font-semibold text-zinc-800">
        Your cart is currently empty
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        Browse our products and add something to your cart to get started.
      </p>
      <Link
        href={`/${lang}/shop`}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-violet-500 px-5 py-2 text-sm font-medium text-[#7C3BED] hover:bg-violet-50"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
