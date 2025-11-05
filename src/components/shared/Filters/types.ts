import type { SelectProps, InputTextProps } from "../types/input";

export type FiltersConfig = {
  key: string;
} & ((SelectProps & { type: "select" }) | (InputTextProps & { type: "text" }));

export type FiltersProps = {
  filters: FiltersConfig[];
  onFiltersChange: (filters: FilterValues) => void;
  resetFilters: () => void;
};

export type FilterValues = Record<string, string>;
