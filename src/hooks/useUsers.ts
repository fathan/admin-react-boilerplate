import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ServerSideParams } from "@/types/datatable.types";
import { userService } from "@/services/user.service";
import { toGetUsersParams } from "@/types/user.types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const userKeys = {
  all: ["users"] as const,
  list: (params: ServerSideParams) => [...userKeys.all, "list", params] as const,
};

// ─── useUsers ─────────────────────────────────────────────────────────────────

export function useUsers(params: ServerSideParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getUsers(toGetUsersParams(params)),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
}