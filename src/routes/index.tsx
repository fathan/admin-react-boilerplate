import { createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import PageNotFound from "@/components/layouts/PageNotFound";

export const router = createBrowserRouter([
  publicRoutes,
  privateRoutes,
  {
    path: "*",
    element: <PageNotFound />
  }
]);