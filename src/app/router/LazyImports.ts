import { lazy } from "react";

// Home
export const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage }))
);

// Example Feature
export const ExampleListPage = lazy(() =>
  import("@/pages/example-feature").then((m) => ({ default: m.ExampleListPage }))
);
export const ExampleDetailPage = lazy(() =>
  import("@/pages/example-feature").then((m) => ({ default: m.ExampleDetailPage }))
);
