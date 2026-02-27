import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
      });
    }

    const { status, data } = error.response;

    if (status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject({
      message: data?.message || "Something went wrong",
      status,
      errors: data?.errors || null,
    });
  }
);