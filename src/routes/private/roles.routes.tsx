import { Navigate } from "react-router-dom";

import CmsRoles from "@/pages/cms/Roles";
import CmsRolesList from "@/pages/cms/Roles/List";

export const rolesRoutes = {
  path: "roles",
  element: <CmsRoles />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsRolesList />
    },
  ]
}