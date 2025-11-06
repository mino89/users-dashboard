import type { InputTextProps } from "@type/core/input";

export default function InputText(props: InputTextProps) {
    const { value, placeholder, onChange, ariaLabel, type } = props;
    return (
        <input
            aria-label={ariaLabel}
            placeholder={placeholder}
            value={value}
            type={type || "text"}
            onChange={(e) => onChange?.(e.target.value)}
        />
    );
}
