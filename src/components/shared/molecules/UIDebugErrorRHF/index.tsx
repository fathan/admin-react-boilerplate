import { Box, Text } from "@chakra-ui/react";
import { FieldErrors, FieldValues } from "react-hook-form";

type UIDebugErrorRHFProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
};

function UIDebugErrorRHF<T extends FieldValues>({
  errors,
}: UIDebugErrorRHFProps<T>) {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <Box mt={4} p={4} bg="red.50" borderRadius="md">
      <Text fontWeight="bold" color="red.700">
        Error Details:
      </Text>

      {Object.entries(errors).map(([key, value]) => (
        <Text key={key} color="red.600">
          {key}: {value?.message as string}
        </Text>
      ))}
    </Box>
  );
}

export default UIDebugErrorRHF;
