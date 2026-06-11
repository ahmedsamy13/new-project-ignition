import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { APP_CONSTANTS } from "@/shared/config/constants";

export function PublicRoute() {
  const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
