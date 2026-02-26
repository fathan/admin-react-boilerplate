import { Navigate } from "react-router-dom";

import CmsCategories from "@/pages/cms/Categories";
import CmsCategoriesList from "@/pages/cms/Categories/List";
import CmsCategoriesCreate from "@/pages/cms/Categories/Create";
import CmsCategoriesUpdate from "@/pages/cms/Categories/Update";
import CmsCategoriesDetail from "@/pages/cms/Categories/Detail";

export const categoriesRoutes = {
  path: "categories",
  element: <CmsCategories />,
  children: [
    { index: true,
      element: <Navigate to="list" replace />
    },
    {
      path: "list",
      element: <CmsCategoriesList />
    },
    {
      path: "create",
      element: <CmsCategoriesCreate />
    },
    {
      path: "detail/:id",
      element: <CmsCategoriesDetail />
    },
    {
      path: "update/:id",
      element: <CmsCategoriesUpdate />
    },
  ]
}