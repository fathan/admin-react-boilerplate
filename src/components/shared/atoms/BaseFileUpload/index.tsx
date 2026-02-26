import React, { useState } from "react";
import { Box, Input, Flex, Image } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

interface BaseFileUploadProps {
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

export const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  name,
  control,
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
    <>
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
    </>
  );
};
