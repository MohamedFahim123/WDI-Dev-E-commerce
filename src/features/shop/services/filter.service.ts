import { fetchApi } from "@/src/lib/fetchApi";

export type Category = {
  id: number;
  name: string;
  complete_name?: string;
  parent_id?: number | null;
  parent_name?: string | null;
};

export type CategoriesResponse = {
  categories: Category[];
  total: number;
  limit?: number;
  offset?: number;
};

export type AttributeValue = {
  id: number;
  name: string;
  html_color?: string | false;
  sequence?: number;
};

export type Attribute = {
  id: number;
  name: string;
  display_type?: string;
  create_variant?: string;
  values: AttributeValue[];
};

export type AttributesResponse = {
  attributes: Attribute[];
  total: number;
  limit: number;
  offset: number;
};

export type Brand = {
  id: number;
  name: string;
  product_count?: number;
};

export type BrandsResponse = {
  brands: Brand[];
  total: number;
  limit: number;
  offset: number;
};

export type FiltersData = {
  categories: {
    tree: CategoriesResponse;
    all: CategoriesResponse;
    root: CategoriesResponse;
  };
  attributes: {
    colors: AttributesResponse;
    sizes: AttributesResponse;
  };
  brands: BrandsResponse;
};
// -------------------- /Types --------------------

export async function getFilters(): Promise<FiltersData> {
  const [
    categoryTree,
    allCategories,
    rootCategories,
    colorAttributes,
    sizeAttributes,
    popularBrands,
  ] = await Promise.all([
    fetchApi<CategoriesResponse>("category/tree", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi<CategoriesResponse>("category/all", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi<CategoriesResponse>("category/list", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),

    fetchApi<AttributesResponse>(
      "attribute/list?search=Color&limit=100&offset=0",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    ),

    fetchApi<AttributesResponse>(
      "attribute/list?search=Size&limit=100&offset=0",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    ),

    fetchApi<BrandsResponse>("brand/list?limit=100&offset=0", {
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
  const res = await fetchApi<CategoriesResponse>(
    `category/list?parent_id=${parentId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.success) throw new Error("Failed to load child categories");
  return res.data;
}

export async function searchAttributes(search: string, limit = 20, offset = 0) {
  const res = await fetchApi<AttributesResponse>(
    `attribute/list?search=${search}&limit=${limit}&offset=${offset}`,
    { cache: "no-store" },
  );

  if (!res.success) throw new Error("Failed to search attributes");
  return res.data;
}

export async function searchBrands(search: string, limit = 20, offset = 0) {
  const res = await fetchApi<BrandsResponse>(
    `brand/list?search=${search}&limit=${limit}&offset=${offset}`,
    { cache: "no-store" },
  );

  if (!res.success) throw new Error("Failed to search brands");
  return res.data;
}

