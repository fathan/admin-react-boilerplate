import { Navigate } from "react-router-dom";

import CmsMenus from "@/pages/cms/Menus";
import CmsMenusList from "@/pages/cms/Menus/List";

export const menusRoutes = {
  path: "menus",
  element: <CmsMenus />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsMenusList />
    },
  ]
}