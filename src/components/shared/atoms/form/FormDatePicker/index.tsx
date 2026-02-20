import React from "react";
import { Controller, Control } from "react-hook-form";
import { Text, Field } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string; // default "dd/MM/yyyy"
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  control,
  label,
  error,
  helperText,
  placeholder = "Pilih tanggal",
  minDate,
  maxDate,
  disabled = false,
  dateFormat = "dd/MM/yyyy",
}) => {
  return (
    <Field.Root invalid={!!error}>
      {label && (
        <Text fontWeight="medium" mb={1}>
          {label}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => field.onChange(date)}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            className="chakra-input" // bisa di-style pakai chakra-input css
          />
        )}
      />

      {error ? (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error}
        </Text>
      ) : helperText ? (
        <Field.HelperText mt={1}>{helperText}</Field.HelperText>
      ) : null}
    </Field.Root>
  );
};
