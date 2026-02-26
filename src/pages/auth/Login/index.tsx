import { useNavigate } from 'react-router-dom';

import { formSchema, FormSchemaType } from './formSchema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from '@/stores/authStore';
import { BaseTextInput } from '@/components/shared/atoms/BaseTextInput';
import { BaseCheckbox } from '@/components/shared/atoms/BaseCheckbox';
import { BasePasswordInput } from '@/components/shared/atoms/BasePasswordInput';
import { AppFormWrapper } from '@/components/shared/organisms/AppFormWrapper';
import UIFormField from '@/components/shared/molecules/UIFormField';
import UIFormActions from '@/components/shared/molecules/UIFormActions';
import { Send } from 'lucide-react';
import { toaster, Toaster } from '@/components/ui/toaster';
import { useLogin } from '@/hooks/api/auth';
import { sleep } from '@/utils/global.utils';

export default function Login() {
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: async (response) => {
      await toaster.create({
        title: "Login success",
        type: "success",
      });

      await sleep(2000);

      setAuth(response.data.token, response.data.user);
      navigate("/");
    },
    onError: (error: any) => {
      toaster.create({
        title: error?.response?.data?.message || "Login failed",
        type: "error",
      });
    },
  });

  const loading = loginMutation.isPending;

  const setAuth = useAuthStore((state) => state.setAuth);

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

  const onSubmit = (data: FormSchemaType) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 dark:bg-[#0a0a09] dark:border-[#0a0a09]">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Login
          </h1>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Masuk untuk melanjutkan
          </p>
        </div>

        <AppFormWrapper onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <UIFormField
            label="Email"
            isRequired
            error={errors.email?.message}
          >
            <BaseTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="e.g: usermail@mail.com"
              registration={register("email")}
            />
          </UIFormField>

          <UIFormField
            label="Password"
            isRequired
            error={errors.password?.message}
          >
            <BasePasswordInput
              label="Password"
              name="password"
              placeholder="••••••••"
              registration={register("password")}
            />
          </UIFormField>

          <UIFormField
            label=""
          >
            <BaseCheckbox<FormSchemaType>
              labelSecondary="Remember me"
              name="rememberMe"
              control={control}
            />
          </UIFormField>

          <UIFormActions
            align="left"
            actions={[
              {
                label: "Login",
                type: "submit",
                colorScheme: "blue",
                isDisabled: loading,
                isLoading: loading,
                loadingText: "Processing...",
                leftIcon: <Send />,
                onClick: handleSubmit(onSubmit),
              },
            ]}
          />
        </AppFormWrapper>
      </div>

      <Toaster />
    </>
  );
}
