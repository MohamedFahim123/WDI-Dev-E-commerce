import StoresView from "@/src/components/StoresView/StoresView";
import { withSellerOnly } from "@/src/hoc/roleGuards";
import { mapApiStoresToStores } from "@/src/lib/api/mappers/store.mapper";
import { fetchStoresList } from "@/src/lib/api/stores";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - My Stores",
  description: "Find out all stores You've created through us in here!",
};

async function MyStores({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ limit?: string; offset?: string }>;
}) {
  const { lang } = await params;
  const sp = searchParams ? await searchParams : {};

  const limit = Number(sp?.limit ?? 50);
  const offset = Number(sp?.offset ?? 0);

  let storesData = {
    stores: [] as ReturnType<typeof mapApiStoresToStores>,
    serverTotal: 0,
    limit,
    offset,
    apiError: undefined as string | undefined,
  };

  try {
    const res = await fetchStoresList("seller/stores", { limit, offset });
    storesData = {
      stores: mapApiStoresToStores(res.data.stores),
      serverTotal: res.data.total,
      limit: res.data.limit,
      offset: res.data.offset,
      apiError: undefined,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    storesData.apiError = message;
  }

  return (
    <StoresView
      lang={lang}
      initialStores={storesData.stores}
      serverTotal={storesData.serverTotal}
      limit={storesData.limit}
      offset={storesData.offset}
      apiError={storesData.apiError}
    />
  );
}
export default withSellerOnly(MyStores, {
  redirectTo: (lang: string) => `/${lang}`,
});
