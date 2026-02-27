import { Navigate } from "react-router-dom";

import CmsLayout from "@/components/layouts/CmsLayout";
import GuestRoute from "../guards/GuestRoute";
// import ProtectedRoute from "../guards/ProtectedRoute";

import { dashboardRoutes } from "./dashboard.routes";
import { documentationRoutes } from "./documentation.routes";
import { usersRoutes } from "./users.routes";
import { postsRoutes } from "./posts.routes";
import { pagesRoutes } from "./pages.routes";
import { rolesRoutes } from "./roles.routes";

export const privateRoutes = {
  element: <GuestRoute />,
  children: [
    {
      path: "/",
      element: <CmsLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />
        },
        dashboardRoutes,
        documentationRoutes,
        usersRoutes,
        postsRoutes,
        pagesRoutes,
        rolesRoutes
      ]
    }
  ]
}