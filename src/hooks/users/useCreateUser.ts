import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./useUsers";
import { toaster } from "@/components/ui/toaster";

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
      toaster.create({
        title: 'Create data failed',
        type: 'error'
      })
    },
  });
}