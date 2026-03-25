import { FILTERS, SORT_KEY, SORT_OPTIONS } from "./config";
import { FilterItem, FilterOption } from "./types";

const getOptionLabel = (options: FilterOption[], value?: string) => {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? options[0]?.label;
};

const getOptionsForKey = (key: string): FilterOption[] | null => {
  if (key === SORT_KEY) return SORT_OPTIONS;
  const filter = FILTERS.find((f) => f.value === key);
  return filter?.options ?? null;
};

const isFilterActive = (
  filter: FilterItem,
  selectedValue: string | undefined
) => {
  return !!selectedValue && selectedValue !== filter.options[0]?.value;
};

export { getOptionLabel, getOptionsForKey, isFilterActive };
