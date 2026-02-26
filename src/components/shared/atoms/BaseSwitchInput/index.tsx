import {
  Switch,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  useController,
  FieldValues,
  Path,
  Control
} from "react-hook-form";

type BaseSwitchInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
};

export function BaseSwitchInput<T extends FieldValues>({
  label,
  name,
  control,
}: BaseSwitchInputProps<T>) {

  const { field } = useController({
    name,
    control,
  });

  // const id = `switch-${name}`;

  return (
    <>
      <Switch.Root
        checked={field.value ?? false}
        onCheckedChange={(e) => field.onChange(e.checked)}
      >
        <Switch.HiddenInput
          ref={field.ref}
          name={field.name}
          onBlur={field.onBlur}
          value={field.value ? "true" : "false"}
        />
        <Switch.Control />
        <Switch.Label>{label}</Switch.Label>
      </Switch.Root>
    </>
  );
}
