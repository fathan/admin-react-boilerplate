import { RadioCard } from "@chakra-ui/react";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BaseRadioCard, { BaseRadioCardProps } from "@/components/shared/atoms/BaseRadioCard";

export interface UIRadioCardGroupProps<T extends FieldValues = FieldValues> {
  /** Unique name for the radio group — juga dipakai sebagai field name di RHF */
  name: Path<T>;
  /** Currently selected value (uncontrolled / standalone) */
  value?: string;
  /** Callback when value changes (uncontrolled / standalone) */
  onChange?: (value: string) => void;
  /** RHF control object — jika diberikan, component akan dikendalikan oleh RHF */
  control?: Control<T>;
  /** List of radio card items */
  items: BaseRadioCardProps[];
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Chakra UI color palette */
  colorPalette?: string;
  /** Chakra UI RadioCard variant */
  variant?: "outline" | "subtle" | "surface";
  /** Number of columns */
  columns?: number;
  /** Custom className for the wrapper */
  className?: string;
  error?: string;
}

function UIRadioCardGroup<T extends FieldValues = FieldValues>({
  name,
  value,
  onChange,
  control,
  items,
  orientation = "horizontal",
  colorPalette = "blue",
  variant = "outline",
  columns,
  className,
  error,
}: UIRadioCardGroupProps<T>) {
  const gridCols = columns
    ? `grid-cols-${columns}`
    : orientation === "horizontal"
    ? `grid-cols-${Math.min(items.length, 3)}`
    : "grid-cols-1";

  const renderGroup = (fieldValue?: string, fieldOnChange?: (v: string) => void) => (
    <RadioCard.Root
      name={name}
      value={fieldValue ?? value}
      onValueChange={(details) => {
        fieldOnChange?.(details.value ?? "");
        onChange?.(details.value ?? "");
      }}
      colorPalette={colorPalette}
      variant={variant}
      orientation={orientation}
    >
      <div className={`grid gap-3 ${gridCols} ${className ?? ""}`}>
        {items.map((item) => (
          <BaseRadioCard
            key={item.value}
            {...item}
            colorPalette={colorPalette}
            variant={variant}
            error={error }
          />
        ))}
      </div>
    </RadioCard.Root>
  );

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => renderGroup(field.value, field.onChange)}
      />
    );
  }

  return renderGroup();
}

export default UIRadioCardGroup;