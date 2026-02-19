import React, { ReactNode, useState, useRef, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { Box, Text, Spinner, Flex } from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import { Control, Controller } from "react-hook-form";

export interface OptionType {
  label: string;
  value: string | number;
}

interface FormAsyncSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  helperText?: ReactNode;
  placeholder?: string;
  isClearable?: boolean;
  multiple?: boolean;
  loadOptionsUrl: string;
  queryParamName?: string;
  requestConfig?: AxiosRequestConfig;
  debounceTime?: number;
  pageSize?: number;
  labelField?: string | ((item: any) => string); // field untuk label
  valueField?: string | ((item: any) => string | number); // field untuk value
}

export const FormAsyncSelect: React.FC<FormAsyncSelectProps> = ({
  name,
  control,
  label,
  error,
  helperText,
  placeholder = "Select...",
  isClearable = true,
  multiple = false,
  loadOptionsUrl,
  queryParamName = "q",
  requestConfig = {},
  debounceTime = 300,
  pageSize = 20,
  labelField = "name",
  valueField = "id",
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const loadingRef = useRef(false);

  // helper function untuk map item ke OptionType
  const mapToOption = (item: any): OptionType => {
    const label =
      typeof labelField === "function" ? labelField(item) : item[labelField];
    const value =
      typeof valueField === "function" ? valueField(item) : item[valueField];
    return { label, value };
  };

  // Fetch data dari API
  const fetchOptions = async (pageNumber = 1, query?: string): Promise<OptionType[]> => {
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await axios.get(loadOptionsUrl, {
        params: {
          [queryParamName!]: query || "",
          page: pageNumber,
          limit: pageSize,
        },
        ...requestConfig,
      });

      const dataArray = Array.isArray(response.data) ? response.data : response.data.items;

      const mapped = dataArray.map(mapToOption);

      if (pageNumber === 1) setOptions(mapped);
      else setOptions((prev) => [...prev, ...mapped]);

      setHasMore(mapped.length === pageSize);
      loadingRef.current = false;
      setIsLoading(false);
      return mapped;
    } catch (err) {
      console.error("Error fetching options:", err);
      loadingRef.current = false;
      setIsLoading(false);
      return [];
    }
  };

  // Debounce search
  const debouncedLoadOptions = useCallback(
    (input: string, callback: (options: OptionType[]) => void) => {
      setInputValue(input);
      setPage(1);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        const newOptions = await fetchOptions(1, input);
        callback(newOptions);
      }, debounceTime);
    },
    [debounceTime]
  );

  // Infinite scroll
  const MenuList = (props: any) => {
    const { children, innerRef } = props;

    const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 5) {
        if (!loadingRef.current && hasMore) {
          const nextPage = page + 1;
          await fetchOptions(nextPage, inputValue);
          setPage(nextPage);
        }
      }
    };

    return (
      <components.MenuList {...props} innerRef={innerRef} onScroll={handleScroll}>
        {children}
        {isLoading && (
          <Flex justify="center" p={2}>
            <Spinner size="sm" />
          </Flex>
        )}
      </components.MenuList>
    );
  };

  const handleMenuOpen = async () => {
    if (options.length === 0) {
      await fetchOptions(1);
      setPage(1);
    }
  };

  return (
    <Box className="w-full">
      {label && (
        <Text mb={1} fontWeight="medium" fontSize="sm">
          {label}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <AsyncSelect
              {...field}
              cacheOptions
              defaultOptions={options}
              loadOptions={debouncedLoadOptions}
              placeholder={placeholder}
              isClearable={isClearable}
              isMulti={multiple}
              onChange={(option) => field.onChange(option)}
              onMenuOpen={handleMenuOpen}
              components={{ MenuList }}
              classNamePrefix="chakra-async-select"
            />
            {fieldState.error && (
              <Text mt={1} fontSize="xs" color="red.500">
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />

      {error ? (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      ) : helperText ? (
        <Text fontSize="sm" color="gray.500">
          {helperText}
        </Text>
      ) : null}
    </Box>
  );
};
