import { Navigate } from "react-router-dom";

import CmsTags from "@/pages/cms/Tags";
import CmsTagsList from "@/pages/cms/Tags/List";

export const tagsRoutes = {
  path: "tags",
  element: <CmsTags />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsTagsList />
    },
  ]
}