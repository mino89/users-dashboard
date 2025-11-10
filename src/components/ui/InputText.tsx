import type { InputTextProps } from "@type/core/input";
import classes from "./InputText.module.css";
export default function InputText(props: InputTextProps) {
    const { onChange } = props;
    return (
        <input
            className={classes.inputText}
            {...props}
            onChange={(e) => onChange?.(e.target.value)}
        />
    );
}
