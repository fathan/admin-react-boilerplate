import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BaseTextInput } from "@/components/shared/atoms/BaseTextInput";
import { formSchema, FormSchemaType } from "./formSchema";
import { Box, Button } from "@chakra-ui/react";
import { BaseCheckbox } from "@/components/shared/atoms/BaseCheckbox";

const DocFormBasic = () => {
  // const genderOptions = useMemo(
  //   () => [
  //     { label: "Male", value: "male" },
  //     { label: "Female", value: "female" },
  //   ],
  //   []
  // );

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    age: 0,
    birthDate: "",
    time: "",
    description: "",
    gender: "",
    country: "",
    agree: false,
    isActive: false,
    volume: 0,
    file: null,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log("DATA:", data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <BaseTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Your Name"
            registration={register("name")}
          />
        </div>

        <div>
          <BaseTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Your Email"
            registration={register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <BaseTextInput
            label="Password"
            name="password"
            type="password"
            registration={register("password")}
          />
        </div>

        <div>
          <BaseCheckbox<FormSchemaType>
            label="Accept Terms"
            labelSecondary="Yes"
            name="agree"
            control={control}
          />
        </div>
      </div>

      <Button
        type="submit"
        colorPalette="blue"
        loading={isSubmitting}
      >
        Submit
      </Button>
    </Box>
  )
};

export default DocFormBasic;
