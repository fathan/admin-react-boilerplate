import React from "react";
import { Controller, Control } from "react-hook-form";
import { Text, Field, Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { range } from "lodash";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface BaseDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  isRequired?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string; // default "dd/MM/yyyy"
}

// ///////////////////////////////////////////

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const years = range(1990, getYear(new Date()) + 1, 1) as number[];

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div
    style={{
      margin: 10,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      {"<"}
    </button>
    <select
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(+value)}
    >
      {years.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      value={MONTHS[getMonth(date)]}
      onChange={({ target: { value } }) =>
        changeMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))
      }
    >
      {MONTHS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      {">"}
    </button>
  </div>
);

// ///////////////////////////////////////////

export const BaseDatePicker: React.FC<BaseDatePickerProps> = ({
  name,
  control,
  label,
  error,
  helperText,
  placeholder = "Pilih tanggal",
  isRequired = false,
  minDate,
  maxDate,
  disabled = false,
  dateFormat = "dd/MM/yyyy",
}) => {
  return (
    <Field.Root invalid={!!error}>
      {label && (
        <Text fontWeight="medium" fontSize="sm">
          {label} {isRequired && <Text as="span" color="red.500">*</Text>}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          // showIcon
          // showWeekNumbers
          // showMonthYearPicker --- dateFormat="MM/yyyy"
          // showQuarterYearPicker
          // showYearPicker
          // showTimeSelect
          // selectsRange
          
          <DatePicker
            renderCustomHeader={CustomHeader}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => field.onChange(date)}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            isClearable
            closeOnScroll
            wrapperClassName="w-full"
            popperClassName="z-50"
            customInput={
              <Input
                name={name}
                className="w-full"
              />
            }
            className={ `w-full ${error ? "border-red-500" : "border-gray-300"} focus:border-blue-400 focus:ring-blue-400` }
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
