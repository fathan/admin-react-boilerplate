import { ServerSideParams } from "@/types/datatable.types";

export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  list: (params: ServerSideParams) =>
    [...userKeys.lists(), params] as const,

  details: () => [...userKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...userKeys.details(), id] as const,
};