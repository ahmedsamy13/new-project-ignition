// ─── Route Path Constants ───────────────────────────────────────────
// Single source of truth for all route paths.
// Used in router config AND in <Link to={ROUTES.HOME}> throughout the app.

export const ROUTES = {
  // ── Public ──
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // ── Protected ──
  HOME: "/",
  DASHBOARD: "/dashboard",

  // ── Example Feature ──
  EXAMPLES: "/examples",
  EXAMPLE_DETAIL: "/examples/:id",

  // ── Catch-all ──
  NOT_FOUND: "*",
} as const;

/**
 * Helper to build dynamic routes with params.
 * Usage: buildRoute(ROUTES.EXAMPLE_DETAIL, { id: "123" }) → "/examples/123"
 */
export function buildRoute(
  template: string,
  params: Record<string, string>
): string {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    template
  );
}
