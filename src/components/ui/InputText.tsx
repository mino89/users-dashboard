import type { InputTextProps } from "@type/core/input";
import "./InputText.module.css";
export default function InputText(props: InputTextProps) {
    const { onChange } = props;
    return <input {...props} onChange={(e) => onChange?.(e.target.value)} />;
}
