import { Navigate } from "react-router-dom";

import CmsMedia from "@/pages/cms/Media";
import CmsMediaList from "@/pages/cms/Media/List";

export const mediasRoutes = {
  path: "media",
  element: <CmsMedia />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsMediaList />
    },
  ]
}