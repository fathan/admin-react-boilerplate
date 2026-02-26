import { Navigate } from "react-router-dom";

import CmsPages from "@/pages/cms/Pages";
import CmsPagesList from "@/pages/cms/Pages/List";
import CmsPagesCreate from "@/pages/cms/Pages/Create";
import CmsPagesUpdate from "@/pages/cms/Pages/Update";
import CmsPagesDetail from "@/pages/cms/Pages/Detail";

export const pagesRoutes = {
  path: "pages",
  element: <CmsPages />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsPagesList />
    },
    {
      path: "create",
      element: <CmsPagesCreate />
    },
    {
      path: "detail/:id",
      element: <CmsPagesDetail />
    },
    {
      path: "update/:id",
      element: <CmsPagesUpdate />
    },
  ]
}