import { Navigate } from "react-router-dom";

import CmsVisitors from "@/pages/cms/Visitor";
import CmsVisitorsList from "@/pages/cms/Visitor/List";

export const visitorsRoutes = {
  path: "visitors",
  element: <CmsVisitors />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsVisitorsList />
    },
  ]
}