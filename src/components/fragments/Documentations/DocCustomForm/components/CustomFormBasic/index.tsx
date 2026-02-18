import { Box, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

import { formSchema, FormSchemaType } from "./formSchema";

import {
  FormCheckboxInput,
  FormTextInput,
} from "../../../../../shared/atoms/form";
import { FormSwitchInput } from "../../../../../shared/atoms/form/FormSwitchInput";
import { FormTextArea } from "../../../../../shared/atoms/form/FormTextarea";
import { FormRadioGroup } from "../../../../../shared/atoms/form/FormRadioGroup";
import { FormSelectInput } from "../../../../../shared/atoms/form/FormSelectInput";

export default function CustomFormBasic() {
  /* ================= OPTIONS ================= */

  const genderOptions = useMemo(
    () => [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    []
  );

  const roleOptions = useMemo(
    () => [
      { label: "Super Admin", value: "super-admin" },
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Guest", value: "guest" },
    ],
    []
  );

  const defaultValues ={
    name: "",
    email: "",
    password: "",
    isAgree: false,
    isActive: true,
    description: "",
    gender: "",
    role: null,
  } as unknown as FormSchemaType;

  /* ================= FORM ================= */

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: FormSchemaType) => {
    console.log("DATA:", data);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Form Success");
  };

  /* ================= UI ================= */

  return (
    <Box maxW="full" mx="auto" mt={10}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap={4}>
          {/* TEXT INPUTS */}
          <FormTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Your Name"
            isRequired
            error={errors.name?.message}
            registration={register("name")}
          />

          <FormTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="email@mail.com"
            isRequired
            error={errors.email?.message}
            registration={register("email")}
          />

          <FormTextInput
            label="Password"
            name="password"
            type="password"
            isRequired
            error={errors.password?.message}
            registration={register("password")}
          />

          {/* CHECKBOX */}
          <FormCheckboxInput<FormSchemaType>
            label="Accept Terms"
            name="isAgree"
            control={control}
            error={errors.isAgree?.message}
          />

          {/* SWITCH */}
          <FormSwitchInput<FormSchemaType>
            label="Active Status"
            name="isActive"
            control={control}
            error={errors.isActive?.message}
            helperText="Aktifkan jika user boleh login"
          />

          {/* TEXT AREA */}
          <FormTextArea
            label="Description"
            name="description"
            placeholder="Deskripsi user (opsional)"
            error={errors.description?.message}
            registration={register("description")}
          />

          {/* RADIO */}
          <FormRadioGroup
            label="Gender"
            name="gender"
            control={control}
            options={genderOptions}
            error={errors.gender?.message}
          />

          {/* SELECT */}
          <FormSelectInput
            label="Role"
            name="role"
            control={control}
            options={roleOptions}
            error={errors.role?.message}
          />

          {/* SUBMIT */}
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
