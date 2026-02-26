import {
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type BaseTextAreaProps = TextareaProps & {
  label?: string;
  name: string;
  registration?: UseFormRegisterReturn;
};

export function BaseTextArea({
  label,
  name,
  registration,
  ...textareaProps
}: BaseTextAreaProps) {
  return (
    <>
      <Textarea
        id={name}
        name={name}
        {...registration}
        {...textareaProps}
      />
    </>
  );
}
