import {
  CheckboxCard,
  Field,
  Text,
} from "@chakra-ui/react";
import { ReactNode, forwardRef } from "react";

export type BaseCheckboxCardProps = {
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  checked?: boolean;
  onChange?: () => void;
  value?: string;
  isDisabled?: boolean;
};

export const BaseCheckboxCard = forwardRef<
  HTMLLabelElement,
  BaseCheckboxCardProps
>(
  (
    {
      name,
      label,
      description,
      error,
      isRequired = false,
      checked,
      onChange,
      value,
      isDisabled,
    },
    ref
  ) => {
    return (
      <>
        <Field.Root>
          <CheckboxCard.Root
            ref={ref}
            name={name}
            value={value}
            checked={checked}
            onCheckedChange={onChange}
            disabled={isDisabled}
            borderWidth="1px"
            borderColor={error ? "red.500" : "gray.200"}
            _hover={{
              borderColor: error ? "red.500" : "blue.400",
            }}
            className="w-full"
          >
            <CheckboxCard.HiddenInput />

            <CheckboxCard.Control>
              <CheckboxCard.Content>
                {label && (
                  <CheckboxCard.Label fontWeight="semibold">
                    {label}
                    {isRequired && (
                      <Text as="span" color="red.500" ml={1}>
                        *
                      </Text>
                    )}
                  </CheckboxCard.Label>
                )}

                {description && (
                  <CheckboxCard.Description>
                    {description}
                  </CheckboxCard.Description>
                )}
              </CheckboxCard.Content>

              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        </Field.Root>
      </>
    );
  }
);

BaseCheckboxCard.displayName = "BaseCheckboxCard";