import { Navigate } from "react-router-dom";

import CmsPosts from "@/pages/cms/Posts";
import CmsPostsList from "@/pages/cms/Posts/List";
import CmsPostsCreate from "@/pages/cms/Posts/Create";
import CmsPostsUpdate from "@/pages/cms/Posts/Update";
import CmsPostsDetail from "@/pages/cms/Posts/Detail";

export const postsRoutes = {
  path: "posts",
  element: <CmsPosts />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsPostsList />
    },
    {
      path: "create",
      element: <CmsPostsCreate />
    },
    {
      path: "detail/:id",
      element: <CmsPostsDetail />
    },
    {
      path: "update/:id",
      element: <CmsPostsUpdate />
    },
  ]
}