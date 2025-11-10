import type { SelectProps } from "@type/core/input";
import classes from "./Select.module.css";
export default function Select(props: SelectProps) {
    const { onChange } = props;
    return (
        <select
            className={classes.inputSelect}
            {...props}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
