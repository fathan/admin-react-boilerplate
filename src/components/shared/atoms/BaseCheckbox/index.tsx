import {
  Checkbox,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useController, FieldValues, Path, Control } from "react-hook-form";

type BaseCheckboxProps<T extends FieldValues> = {
  label?: string;
  labelSecondary?: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
};

export function BaseCheckbox<T extends FieldValues>({
  labelSecondary,
  name,
  control,
}: BaseCheckboxProps<T>) {

  const { field } = useController({
    name,
    control
  });

  return (
    <>
      <Checkbox.Root
        checked={!!field.value}
        onCheckedChange={(e) => field.onChange(!!e.checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>{labelSecondary}</Checkbox.Label>
      </Checkbox.Root>
    </>
  );
}
