import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { ServerSideParams } from "@/types/datatable.types";
import { toGetUsersParams } from "@/types/user.types";
import { userKeys } from "./keys";

// ─── useUsers (List) ───────────────────────────────

export function useUsers(params: ServerSideParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () =>
      userService.getUsers(toGetUsersParams(params)),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
}

// ─── useUserDetail ───────────────────────────────

export function useUserDetail(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}