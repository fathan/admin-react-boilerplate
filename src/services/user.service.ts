import { api } from "./api";

export const getUsers = async () => {
  const { data } = await api.get("/cms/users");
  return data;
};
