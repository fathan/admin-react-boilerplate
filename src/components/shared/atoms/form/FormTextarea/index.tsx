import {
  Field,
  Textarea,
  TextareaProps,
  Text
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

type FormTextAreaProps = TextareaProps & {
  label?: string;
  name: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  registration?: UseFormRegisterReturn;
};

export function FormTextArea({
  label,
  name,
  error,
  helperText,
  isRequired = false,
  registration,
  ...textareaProps
}: FormTextAreaProps) {
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

        <Textarea
          id={name}
          name={name}
          {...registration}
          {...textareaProps}
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
