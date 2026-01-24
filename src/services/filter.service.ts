import { fetchApi } from "../lib/fetchApi";

export async function getFilters() {
  const [
    categoryTree,
    allCategories,
    rootCategories,
    colorAttributes,
    sizeAttributes,
    popularBrands,
  ] = await Promise.all([
    fetchApi("category/tree", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi("category/all", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi("category/list", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi("attribute/list?search=Color&limit=100&offset=0", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi("attribute/list?search=Size&limit=100&offset=0", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi("brand/list?limit=100&offset=0", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),
  ]);

  if (
    !categoryTree.success ||
    !allCategories.success ||
    !rootCategories.success ||
    !colorAttributes.success ||
    !sizeAttributes.success ||
    !popularBrands.success
  ) {
    throw new Error("Failed to load filters");
  }

  return {
    categories: {
      tree: categoryTree.data,
      all: allCategories.data,
      root: rootCategories.data,
    },
    attributes: {
      colors: colorAttributes.data,
      sizes: sizeAttributes.data,
    },
    brands: popularBrands.data,
  };
}

export async function getChildCategories(parentId: number) {
  const res = await fetchApi(`category/list?parent_id=${parentId}`, {
    cache: "no-store",
  });

  if (!res.success) throw new Error("Failed to load child categories");
  return res.data;
}

export async function searchAttributes(search: string, limit = 20, offset = 0) {
  const res = await fetchApi(
    `attribute/list?search=${search}&limit=${limit}&offset=${offset}`,
    { cache: "no-store" },
  );

  if (!res.success) throw new Error("Failed to search attributes");
  return res.data;
}

export async function searchBrands(search: string, limit = 20, offset = 0) {
  const res = await fetchApi(
    `brand/list?search=${search}&limit=${limit}&offset=${offset}`,
    { cache: "no-store" },
  );

  if (!res.success) throw new Error("Failed to search brands");
  return res.data;
}
