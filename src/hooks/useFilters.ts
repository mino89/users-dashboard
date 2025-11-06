import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { filterData } from "@utils/filters";
import type { FilterValues } from "@type/core/filters";

export function useFiltersResults<T>() {
  const [filters, setFilters] = useState<FilterValues>();

  const filteredData = useCallback(
    (data: T) => filterData<T>(data, filters || {}),
    [filters],
  );

  return { setFilters, filteredData };
}

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
