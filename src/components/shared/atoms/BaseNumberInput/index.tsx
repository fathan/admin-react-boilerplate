import {
  Input,
  InputProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

type BaseNumberInputProps = InputProps & {
  label?: string;
  name: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  registration?: UseFormRegisterReturn;
  type?: string;
};

export function BaseNumberInput({
  label,
  name,
  error,
  helperText,
  isRequired = false,
  registration,
  ...inputProps
}: BaseNumberInputProps) {
  return (
    <>
      <Input
        id={name}
        name={name}
        type="number"
        {...registration}
        {...inputProps}
      />
    </>
  );
}
