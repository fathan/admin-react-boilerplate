import { Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

import { formSchema, FormSchemaType } from "./formSchema";

import { BaseTextInput } from "@/components/shared/atoms/BaseTextInput";
import { BaseCheckbox } from "@/components/shared/atoms/BaseCheckbox";
import { BaseSwitchInput } from "@/components/shared/atoms/BaseSwitchInput";
import { BaseTextArea } from "@/components/shared/atoms/BaseTextarea";
import { BaseRadioGroup } from "@/components/shared/atoms/BaseRadioGroup";
import { BaseSelectInput } from "@/components/shared/atoms/BaseSelectInput";
import { BaseDatePicker } from "@/components/shared/atoms/BaseDatePicker";
import { BaseAsyncSelect } from "@/components/shared/atoms/BaseAsyncSelect";
import { BaseFileUpload } from "@/components/shared/atoms/BaseFileUpload";
import { BaseNumberInput } from "@/components/shared/atoms/BaseNumberInput";
import { CheckboxCardField } from "@/components/shared/molecules/UICheckboxCardField";

export default function DocFormValidation() {
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
    birthdate: "",
    user: [],
    age: "13",
    plan: "",
    features: []
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
  };

  /* ================= UI ================= */

  return (
    <Box maxW="full" mx="auto" mt={10}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* TEXT INPUTS */}
          <BaseTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Your Name"
            isRequired
            error={errors.name?.message}
            registration={register("name")}
          />

          <BaseTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="email@mail.com"
            isRequired
            error={errors.email?.message}
            registration={register("email")}
          />

          <BaseTextInput
            label="Password"
            name="password"
            type="password"
            isRequired
            error={errors.password?.message}
            registration={register("password")}
          />

          {/* CHECKBOX */}
          <BaseCheckbox<FormSchemaType>
            label="Accept Terms"
            labelSecondary="Yes"
            name="isAgree"
            control={control}
            error={errors.isAgree?.message}
          />
          
          {/* CHECKBOX CARD */}
          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* ===== SINGLE SELECT ===== */}
              <CheckboxCardField<FormSchemaType>
                name="plan"
                control={control}
                value="starter"
                label="Starter Plan"
                description="Basic features"
              />

              <CheckboxCardField<FormSchemaType>
                name="plan"
                control={control}
                value="pro"
                label="Pro Plan"
                description="Best for professionals"
              />

              {/* ===== MULTI SELECT ===== */}
              <CheckboxCardField<FormSchemaType>
                name="features"
                control={control}
                value="analytics"
                label="Analytics"
                description="Advanced analytics features"
              />

              <CheckboxCardField<FormSchemaType>
                name="features"
                control={control}
                value="priority-support"
                label="Priority Support"
                description="Get priority customer support"
              />
            </div>
          </div>

          {/* SWITCH */}
          <BaseSwitchInput<FormSchemaType>
            label="Active Status"
            name="isActive"
            control={control}
            error={errors.isActive?.message}
            helperText="Aktifkan jika user boleh login"
          />

          {/* TEXT AREA */}
          <div className="col-span-2">
            <BaseTextArea
              label="Description"
              name="description"
              placeholder="Deskripsi user (opsional)"
              error={errors.description?.message}
              registration={register("description")}
            />
          </div>

          {/* RADIO */}
          <BaseRadioGroup
            label="Gender"
            name="gender"
            control={control}
            options={genderOptions}
            error={errors.gender?.message}
          />

          {/* SELECT */}
          <BaseSelectInput
            label="Role"
            name="role"
            control={control}
            options={roleOptions}
            error={errors.role?.message}
          />

          {/* DATEPICKER */}
          <BaseDatePicker
            name="birthdate"
            control={control}
            label="Tanggal Lahir"
            error={errors.birthdate?.message}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
          />

          {/* USER */}
          <BaseAsyncSelect
            name="user"
            control={control}
            label="Pilih User"
            loadOptionsUrl="https://jsonplaceholder.typicode.com/users"
            multiple
            labelField={(item) => `${item.name} (${item.email})`} // bisa gabung field
            valueField="id" // pakai id sebagai value
            placeholder="Cari user..."
            error={errors.user?.message}
          />

          {/* NUMBER */}
          <BaseNumberInput
            label="Age"
            name="age"
            error={errors.age?.message}
            registration={register("age")}
          />

          {/* FILE UPLOAD */}
          <BaseFileUpload
            name="avatar"
            control={control}
            label="Upload Dokumen"
            isRequired
            multiple
            accept="image/*,application/pdf"
            helperText="Maks. 3 file — JPG, PNG atau PDF"
            error={errors.avatar?.message}
          />


          {/* SUBMIT */}
          <Button
            type="submit"
            colorPalette="blue"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}
