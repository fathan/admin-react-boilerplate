import {
  InputProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";

type BasePasswordInputProps = InputProps & {
  label?: string;
  name: string;
  registration?: UseFormRegisterReturn;
  type?: string;
  className?: string;
};

export function BasePasswordInput({
  label,
  name,
  registration,
  type = "text",
  className,
  ...inputProps
}: BasePasswordInputProps) {
  return (
    <>
     <PasswordInput
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
