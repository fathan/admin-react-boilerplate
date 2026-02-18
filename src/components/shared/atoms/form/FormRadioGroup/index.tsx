import {
  Field,
  RadioGroup,
  Text,
  HStack
} from "@chakra-ui/react";
import { Controller, Control } from "react-hook-form";
import { ReactNode } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  name: string;
  control: Control<any>;
  options: Option[];
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
};

export function FormRadioGroup({
  label,
  name,
  control,
  options,
  error,
  helperText,
  isRequired = false
}: Props) {
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

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup.Root
            value={field.value}
            onValueChange={(e) => field.onChange(e.value)}
          >
            <HStack gap="6">
              {options.map((opt) => (
                <RadioGroup.Item key={opt.value} value={opt.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{opt.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        )}
      />

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
