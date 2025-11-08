import type { FiltersProps, FilterValues } from "@type/core/filters";

/**
 *
 * @param filters {FiltersProps["filters"]}
 * @returns {FileterValues} An object containing the starting values for each filter.
 */
export function filterStartingValues(
  filters: FiltersProps["filters"],
): FilterValues {
  return filters?.reduce((acc: FilterValues, filter) => {
    acc[filter.key] = String(filter.value || "");
    return acc;
  }, {});
}

/**
 *
 * @param data {T} The data to be filtered.
 * @param filters {FilterValues} The active filters.
 * @returns {T} The filtered data.
 */
export const filterData = <T>(data: T, filters: FilterValues) => {
  if (!Array.isArray(data) || !filters) {
    return data;
  }

  const activeFilters = Object.entries(filters).filter(
    ([value]) => value && value.trim() !== "",
  );

  if (activeFilters.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return activeFilters.every(([key, value]) => {
      const itemValue = String(item[key as keyof T] || "").toLowerCase();
      const filterValue = String(value).toLowerCase();
      return itemValue.includes(filterValue);
    });
  });
};
