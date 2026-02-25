import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./useUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // invalidate semua query users
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
}