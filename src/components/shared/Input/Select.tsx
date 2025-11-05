import type { SelectProps } from "../types/input";

export default function Select(props: SelectProps) {
    const { options, value, onChange, ariaLabel } = props;
    return (
        <select
            aria-label={ariaLabel}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
