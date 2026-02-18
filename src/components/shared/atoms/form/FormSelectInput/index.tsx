import { ReactNode, useMemo } from "react";
import {
  Field,
  Select,
  Text,
  createListCollection
} from "@chakra-ui/react";
import {
  useController,
  FieldValues,
  Path,
  Control
} from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormSelectInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  error?: string;
  helperText?: ReactNode;
  isRequired?: boolean;
  multiple?: boolean;
};

export function FormSelectInput<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder = "Select option",
  error,
  helperText,
  isRequired = false,
  multiple = false,
}: FormSelectInputProps<T>) {

  const { field } = useController({
    name,
    control,
  });

  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [options]
  );

  // ===== VALUE MAPPING =====
  let selectedValues: string[] = [];

  if (multiple) {
    selectedValues = field.value?.map((v: Option) => v.value) ?? [];
  } else {
    selectedValues = field.value?.value ? [field.value.value] : [];
  }

  // ===== CHANGE HANDLER =====
  const handleChange = (vals: string[]) => {
    if (multiple) {
      const selectedObjs = options.filter((o) =>
        vals.includes(o.value)
      );
      field.onChange(selectedObjs);
    } else {
      const selectedObj = options.find((o) => o.value === vals[0]);
      field.onChange(selectedObj ?? null);
    }
  };

  const id = `select-${name}`;

  return (
    <Field.Root invalid={!!error}>
      {label && (
        <Field.Label htmlFor={id}>
          {label}
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </Field.Label>
      )}

      <Select.Root
        multiple={multiple}
        collection={collection}
        value={selectedValues}
        onValueChange={(e) => handleChange(e.value)}
      >
        <Select.HiddenSelect
          id={id}
          name={name}
          onBlur={field.onBlur}
        />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup />
        </Select.Control>

        <Select.Positioner>
          <Select.Content>
            {options.map((opt) => (
              <Select.Item key={opt.value} item={opt.value}>
                {opt.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>

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
