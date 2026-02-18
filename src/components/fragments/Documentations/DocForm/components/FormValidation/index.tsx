import {
  Box,
  Button,
  Field,
  Heading,
  Stack,
  Text,
  Checkbox,
  Select,
  RadioGroup,
  HStack,
  Portal,
  createListCollection
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "./formSchema";

export const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
});

export const genderItems = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];


export default function FormValidation() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log("SUBMIT DATA:", data);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Success Submit");
  };

  return (
    <Box maxW="full" mx="auto" mt={10} p={6} borderWidth="1px" rounded="md">
      <Heading mb={6}>Chakra v3 RHF + Zod</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={6}>
          {/* SELECT FRAMEWORK */}
          <Field.Root invalid={!!errors.framework}>
            <Field.Label>Framework</Field.Label>

            <Controller
              name="framework"
              control={control}
              render={({ field }) => (
                <Select.Root
                  collection={frameworks}
                  value={field.value ? [field.value] : []}
                  onValueChange={(e) => field.onChange(e.value[0])}
                  size="sm"
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>

                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item
                            item={framework}
                            key={framework.value}
                          >
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />

            <Field.ErrorText>
              {errors.framework?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* RADIO GENDER */}
          <Field.Root invalid={!!errors.gender}>
            <Field.Label>Gender</Field.Label>

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                >
                  <HStack gap="6">
                    {genderItems.map((item) => (
                      <RadioGroup.Item
                        key={item.value}
                        value={item.value}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>
                          {item.label}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />

            <Field.ErrorText>
              {errors.gender?.message}
            </Field.ErrorText>
          </Field.Root>

          {/* CHECKBOX TERMS */}
          <Field.Root invalid={!!errors.agree}>
            <Controller
              name="agree"
              control={control}
              render={({ field }) => (
                <Checkbox.Root
                  checked={field.value}
                  onCheckedChange={(e) => field.onChange(!!e.checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>
                    Accept terms and conditions
                  </Checkbox.Label>
                </Checkbox.Root>
              )}
            />

            <Text color="red.500" fontSize="sm">
              {errors.agree?.message}
            </Text>
          </Field.Root>

          <Button
            type="submit"
            colorPalette="blue"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
