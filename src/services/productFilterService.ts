import { Product } from "@/src/types/product.types";
import { FilterState } from "@/src/stores/shopStore";

export const applyFiltersAndSort = (
  products: Product[],
  filters: FilterState
): Product[] => {
  let result = [...products];


  const ratingFilter = filters["rating"];
  if (ratingFilter && ratingFilter !== "any") {
    if (ratingFilter === "4_up") {
      result = result.filter((p) => (p.rating ?? 0) >= 4);
    } else if (ratingFilter === "3_up") {
      result = result.filter((p) => (p.rating ?? 0) >= 3);
    }
  }


  const sortKey = filters["sort"];

  if (sortKey === "rating_desc") {
    result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (sortKey === "price_asc") {
    result.sort(
      (a, b) =>
        (a.price ?? Number.MAX_SAFE_INTEGER) -
        (b.price ?? Number.MAX_SAFE_INTEGER)
    );
  } else if (sortKey === "price_desc") {
    result.sort(
      (a, b) => (b.price ?? 0) - (a.price ?? 0)
    );
  }

  return result;
};
