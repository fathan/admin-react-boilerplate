import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./useUsers";
import { UpdateUserPayload } from "@/types/user.types";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: {
      id: string;
      payload: UpdateUserPayload
    }) => userService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
}