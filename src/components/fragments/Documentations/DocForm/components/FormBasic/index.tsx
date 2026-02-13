import {
  HStack,
  Box,
  Button,
  Checkbox,
  Field,
  Heading,
  Input,
  RadioGroup,
  Portal, Select, createListCollection,
  Stack,
  Switch,
  Textarea,
  Slider,
  FileUpload
} from "@chakra-ui/react";
import { useState } from "react";
import { HiUpload } from "react-icons/hi";

type FormData = {
  name: string;
  email: string;
  password: string;
  age: number;
  birthDate: string;
  time: string;
  description: string;
  gender: string;
  country: string;
  agree: boolean;
  isActive: boolean;
  volume: number;
  file: File | null;
};

export default function FormBasic() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: 0,
    birthDate: "",
    time: "",
    description: "",
    gender: "male",
    country: "",
    agree: false,
    isActive: false,
    volume: 50,
    file: null,
  });

  const handleChange = (key: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Check console");
  };

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  const items = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <>
      <Box maxW="full" mx="auto" mt={10} p={6} borderWidth="1px" rounded="md">
        <Heading mb={6}>Form Basic</Heading>

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            {/* TEXT */}
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Field.Root>

            {/* EMAIL */}
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Field.Root>

            {/* PASSWORD */}
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Field.Root>

            {/* NUMBER */}
            <Field.Root>
              <Field.Label>Age</Field.Label>
              <Input
                type="number"
                value={form.age}
                onChange={(e) =>
                  handleChange("age", Number(e.target.value))
                }
              />
            </Field.Root>

            {/* DATE */}
            <Field.Root>
              <Field.Label>Birth Date</Field.Label>
              <Input
                type="date"
                onChange={(e) => handleChange("birthDate", e.target.value)}
              />
            </Field.Root>

            {/* TIME */}
            <Field.Root>
              <Field.Label>Time</Field.Label>
              <Input
                type="time"
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </Field.Root>

            {/* TEXTAREA */}
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
              />
            </Field.Root>

            {/* SELECT */}
            <Field.Root>
              <Field.Label>Country</Field.Label>
              <Select.Root collection={frameworks} size="sm" width="320px">
                <Select.HiddenSelect />
                <Select.Label>Select framework</Select.Label>
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
                        <Select.Item item={framework} key={framework.value}>
                          {framework.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>

            {/* RADIO */}
            <Field.Root>
              <Field.Label>Gender</Field.Label>
              <RadioGroup.Root defaultValue="1">
                <HStack gap="6">
                  {items.map((item) => (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            </Field.Root>

            {/* CHECKBOX */}
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
            </Checkbox.Root>

            {/* SWITCH */}
            <Field.Root orientation="horizontal">
              <Field.Label>Active</Field.Label>
              <Switch.Root>
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label />
              </Switch.Root>
            </Field.Root>

            {/* SLIDER */}
            <Field.Root>
              <Field.Label>Volume: {form.volume}</Field.Label>
              <Slider.Root width="200px" defaultValue={[40]}>
                <Slider.Label />
                <Slider.ValueText />
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb>
                    <Slider.DraggingIndicator />
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                  <Slider.MarkerGroup>
                    <Slider.Marker value={20} />
                  </Slider.MarkerGroup>
                </Slider.Control>
              </Slider.Root>
            </Field.Root>

            {/* FILE */}
            <FileUpload.Root>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>

            <Button type="submit" colorPalette="blue">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
