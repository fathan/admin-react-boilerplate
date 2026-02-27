import { Navigate } from "react-router-dom";

import CmsComments from "@/pages/cms/Comments";
import CmsCommentsList from "@/pages/cms/Comments/List";

export const commentsRoutes = {
  path: "comments",
  element: <CmsComments />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsCommentsList />
    },
  ]
}