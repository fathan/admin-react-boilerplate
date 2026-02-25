import {
  Field,
  InputProps,
  Text
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";
import { PasswordInput } from "@/components/ui/password-input";

type BasePasswordInputProps = InputProps & {
  label?: string;
  name: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  registration?: UseFormRegisterReturn;
  type?: string;
  className?: string;
};

export function BasePasswordInput({
  label,
  name,
  error,
  helperText,
  isRequired = false,
  registration,
  type = "text",
  className,
  ...inputProps
}: BasePasswordInputProps) {
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

        <PasswordInput
          id={name}
          name={name}
          type={type}
          {...registration}
          {...inputProps}
          className={className}
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
