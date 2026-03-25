import Image from "next/image";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";

export function DealsHero({ lang }: { lang: string }) {
  return (
    <section className="w-full bg-white">
      <PageHeader
        title="Deals & Coupons"
        breadcrumb={[
          { label: "Home", href: `/${lang}` },
          { label: "Deals & Coupons" },
        ]}
      />

      <div className="w-full bg-black">
        <div className="overflow-hidden">
          <Image
            src="/assets/banners/black-friday-banner.webp"
            alt="Black Friday – discount up to 50%"
            width={1600}
            height={400}
            priority
            className="h-15 w-full object-cover sm:h-32 md:h-31"
          />
        </div>
      </div>
    </section>
  );
}

