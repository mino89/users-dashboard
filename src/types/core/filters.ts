import type { SelectProps, InputTextProps } from "./input";

export type FiltersConfig = {
  key: string;
} & (
  | (SelectProps & { type: "select" })
  | (InputTextProps & { type: "text" })
) & {
    ariaLabel: string;
  };

export type FiltersProps = {
  filters: FiltersConfig[];
  onFiltersChange: (filters: FilterValues) => void;
};

export type FilterValues = Record<string, string>;
