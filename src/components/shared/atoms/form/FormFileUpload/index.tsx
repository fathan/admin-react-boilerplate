import React, { useState } from "react";
import { Box, Text, Input, Flex, Image } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

interface FormFileUploadProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  multiple?: boolean;
  accept?: string; // contoh: "image/*,.pdf"
  showPreview?: boolean;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
  name,
  control,
  label,
  helperText,
  error,
  isRequired = false,
  multiple = false,
  accept,
  showPreview = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return [];
    const fileArray = Array.from(files);
    if (showPreview) {
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
    return multiple ? fileArray : fileArray[0];
  };

  return (
    <Box mb={4}>
      {label && (
        <Text mb={1} fontWeight="medium" fontSize="sm">
          {label} {isRequired && <Text as="span" color="red.500">*</Text>}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Input
              type="file"
              multiple={multiple}
              accept={accept}
              onChange={(e) => field.onChange(handleFileChange(e.target.files))}
            />
            {showPreview && previews.length > 0 && (
              <Flex mt={2} gap={2} flexWrap="wrap">
                {previews.map((url, idx) => (
                  <Box key={idx} w="100px" h="100px" border="1px solid #ccc" borderRadius="md" overflow="hidden">
                    <Image src={url} alt={`preview-${idx}`} objectFit="cover" w="full" h="full" />
                  </Box>
                ))}
              </Flex>
            )}
          </>
        )}
      />

      {error && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error}
        </Text>
      )}

      {helperText && !error && (
        <Text fontSize="sm" color="gray.500" mt={1}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};
