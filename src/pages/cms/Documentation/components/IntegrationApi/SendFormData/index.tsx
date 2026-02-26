import { Button } from "@chakra-ui/react";

import { formSchema, FormSchemaType } from "./formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/hooks/users/useCreateUser";

const DocIntegrationApiSendFormData = () => {
  const { mutate } = useCreateUser();

  const defaultValues: FormSchemaType = {
    name: "Fathan Rohman",
    email: "karir.fathan@gmail.com",
    password: "123123123",
    role: "admin",
  }
  
  const {
    register,
    // control,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="hidden" />
      <input {...register("email")} type="hidden" />
      <input {...register("password")} type="hidden" />
      <input {...register("role")} type="hidden" />

      <Button type="submit">
        Send Form Data
      </Button>
    </form>
  );
}

export default DocIntegrationApiSendFormData;
