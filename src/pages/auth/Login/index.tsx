import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formSchema, FormSchemaType } from './formSchema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginRequest } from '@/services/auth.service';
import { useAuthStore } from '@/stores/authStore';
import { BaseTextInput } from '@/components/shared/atoms/BaseTextInput';
import { BaseCheckbox } from '@/components/shared/atoms/BaseCheckbox';
import { Button } from '@chakra-ui/react';
import { BasePasswordInput } from '@/components/shared/atoms/BasePasswordInput';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [loading, setLoading] = useState(false);

  const defaultValues ={
    email: "",
    password: ""
  } as unknown as FormSchemaType;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }, // isSubmitting
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);

    try {
      const response = await loginRequest({
        email: data.email,
        password: data.password,
      });

      setAuth(response.data.token, response.data.user);

      navigate('/');
    }
    catch (error: any) {
      alert(error?.response?.data?.message || 'Login failed');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 dark:bg-[#0a0a09] dark:border-[#0a0a09]">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Login
        </h1>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Masuk untuk melanjutkan
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <BaseTextInput
          label="Email"
          name="email"
          type="email"
          placeholder="e.g: usermail@mail.com"
          isRequired
          error={errors.email?.message}
          registration={register("email")}
        />

        <BasePasswordInput
          label="Password"
          name="password"
          isRequired
          error={errors.password?.message}
          registration={register("password")}
        />

        <BaseCheckbox<FormSchemaType>
          labelSecondary="Remember me"
          name="rememberMe"
          control={control}
          error={errors.rememberMe?.message}
        />

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          loadingText="Processing..."
        >
          Login
        </Button>
      </form>
    </div>
  );
}
