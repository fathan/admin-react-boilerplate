import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { loginRequest } from "@/services/auth.service";

type LoginPayload = {
  email: string;
  password: string;
};

export function useLogin(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof loginRequest>>,
    unknown,
    LoginPayload
  >
) {
  return useMutation({
    mutationFn: loginRequest,
    ...options,
  });
}