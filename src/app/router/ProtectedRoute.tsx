import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { APP_CONSTANTS } from "@/shared/config/constants";

export function ProtectedRoute() {
  const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  const location = useLocation();

  // In a real app, you would verify the token via a Zustand store here.
  // For this boilerplate, we'll just check if it exists in local storage.
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
