import { Navigate } from "react-router-dom";

import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/pages/auth/Login";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="login" replace />
    },
    {
      path: "login",
      element: <Login />
    },
  ],
}