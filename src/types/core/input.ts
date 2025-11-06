export type A11yInputProps = {
  ariaLabel: string;
  ariaDescribedBy?: string;
};

export type InputProps = A11yInputProps & {
  value: string;
  onChange?: (value: string) => void;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = InputProps & {
  options: SelectOption[];
};

export type InputTextProps = InputProps & {
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
};
