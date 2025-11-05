import type { FiltersProps, FilterValues } from "./types";
/**
 *
 * @param filters {FiltersProps["filters"]}
 * @returns {FileterValues} An object containing the starting values for each filter.
 */
export function filterStartingValues(
  filters: FiltersProps["filters"],
): FilterValues {
  return filters?.reduce((acc: FilterValues, filter) => {
    acc[filter.key] = filter.value || "";
    return acc;
  }, {});
}
