import type { FilterItem, FilterOption } from "./types";

export const SORT_KEY = "sort";

export const SORT_OPTIONS: FilterOption[] = [
  { label: "Most relevant", value: "relevant" },
  { label: "Highest rating", value: "rating_desc" },
  { label: "Lowest price", value: "price_asc" },
  { label: "Highest price", value: "price_desc" },
];

export const FILTERS: FilterItem[] = [
  {
    label: "Rating",
    value: "rating",
    options: [
      { label: "Any rating", value: "any" },
      { label: "4★ & up", value: "4_up" },
      { label: "3★ & up", value: "3_up" },
    ],
  },
  {
    label: "Color",
    value: "color",
    options: [
      { label: "Any color", value: "any" },
      { label: "Black", value: "black" },
      { label: "White", value: "white" },
      { label: "Red", value: "red" },
    ],
  },
  {
    label: "Type",
    value: "type",
    options: [
      { label: "Any type", value: "any" },
      { label: "Sneakers", value: "sneakers" },
      { label: "Boots", value: "boots" },
    ],
  },
  {
    label: "Brand",
    value: "brand",
    options: [
      { label: "Any brand", value: "any" },
      { label: "Nike", value: "nike" },
      { label: "Adidas", value: "adidas" },
    ],
  },
  {
    label: "Gender",
    value: "gender",
    options: [
      { label: "All", value: "all" },
      { label: "Men", value: "men" },
      { label: "Women", value: "women" },
    ],
  },
];
