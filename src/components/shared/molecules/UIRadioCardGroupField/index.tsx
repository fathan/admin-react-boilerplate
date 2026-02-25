import { Field } from "@chakra-ui/react";

import { Control, FieldValues, Path, useFormState, get, FieldError } from "react-hook-form";
import { BaseRadioCardProps } from "@/components/shared/atoms/BaseRadioCard";
import UIRadioCardGroup from "@/components/shared/molecules/UIRadioCardGroup";

export interface UIRadioCardGroupFieldProps<T extends FieldValues> {
  /** Field value — harus match dengan key di Zod schema */
  error?: string;
  /** Field name — harus match dengan key di Zod schema */
  name: Path<T>;
  /** RHF control object */
  control: Control<T>;
  /** Label di atas group */
  label?: string;
  /** Helper text di bawah group */
  helperText?: string;
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
  /** Custom className untuk wrapper */
  className?: string;
  /** Field wajib diisi */
  required?: boolean;
}

/**
 * UIRadioCardGroupField
 *
 * Molecule siap pakai di dalam <form> dengan React Hook Form + Zod.
 * Sudah include label, error message, dan helper text dari Chakra UI Field.
 *
 * @example
 * <UIRadioCardGroupField
 *   name="plan"
 *   control={control}
 *   label="Pilih Plan"
 *   items={planItems}
 * />
 */
function UIRadioCardGroupField<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  items,
  orientation = "horizontal",
  colorPalette = "blue",
  variant = "outline",
  columns,
  className,
  required = false,
}: UIRadioCardGroupFieldProps<T>) {
  const { errors } = useFormState({ control, name });

  const fieldError: FieldError | undefined = get(errors, name);
  const errorMessage = fieldError?.message;

  const isInvalid = !!errorMessage;

  return (
    <Field.Root invalid={isInvalid} required={required}>
      {label && (
        <Field.Label>
          {label}
          {required && <Field.RequiredIndicator />}
        </Field.Label>
      )}

      <UIRadioCardGroup<T>
        name={name}
        control={control}
        items={items}
        orientation={orientation}
        colorPalette={isInvalid ? "red" : colorPalette}
        variant={variant}
        columns={columns}
        className={className}
      />

      {helperText && !isInvalid && (
        <Field.HelperText>{helperText}</Field.HelperText>
      )}

      {isInvalid && (
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
      )}
    </Field.Root>
  );
}

export default UIRadioCardGroupField;