import { ReactNode, useMemo } from "react";
import {
  Select,
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

type BaseSelectInputProps<T extends FieldValues> = {
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

export function BaseSelectInput<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select option",
  multiple = false,
}: BaseSelectInputProps<T>) {

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
    <>
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
    </>
  );
}
