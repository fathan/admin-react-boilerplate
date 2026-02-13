import { api } from "./api";

export const loginRequest = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/cms/authentication/login", payload);
  return data;
};

export const logoutRequest = async () => {
  const { data } = await api.post("/cms/logout");
  return data;
};