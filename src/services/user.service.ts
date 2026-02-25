import { api } from "./api";
import {
  GetUsersParams,
  GetUsersResponse,
  CreateUserPayload,
  UpdateUserPayload,
} from "@/types/user.types";

export const userService = {
  async getUsers(params: GetUsersParams): Promise<GetUsersResponse> {
    try {
      const response = await api.get<GetUsersResponse>("/users", { params });
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async createUser(payload: CreateUserPayload) {
    try {
      const response = await api.post("/users", payload);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async updateUser(id: string, payload: UpdateUserPayload) {
    try {
      const response = await api.put(`/users/${id}`, payload);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },
};