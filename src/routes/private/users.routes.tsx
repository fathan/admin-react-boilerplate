import { Navigate } from "react-router-dom";
import CmsUsers from "@/pages/cms/Users";
import CmsUsersList from "@/pages/cms/Users/List";
import CmsUsersCreate from "@/pages/cms/Users/Create";
import CmsUsersUpdate from "@/pages/cms/Users/Update";
import CmsUsersDetail from "@/pages/cms/Users/Detail";

export const usersRoutes = {
  path: "users",
  element: <CmsUsers />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsUsersList />
    },
    {
      path: "create",
      element: <CmsUsersCreate />
    },
    {
      path: "detail/:id",
      element: <CmsUsersDetail />
    },
    {
      path: "update/:id",
      element: <CmsUsersUpdate />
    },
  ]
}