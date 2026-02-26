import { ReactNode } from "react";
import { Field, Text } from "@chakra-ui/react";

type UIFormFieldProps = {
  label?: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  children: ReactNode;
};

const UIFormField = ({
  label,
  error,
  helperText,
  isRequired = false,
  children,
}: UIFormFieldProps) => {
  return (
    <Field.Root invalid={!!error} mb={4}>
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

      {children}

      {error ? (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error}
        </Text>
      ) : helperText ? (
        <Field.HelperText>{helperText}</Field.HelperText>
      ) : null}
    </Field.Root>
  );
};

export default UIFormField;