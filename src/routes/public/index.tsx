import GuestRoute from "../guards/GuestRoute";
import { authRoutes } from "./auth.routes";

export const publicRoutes = {
  element: <GuestRoute />,
  children: [
    authRoutes
  ],
}