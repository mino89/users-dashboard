import { useFilters } from "@hooks/useFilters";
import type { FiltersProps, FilterValues } from "@type/core/filters";
import { filterStartingValues } from "@utils/filters";
import InputText from "./InputText";
import Select from "./Select";
import { ListRestart } from "lucide-react";
import classes from "./Filters.module.css";
export default function Filters(props: FiltersProps) {
    const { filters, onFiltersChange } = props;
    const startingFilterValues = filterStartingValues(filters);
    const { filterValues, updateFilters, resetFilters } =
        useFilters<FilterValues>(startingFilterValues, onFiltersChange);

    return (
        <form className={classes.filters}>
            {filters &&
                filters.map((filter) => {
                    switch (filter.type) {
                        case "select":
                            return (
                                <Select
                                    key={filter.key}
                                    id={filter.key}
                                    aria-label={filter.ariaLabel}
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
                                    id={filter.key}
                                    aria-label={filter.ariaLabel}
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
            {filters.length && (
                <button
                    title="Reset filters"
                    className="button-small button-rounded"
                    type="button"
                    onClick={() => resetFilters()}
                >
                    <ListRestart size={20} />
                </button>
            )}
        </form>
    );
}
