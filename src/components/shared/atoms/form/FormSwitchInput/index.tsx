import {
  Field,
  Switch,
  Text
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  useController,
  FieldValues,
  Path,
  Control
} from "react-hook-form";

type FormSwitchInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
};

export function FormSwitchInput<T extends FieldValues>({
  label,
  name,
  control,
  error,
  helperText,
  isRequired = false,
}: FormSwitchInputProps<T>) {

  const { field } = useController({
    name,
    control,
  });

  const id = `switch-${name}`;

  return (
    <Field.Root invalid={!!error}>
      {label && (
        <Field.Label htmlFor={id}>
          {label}
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </Field.Label>
      )}

      <Switch.Root
      checked={field.value ?? false}
      onCheckedChange={(e) => field.onChange(e.checked)}
    >
      <Switch.HiddenInput
        ref={field.ref}
        name={field.name}
        onBlur={field.onBlur}
        value={field.value ? "true" : "false"}
      />
      <Switch.Control />
      <Switch.Label>{label}</Switch.Label>
    </Switch.Root>

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
