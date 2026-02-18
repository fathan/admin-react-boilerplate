import {
  Field,
  Checkbox,
  Text
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useController, FieldValues, Path, Control } from "react-hook-form";

type FormCheckboxInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
};

export function FormCheckboxInput<T extends FieldValues>({
  label,
  name,
  control,
  error,
  helperText,
  isRequired = false,
}: FormCheckboxInputProps<T>) {

  const { field } = useController({
    name,
    control
  });

  return (
    <Field.Root invalid={!!error}>
      {label && (
        <Field.Label>
          {label}
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </Field.Label>
      )}

      <Checkbox.Root
        checked={!!field.value}
        onCheckedChange={(e) => field.onChange(!!e.checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>{label}</Checkbox.Label>
      </Checkbox.Root>

      {error ? (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      ) : helperText ? (
        <Field.HelperText>{helperText}</Field.HelperText>
      ) : null}
    </Field.Root>
  );
}
