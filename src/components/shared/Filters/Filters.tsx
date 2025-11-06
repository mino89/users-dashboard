import { useFilters } from "@/core/hooks/filters";
import InputText from "../Input/InputText";
import Select from "../Input/Select";
import type { FiltersProps, FilterValues } from "./types";
import { filterStartingValues } from "./utils";

export default function Filters(props: FiltersProps) {
    const { filters, onFiltersChange } = props;
    const startingFilterValues = filterStartingValues(filters);
    const { filterValues, updateFilters, resetFilters } =
        useFilters<FilterValues>(startingFilterValues, onFiltersChange);

    return (
        <form>
            {filters &&
                filters.map((filter) => {
                    switch (filter.type) {
                        case "select":
                            return (
                                <Select
                                    key={filter.key}
                                    ariaLabel={filter.ariaLabel}
                                    value={filterValues[filter.key]}
                                    options={filter.options}
                                    onChange={(value) =>
                                        updateFilters(filter.key, value)
                                    }
                                />
                            );
                        case "text":
                            return (
                                <InputText
                                    key={filter.key}
                                    ariaLabel={filter.ariaLabel}
                                    placeholder={filter.placeholder}
                                    value={filterValues[filter.key]}
                                    onChange={(value) => {
                                        updateFilters(filter.key, value, true);
                                    }}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            <button type="button" onClick={() => resetFilters()}>
                Reset Filters
            </button>
        </form>
    );
}
