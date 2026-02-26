import {
  Input,
  InputProps
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type BaseTextInputProps = InputProps & {
  label?: string;
  name: string;
  isRequired?: boolean;
  registration?: UseFormRegisterReturn;
  type?: string;
  className?: string;
};

export function BaseTextInput({
  label,
  name,
  isRequired = false,
  registration,
  type = "text",
  className,
  ...inputProps
}: BaseTextInputProps) {
  return (
    <>
      <Input
        id={name}
        name={name}
        type={type}
        {...registration}
        {...inputProps}
        className={className}
      />
    </>
  );
}
