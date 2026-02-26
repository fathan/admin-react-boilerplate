import {
  RadioGroup,
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

export function BaseRadioGroup({
  name,
  control,
  options,
  error,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup.Root
          value={field.value}
          onValueChange={(e) => field.onChange(e.value)}
        >
          <HStack gap="3">
            {options.map((opt) => (
              <RadioGroup.Item
                key={opt.value}
                value={opt.value}
                className={ `border p-2 rounded-md ${error ? "border-red-500" : ""}` }
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  {opt.label}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      )}
    />
  );
}
