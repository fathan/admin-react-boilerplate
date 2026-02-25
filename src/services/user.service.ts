import { api } from "./api";
import { GetUsersParams, GetUsersResponse } from "@/types/user.types";

export const userService = {
  getUsers: (params: GetUsersParams) => {
    return api.get<GetUsersResponse>("/users", { params }).then(res => res.data);
  },
};
