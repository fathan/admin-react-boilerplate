import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";

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
import UIRadioCardGroupField from "@/components/shared/molecules/UIRadioCardGroupField";
import { AppFormWrapper } from "@/components/shared/organisms/AppFormWrapper";
import UIFormField from "@/components/shared/molecules/UIFormField";
import UIFormActions from "@/components/shared/molecules/UIFormActions";
import UIDebugErrorRHF from "@/components/shared/molecules/UIDebugErrorRHF";

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

  // //////////////////////////////////////

  const billingItems = [
    {
      value: "monthly",
      label: "Bulanan",
      description: "Bayar tiap bulan",
      icon: <span>📅</span>,
    },
    {
      value: "yearly",
      label: "Tahunan",
      description: "Hemat 20%",
      icon: <span>🎁</span>,
    },
  ];

  const regionItems = [
    { value: "us-east", label: "US East", description: "Virginia, USA" },
    { value: "eu-west", label: "EU West", description: "Frankfurt, DE" },
    { value: "ap-southeast", label: "AP Southeast", description: "Singapore" },
  ];

  // //////////////////////////////////////

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
    features: [],
    billing: undefined,
    region: undefined,
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
      <AppFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* TEXT INPUTS */}
          <UIFormField
            label="Nama"
            error={errors.name?.message}
            isRequired
          >
            <BaseTextInput
              name="name"
              type="text"
              placeholder="Your Name"
              isRequired
              registration={register("name")}
            />
          </UIFormField>

          {/* EMAIL INPUTS */}
          <UIFormField
            label="Email"
            error={errors.email?.message}
            isRequired
          >
            <BaseTextInput
              name="email"
              type="email"
              placeholder="email@mail.com"
              isRequired
              registration={register("email")}
            />
          </UIFormField>

          {/* PASSWORD INPUTS */}
          <UIFormField
            label="Password"
            error={errors.password?.message}
            isRequired
          >
            <BaseTextInput
              name="password"
              type="password"
              isRequired
              registration={register("password")}
            />
          </UIFormField>

          {/* CHECKBOX */}
          <UIFormField
            label="Aggree"
            error={errors.isAgree?.message}
            isRequired
          >
            <BaseCheckbox<FormSchemaType>
              labelSecondary="Yes"
              name="isAgree"
              control={control}
            />
          </UIFormField>
          
          {/* CHECKBOX CARD */}
          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* ===== SINGLE SELECT ===== */}
              <UIFormField
                label="Plan"
                error={errors.plan?.message}
                isRequired
              >
                <CheckboxCardField<FormSchemaType>
                  name="plan"
                  control={control}
                  value="starter"
                  label="Starter Plan"
                  description="Basic features"
                  error={errors.plan?.message}
                />

                <CheckboxCardField<FormSchemaType>
                  name="plan"
                  control={control}
                  value="pro"
                  label="Pro Plan"
                  description="Best for professionals"
                  error={errors.plan?.message}
                />
              </UIFormField>

              {/* ===== MULTI SELECT ===== */}
              <UIFormField
                label="Features"
                error={errors.features?.message}
                isRequired
              >
                <CheckboxCardField<FormSchemaType>
                  name="features"
                  control={control}
                  value="analytics"
                  label="Analytics"
                  description="Advanced analytics features"
                  error={errors.features?.message}
                />

                <CheckboxCardField<FormSchemaType>
                  name="features"
                  control={control}
                  value="priority-support"
                  label="Priority Support"
                  description="Get priority customer support"
                  error={errors.features?.message}
                />
              </UIFormField>
            </div>
          </div>

          {/* SWITCH */}
          <UIFormField
            label="Status"
            error={errors.isActive?.message}
            isRequired
            helperText="Aktifkan jika user boleh login"
          >
            <BaseSwitchInput<FormSchemaType>
              name="isActive"
              control={control}
            />
          </UIFormField>

          {/* TEXT AREA */}
          <div className="col-span-2">
            <UIFormField
              label="Description"
              error={errors.description?.message}
              isRequired
            >
              <BaseTextArea
                name="description"
                placeholder="Deskripsi user (opsional)"
                registration={register("description")}
              />
            </UIFormField>
          </div>

          {/* RADIO */}
          <UIFormField
            label="Gender"
            error={errors.gender?.message}
            isRequired
          >
            <BaseRadioGroup
              name="gender"
              control={control}
              options={genderOptions}
              error={errors.gender?.message}
            />
          </UIFormField>

          {/* RADIO CARD */}
          <div className="col-span-3">
            <UIFormField
              label="Billing"
              error={errors.billing?.message}
              isRequired
            >
              <UIRadioCardGroupField<FormSchemaType>
                name="billing"
                control={control}
                required
                items={billingItems}
                orientation="horizontal"
                colorPalette="blue"
                variant="subtle"
                error={errors.gender?.message}
              />
            </UIFormField>
          </div>

          <div className="col-span-3">
            <UIFormField
              label="Region"
              error={errors.region?.message}
              isRequired
            >
              <UIRadioCardGroupField<FormSchemaType>
                name="region"
                control={control}
                helperText="Pilih region terdekat untuk latensi optimal"
                required
                items={regionItems}
                orientation="horizontal"
                colorPalette="blue"
                variant="surface"
                error={errors.region?.message}
              />
            </UIFormField>
          </div>

          {/* SELECT */}
          <UIFormField
            label="Role"
            error={errors.role?.message}
            isRequired
          >
            <BaseSelectInput
              label="Role"
              name="role"
              control={control}
              options={roleOptions}
            />
          </UIFormField>

          {/* DATEPICKER */}
          <UIFormField
            label="Birthdate"
            error={errors.birthdate?.message}
            isRequired
          >
            <BaseDatePicker
              name="birthdate"
              control={control}
              minDate={new Date(1900, 0, 1)}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              error={errors.birthdate?.message}
            />
          </UIFormField>

          {/* USER */}
          <UIFormField
            label="User"
            error={errors.user?.message}
            isRequired
          >
            <BaseAsyncSelect
              name="user"
              control={control}
              loadOptionsUrl="https://jsonplaceholder.typicode.com/users"
              multiple
              labelField={(item) => `${item.name} (${item.email})`}
              valueField="id"
              placeholder="Cari user..."
              error={errors.birthdate?.message}
            />
          </UIFormField>
          

          {/* NUMBER */}
          <UIFormField
            label="Age"
            error={errors.age?.message}
            isRequired
          >
            <BaseNumberInput
              name="age"
              registration={register("age")}
            />
          </UIFormField>

          {/* FILE UPLOAD */}
          <UIFormField
            label="Upload Dokumen"
            helperText="Maks. 3 file — JPG, PNG atau PDF"
            error={errors.avatar?.message}
            isRequired
          >
            <BaseFileUpload
              name="avatar"
              control={control}
              isRequired
              multiple
              accept="image/*,application/pdf"
            />
          </UIFormField>
        </div>

        <UIFormActions
          align="left"
          actions={[
            {
              label: "Cancel",
              variant: "ghost",
              colorScheme: "gray",
              onClick: () => alert("Dibatalkan"),
            },
            {
              label: "Submit",
              type: "submit",
              colorScheme: "blue",
              isLoading: isSubmitting,
              loadingText: "Menyimpan...",
              leftIcon: <CheckIcon />,
              onClick: handleSubmit(onSubmit),
            },
          ]}
        />
      </AppFormWrapper>

      <UIDebugErrorRHF errors={errors} />
    </Box>
  );
}
