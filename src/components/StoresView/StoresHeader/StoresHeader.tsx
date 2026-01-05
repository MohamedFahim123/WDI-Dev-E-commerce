"use client";

import Container from "@/src/components/Container/Container";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";

export function StoresHeader({
  lang,
  serverTotal,
}: {
  lang: string;
  serverTotal: number;
}) {
  return (
    <section aria-labelledby="stores-heading" className="w-full" role="banner">
      <PageHeader
        title="Stores"
        breadcrumb={[{ label: "Home", href: `/${lang}` }, { label: "Stores" }]}
      />

      <div className="w-full bg-white">
        <Container>
          <div className="flex flex-col gap-2 pb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Browse stores ({serverTotal.toLocaleString()})
            </h2>

            <p className="text-md text-muted-foreground">
              Discover stores by location and status.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
