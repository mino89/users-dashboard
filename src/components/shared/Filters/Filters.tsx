import { useState } from "react";
import InputText from "../Input/InputText";
import Select from "../Input/Select";
import type { FiltersProps, FilterValues } from "./types";
import { filterStartingValues } from "./utils";

export default function Filters(props: FiltersProps) {
    const { filters, onFiltersChange, resetFilters } = props;
    const startingFilterValues = filterStartingValues(filters);
    const [filterValues, setFilterValues] =
        useState<FilterValues>(startingFilterValues);

    function handleFilterUpdate(key: string, value: string) {
        const newFilterValues = { ...filterValues, [key]: value };
        setFilterValues(newFilterValues);
        onFiltersChange(newFilterValues);
    }

    function handleResetFilters() {
        setFilterValues(startingFilterValues);
        resetFilters();
    }

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
                                        handleFilterUpdate(filter.key, value)
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
                                    onChange={(value) =>
                                        handleFilterUpdate(filter.key, value)
                                    }
                                />
                            );
                        default:
                            return null;
                    }
                })}
            <button type="button" onClick={handleResetFilters}>
                Reset Filters
            </button>
        </form>
    );
}
