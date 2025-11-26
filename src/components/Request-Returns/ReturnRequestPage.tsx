"use client";

import Container from "@/src/components/Container/Container";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import { useRouteLang } from "@/src/hooks/useLang";
import * as React from "react";
import ReturnHeaderControls from "./ReturnHeaderControls/ReturnHeaderControls";
import { RETURN_ITEMS } from "./ReturnRequestData";
import ReturnRequestGrid from "./ReturnRequestGrid/ReturnRequestGrid";
import ReturnRequestSkeleton from "./ReturnRequestSkeleton";

export default function ReturnRequestPage() {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const lang = useRouteLang();

  const filteredItems = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return RETURN_ITEMS;
    return RETURN_ITEMS.filter((item) => item.name.toLowerCase().includes(q));
  }, [search]);

  const breadcrumb = [{ label: "Home", href: "/" }, { label: "Request-Return" }];

  return (
    <div className="min-h-screen bg-[#fafafa]py-8 sm:py-10">
      <PageHeader
        title="Return / Exchange Request"
        breadcrumb={breadcrumb}
        rightSlot={
          <ReturnHeaderControls
            lang={lang}
            search={search}
            onSearchChange={setSearch}
          />
        }
      />

      <section className="py-6">
        <Container>
          <div className="mb-4 sm:hidden">
            <ReturnHeaderControls
              lang={lang}
              search={search}
              onSearchChange={setSearch}
            />
          </div>

          {isLoading ? (
            <ReturnRequestSkeleton />
          ) : (
            <ReturnRequestGrid
              items={filteredItems.map((item) => ({
                ...item,
              }))}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
