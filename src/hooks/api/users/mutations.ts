import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { userKeys } from "./keys";
import { UpdateUserPayload } from "@/types/user.types";
import { toaster } from "@/components/ui/toaster";

// ─── Create ───────────────────────────────

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
    onError: () => {
      toaster.create({
        title: "Create data failed",
        type: "error",
      });
    },
  });
}

// ─── Update ───────────────────────────────

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserPayload;
    }) => userService.updateUser(id, payload),

    onSuccess: (_, variables) => {
      // invalidate list
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      // update detail cache directly (lebih optimal)
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
    },
  });
}

// ─── Delete ───────────────────────────────

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });
}