import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { filterData } from "@utils/filters";
import type { FilterValues } from "@type/core/filters";

/**
 * Hook to manage filter state and provide filtered data.
 * @returns An object containing setFilters function and filteredData function.
 */
export function useFiltersResults<T>() {
  const [filters, setFilters] = useState<FilterValues>();

  const filteredData = useCallback(
    (data: T) => filterData<T>(data, filters || {}),
    [filters],
  );

  return { setFilters, filteredData };
}

/**
 * Hook to manage individual filter values and provide update and reset functions.
 * @param initalValues - The initial filter values.
 * @param cb - Callback function to be called on filter value changes.
 * @returns An object containing filterValues, updateFilters function, and resetFilters function.
 */
export function useFilters<T>(initalValues: T, cb: (values: T) => void) {
  const [startingValues] = useState<T>(initalValues);
  const [filterValues, setFilterValues] = useState<T>(startingValues);

  const debounceOnFiltersChange = useDebounce((values: T) => {
    cb(values);
  });

  const updateFilters = useCallback(
    (key: string, value: string, isDebounce: boolean = false) => {
      const updatedValues = { ...filterValues, [key]: value };
      setFilterValues(updatedValues);
      if (isDebounce) {
        debounceOnFiltersChange(updatedValues);
      } else {
        cb(updatedValues);
      }
    },
    [filterValues],
  );

  const resetFilters = useCallback(() => {
    setFilterValues(startingValues);
    cb(startingValues);
  }, []);

  return { filterValues, updateFilters, resetFilters };
}
