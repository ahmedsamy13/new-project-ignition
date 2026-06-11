import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ROUTES } from "@/shared/config/routes";
import { MainLayout, AuthLayout } from "@/shared/layouts";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Spinner } from "@/shared/ui";
import * as Pages from "./LazyImports";

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner fullScreen />}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  // ── Public Routes ──────────────────────────────────────────
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: (
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Sign In</h2>
                <p className="text-center text-gray-500">
                  (Auth pages not fully implemented in template)
                </p>
              </div>
            ),
          },
        ],
      },
    ],
  },
  // ── Protected Routes ───────────────────────────────────────
  {
    element: <ProtectedRoute />, // In a real app, wrap MainLayout with ProtectedRoute
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: (
              <SuspenseWrapper>
                <Pages.HomePage />
              </SuspenseWrapper>
            ),
          },
          {
            path: ROUTES.EXAMPLES,
            element: (
              <SuspenseWrapper>
                <Pages.ExampleListPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: ROUTES.EXAMPLE_DETAIL,
            element: (
              <SuspenseWrapper>
                <Pages.ExampleDetailPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
]);
