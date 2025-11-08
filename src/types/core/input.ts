import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export type SharedInputProps = {
  onChange?: (value: string) => void;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "children"
> &
  SharedInputProps & {
    options: SelectOption[];
  };
export type InputTextProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "children"
> &
  SharedInputProps;
