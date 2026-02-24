import { useController, Control, FieldValues, Path } from "react-hook-form";
import { BaseCheckboxCard, BaseCheckboxCardProps } from "@/components/shared/atoms/BaseCheckboxCard";

interface CheckboxCardFieldProps<T extends FieldValues>
  extends Omit<BaseCheckboxCardProps, "checked" | "onChange" | "error"> {
  name: Path<T>;
  control: Control<T>;
  value: string;
}

export function CheckboxCardField<T extends FieldValues>({
  name,
  control,
  value,
  ...rest
}: CheckboxCardFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const checked = Array.isArray(field.value)
    ? field.value?.includes(value)
    : field.value === value;

  const handleChange = () => {
    if (Array.isArray(field.value)) {
      const newValue = checked
        ? field.value.filter((v: string) => v !== value)
        : [...(field.value || []), value];

      field.onChange(newValue);
    } else {
      field.onChange(value);
    }
  };

  return (
    <BaseCheckboxCard
      value={value}
      name={name}
      {...rest}
      checked={checked}
      onChange={handleChange}
      error={error?.message}
    />
  );
}