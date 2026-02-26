import { objectToFormData } from "@/utils/global.utils";
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
      const response = await api.get<GetUsersResponse>("/cms/users", { params });
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async createUser(payload: CreateUserPayload) {
    try {
      const response = await api.post("/cms/users", payload);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async createUserFormData(payload: CreateUserPayload) {
    try {
      const bodyData = objectToFormData(payload);

      const response = await api.post(
        "/cms/users",
        bodyData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async updateUser(id: string, payload: UpdateUserPayload) {
    try {
      const response = await api.put(`/cms/users/${id}`, payload);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const response = await api.delete(`/cms/users/${id}`);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },
};