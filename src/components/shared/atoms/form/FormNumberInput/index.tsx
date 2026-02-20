import {
  Field,
  Input,
  InputProps,
  Text
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

type FormNumberInputProps = InputProps & {
  label?: string;
  name: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  registration?: UseFormRegisterReturn;
  type?: string;
};

export function FormNumberInput({
  label,
  name,
  error,
  helperText,
  isRequired = false,
  registration,
  ...inputProps
}: FormNumberInputProps) {
  return (
    <>
      <Field.Root invalid={!!error}>
        {label && (
          <Field.Label htmlFor={name}>
            {label}
            {isRequired && (
              <Text as="span" color="red.500">
                *
              </Text>
            )}
          </Field.Label>
        )}

        <Input
          id={name}
          name={name}
          type="number"
          {...registration}
          {...inputProps}
        />

        {error ? (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        ) : helperText ? (
          <Field.HelperText>{helperText}</Field.HelperText>
        ) : null}
      </Field.Root>
    </>
  );
}
