# ARCHITECTURE.md — Universal React Boilerplate

> This document answers two questions: _Why does this structure scale?_ and _Where do I put things?_

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Directory Tree](#2-directory-tree)
3. [Layer Responsibilities](#3-layer-responsibilities)
4. [Enterprise Concerns — Where They Live](#4-enterprise-concerns--where-they-live)
5. [Dependency Flow Rule](#5-dependency-flow-rule)
6. [Workflow Rules (Team Contract)](#6-workflow-rules-team-contract)
7. [Naming Conventions](#7-naming-conventions)
8. [Core Configuration Files](#8-core-configuration-files)
9. [Adding a New Feature (Step-by-Step)](#9-adding-a-new-feature-step-by-step)

---

## 1. Philosophy

This boilerplate follows **Feature-Sliced Design (FSD)**. Think of FSD like a **Restaurant**:

1. **`shared/` (The Ingredients & Tools)**: Flour, tomatoes, salt, ovens. Basic UI buttons, fetch functions, pure utilities. They don't know what dish they will become.
2. **`features/` (The Recipes/Dishes)**: Pizza, Pasta, Burger. Here you combine ingredients to make a complete, working business logic slice (like an `ExampleList` with its own API calls and state). A Pizza doesn't need to know how a Burger is made.
3. **`widgets/` (Combo Meals)**: A meal deal that includes a Burger, Fries, and a Drink. Combining multiple features into one larger UI block (like a Header with User Profile + Notifications).
4. **`pages/` (The Menu)**: The physical menu handed to the customer. It just places the dishes (features) on specific routes/URLs.
5. **`app/` (The Restaurant Building)**: The electricity, plumbing, and front door. This is where global providers (Dark Mode, React Query, Routing) wrap everything together.

### The Golden Rule of FSD (Dependency Flow)

**Code can only import from layers BELOW it. Never above it, and never sideways (feature to feature).**

- ✅ `pages/` can import from `features/` and `shared/`.
- ✅ `features/` can import from `shared/`.
- ❌ `features/` MUST NEVER import from `pages/` or `app/`.
- ❌ `features/pizza` MUST NEVER import from `features/burger`. (If they share something, it goes in `shared/`).

```text
┌─────────────────────────────────────┐
│              app/                    │  ← Building (Providers, Router)
├─────────────────────────────────────┤
│             pages/                   │  ← Menu (Route URL Compositions)
├─────────────────────────────────────┤
│           widgets/                   │  ← Combo Meals (Cross-feature UI)
├─────────────────────────────────────┤
│           features/                  │  ← Recipes (Self-contained domains)
├─────────────────────────────────────┤
│            shared/                   │  ← Ingredients (UI kit, lib, utils)
└─────────────────────────────────────┘
         ▲ Dependencies flow DOWN only
```

---

## 2. Directory Tree

```
├── .github/                                # GitHub Actions (Automated CI checks)
├── .storybook/                             # Storybook configuration files
├── src/
│   ├── app/                                    # Application wiring layer
│   │   ├── App.tsx                             # Root component
│   │   ├── main.tsx                            # Vite entry point
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx                # Composed provider tree
│   │   │   ├── ThemeProvider.tsx               # Dark mode state provider (next-themes)
│   │   │   ├── QueryProvider.tsx               # React Query client + config
│   │   │   ├── ErrorBoundaryProvider.tsx        # Global error boundary
│   │   │   └── index.ts
│   ├── router/
│   │   ├── routes.tsx                      # All route definitions
│   │   ├── ProtectedRoute.tsx              # Auth guard wrapper
│   │   ├── PublicRoute.tsx                 # Redirect-if-authenticated wrapper
│   │   ├── LazyImports.ts                  # Centralized React.lazy() calls
│   │   └── index.ts
│   └── styles/
│       ├── index.css                       # Tailwind directives + global styles
│       └── fonts.css                       # @font-face declarations
│
├── pages/                                  # Route-level page compositions
│   ├── home/
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── index.ts
│   └── example-feature/                    # Mirrors feature name
│       ├── ExampleListPage.tsx
│       ├── ExampleDetailPage.tsx
│       └── index.ts
│
├── widgets/                                # Composite cross-feature UI blocks
│   ├── header/
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── sidebar/
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   └── data-table/
│       ├── DataTable.tsx
│       ├── DataTableToolbar.tsx
│       └── index.ts
│
├── features/                               # Self-contained business domains
│   │
│   └── example-feature/                    # ◀ FULLY DEMONSTRATED FEATURE
│       ├── index.ts                        # PUBLIC API — barrel export (only gate out)
│       │
│       ├── api/                            # Raw HTTP calls (Axios)
│       │   ├── exampleApi.ts               # CRUD functions using shared apiClient
│       │   └── exampleApi.test.ts           # API layer unit tests
│       │
│       ├── hooks/                          # React Query hooks + custom logic hooks
│       │   ├── useExamples.ts              # useQuery wrapper → list
│       │   ├── useExample.ts               # useQuery wrapper → single item
│       │   ├── useCreateExample.ts         # useMutation wrapper → create
│       │   ├── useUpdateExample.ts         # useMutation wrapper → update
│       │   ├── useDeleteExample.ts         # useMutation wrapper → delete
│       │   ├── useExampleFilters.ts        # UI-only logic hook (no server state)
│       │   ├── index.ts                    # Barrel for hooks
│       │   └── __tests__/
│       │       ├── useExamples.test.ts
│       │       └── useCreateExample.test.ts
│       │
│       ├── components/                     # Feature-specific UI components
│       │   ├── ExampleCard.tsx
│       │   ├── ExampleForm.tsx
│       │   ├── ExampleList.tsx
│       │   ├── ExampleFilters.tsx
│       │   ├── ExampleErrorBoundary.tsx    # Feature-level error boundary
│       │   └── __tests__/
│       │       ├── ExampleCard.test.tsx
│       │       └── ExampleForm.test.tsx
│       │
│       ├── store/                          # Client-side state (Zustand)
│       │   ├── exampleStore.ts             # Zustand slice
│       │   └── exampleStore.test.ts
│       │
│       ├── types/                          # Feature-scoped TypeScript types
│       │   ├── index.ts                    # All types exported from here
│       │   └── example.types.ts            # Domain models, DTOs, enums
│       │
│       └── utils/                          # Pure helper functions
│           ├── exampleTransformers.ts      # Data transformation logic
│           ├── exampleValidation.ts        # Form/business validation
│           └── __tests__/
│               └── exampleTransformers.test.ts
│
├── shared/                                 # Foundation layer — zero business logic
│   ├── ui/                                 # Generic, reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Spinner/
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   ├── ErrorFallback/
│   │   │   ├── ErrorFallback.tsx           # Generic error UI for boundaries
│   │   │   └── index.ts
│   │   └── index.ts                        # Barrel: all shared UI
│   │
│   ├── layouts/                            # Page layout shells
│   │   ├── MainLayout.tsx                  # Authenticated app shell
│   │   ├── AuthLayout.tsx                  # Login/Register layout
│   │   ├── MinimalLayout.tsx               # No chrome (error pages, onboarding)
│   │   └── index.ts
│   │
│   ├── lib/                                # Third-party library configs
│   │   ├── axios.ts                        # Axios instance + interceptors
│   │   ├── queryClient.ts                  # React Query client factory
│   │   ├── dayjs.ts                        # Day.js with plugins
│   │   └── index.ts
│   │
│   ├── config/                             # Application configuration
│   │   ├── env.ts                          # Env variable validation (Zod)
│   │   ├── constants.ts                    # App-wide magic values
│   │   ├── routes.ts                       # Route path constants
│   │   └── index.ts
│   │
│   ├── hooks/                              # Generic reusable hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useOnClickOutside.ts
│   │   └── index.ts
│   │
│   ├── utils/                              # Pure utility functions
│   │   ├── cn.ts                           # clsx + twMerge helper
│   │   ├── formatters.ts                   # Date, currency, number formatters
│   │   ├── validators.ts                   # Generic validation helpers
│   │   └── index.ts
│   │
│   └── types/                              # Global TypeScript types
│       ├── api.types.ts                    # ApiResponse<T>, PaginatedResponse<T>
│       ├── common.types.ts                 # ID, Timestamps, BaseEntity
│       └── index.ts
│
├── test/                                   # Test infrastructure
│   ├── setup.ts                            # Vitest global setup
│   ├── mocks/
│   │   ├── handlers.ts                     # MSW request handlers
│   │   └── server.ts                       # MSW server instance
│   └── utils/
│       ├── renderWithProviders.tsx          # Custom render with all providers
│       └── testQueryClient.ts              # Isolated QueryClient for tests
│
├── env.d.ts                                # ImportMeta env type declarations
└── vite-env.d.ts                           # Vite client types
```

---

## 3. Layer Responsibilities

### `app/` — Application Wiring (The Building)

This is the **bootstrap layer**. It wires everything together but contains **zero business logic**.

| Concern         | File                          | Purpose                                                                       |
| --------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| Entry point     | `main.tsx`                    | Renders `<App />` into the DOM                                                |
| Root component  | `App.tsx`                     | Composes `<AppProviders>` + `<RouterProvider>` + global toast/notification UI |
| Providers       | `providers/AppProviders.tsx`  | Nests all context providers (Theme, Query, Error) in correct order            |
| Theme/Dark Mode | `providers/ThemeProvider.tsx` | Initializes `next-themes` to manage `.dark` class globally                    |
| Routing         | `router/routes.tsx`           | Declares every route, wraps with guards, lazy-loads pages                     |
| Global styles   | `styles/index.css`            | Tailwind directives, Dark Mode custom variants, global resets                 |

> [!NOTE]
> The `app/` layer is the only layer allowed to reach into every other layer. It's the composition root.

---

### `pages/` — Route Compositions

Pages are **thin assembly layers**. A page component does three things:

1. Imports feature components
2. Arranges them in a layout
3. Passes route params down

```tsx
// pages/example-feature/ExampleListPage.tsx
import { ExampleList, ExampleFilters } from "@/features/example-feature";
import { PageHeader } from "@/shared/ui";

export function ExampleListPage() {
  return (
    <>
      <PageHeader title="Examples" />
      <ExampleFilters />
      <ExampleList />
    </>
  );
}
```

**Rules**:

- Pages must NOT contain business logic, API calls, or state management.
- Pages must NOT define their own hooks.
- A page's job is to compose, not compute.

---

### `widgets/` — Composite UI Blocks

Widgets are **larger UI compositions that combine shared UI components and potentially data from multiple features**. Think: a `Header` that shows auth status AND notification count, or a `DataTable` with sorting/filtering/pagination built in.

**When to use `widgets/` vs `shared/ui/`**:

- `shared/ui/Button` → pure UI, zero data awareness, works anywhere
- `widgets/header/Header` → knows about layout, may pull from auth or notification features

---

### `features/` — Business Logic Domains

This is where your application actually lives. Each feature is a **vertical slice** that owns everything it needs:

| Subdirectory  | Contains                                                | Example                                |
| ------------- | ------------------------------------------------------- | -------------------------------------- |
| `api/`        | Raw HTTP functions using the shared Axios instance      | `getExamples()`, `createExample()`     |
| `hooks/`      | React Query hooks wrapping API calls + UI logic hooks   | `useExamples()`, `useExampleFilters()` |
| `components/` | Feature-specific React components                       | `ExampleCard`, `ExampleForm`           |
| `store/`      | Client-side state (Zustand slices)                      | `useExampleStore`                      |
| `types/`      | TypeScript interfaces, DTOs, enums for this domain      | `Example`, `CreateExampleDTO`          |
| `utils/`      | Pure helper functions scoped to this feature            | `calculateExampleMetrics()`            |
| `index.ts`    | **Public API** — the ONLY file other layers import from | Barrel re-exports                      |

> [!CAUTION]
> **The `index.ts` barrel is a contract.** Other layers (pages, widgets, other features) must ONLY import from `@/features/example-feature` — never reach into internal paths like `@/features/example-feature/hooks/useExamples`. If it's not in the barrel, it's private.

---

### `shared/` — Foundation Layer

Everything generic and reusable. **Zero business domain knowledge.**

| Subdirectory          | Contains                                | Rule                                                 |
| --------------------- | --------------------------------------- | ---------------------------------------------------- |
| `ui/`                 | Generic UI (Button, Modal, ThemeToggle) | Must work without any feature context                |
| `ui/**/*.stories.tsx` | Storybook documentation                 | Visually test UI components in isolation             |
| `layouts/`            | Page shells (MainLayout, AuthLayout)    | Structural wrappers with `<Outlet />`                |
| `lib/`                | Third-party library configurations      | Axios instance, QueryClient factory, day.js setup    |
| `config/`             | App-wide configuration                  | Env validation, route constants, magic values        |
| `hooks/`              | Generic reusable hooks                  | `useDebounce`, `useLocalStorage` — no business logic |
| `utils/`              | Pure utility functions                  | `cn()`, formatters, validators                       |
| `types/`              | Global TypeScript types                 | `ApiResponse<T>`, `BaseEntity`, `ID`                 |

---

### `test/` — Test Infrastructure

Shared test utilities that **don't belong to any specific feature**.

- `setup.ts` — Vitest global setup (DOM cleanup, MSW bootstrap)
- `mocks/` — MSW handlers and server for network mocking
- `utils/renderWithProviders.tsx` — Custom `render()` wrapping components with QueryClient, Router, etc.

---

## 4. Enterprise Concerns — Where They Live

### Axios Instance & API Interceptors

📍 **Location**: `src/shared/lib/axios.ts`

```typescript
// shared/lib/axios.ts
import axios from "axios";
import { env } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Request: Attach auth token ──────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Response: Handle 401 globally ───────────────────────────────
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

**Why here?** Every feature's `api/` layer imports `apiClient` from shared. One instance, one place to configure auth headers, logging, retry logic, and error normalization.

---

### Error Boundaries (Global + Feature-Level)

📍 **Global**: `src/app/providers/ErrorBoundaryProvider.tsx`
📍 **Feature-level**: `src/features/<name>/components/<Name>ErrorBoundary.tsx`
📍 **Fallback UI**: `src/shared/ui/ErrorFallback/ErrorFallback.tsx`

**Strategy — Layered Boundaries**:

```
App.tsx
└── ErrorBoundaryProvider        ← Catches unhandled errors (global)
    └── RouterProvider
        └── Page
            └── ExampleErrorBoundary  ← Catches feature-specific errors
                └── ExampleList
```

The global boundary is the last resort — it shows a "Something went wrong" page. Feature-level boundaries isolate crashes so that a failing `ExampleList` doesn't take down the entire page. The user sees a scoped error message, and the rest of the page stays functional.

```tsx
// shared/ui/ErrorFallback/ErrorFallback.tsx
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div role="alert" className="...">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

---

### Route Definitions (Protected vs. Public + Lazy Loading)

📍 **Routes**: `src/app/router/routes.tsx`
📍 **Guards**: `src/app/router/ProtectedRoute.tsx` + `PublicRoute.tsx`
📍 **Lazy imports**: `src/app/router/LazyImports.ts`
📍 **Route constants**: `src/shared/config/routes.ts`

```typescript
// app/router/LazyImports.ts
import { lazy } from "react";

export const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage })),
);
export const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.DashboardPage })),
);
export const ExampleListPage = lazy(() =>
  import("@/pages/example-feature").then((m) => ({
    default: m.ExampleListPage,
  })),
);
// ... all lazy page imports live here
```

```tsx
// app/router/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ROUTES } from "@/shared/config/routes";
import { MainLayout, AuthLayout } from "@/shared/layouts";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Spinner } from "@/shared/ui";
import * as Pages from "./LazyImports";

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Spinner fullScreen />}>{children}</Suspense>;
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
              <SuspenseWrapper>
                <Pages.LoginPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: ROUTES.REGISTER,
            element: (
              <SuspenseWrapper>
                <Pages.RegisterPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  // ── Protected Routes ───────────────────────────────────────
  {
    element: <ProtectedRoute />,
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
            path: ROUTES.DASHBOARD,
            element: (
              <SuspenseWrapper>
                <Pages.DashboardPage />
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
        ],
      },
    ],
  },
]);
```

```tsx
// app/router/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return <Outlet />;
}
```

```tsx
// app/router/PublicRoute.tsx — Redirect away from login if already authenticated
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";

export function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return <Outlet />;
}
```

---

### Environment Variables Validation

📍 **Location**: `src/shared/config/env.ts`
📍 **Type declarations**: `src/env.d.ts`

**Why validate?** Because `import.meta.env.VITE_API_URL` is `string | undefined` at runtime. A typo in your `.env` file won't crash at build time — it'll crash at runtime when the user hits the API. We fail fast on app startup instead.

```typescript
// shared/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url("VITE_API_BASE_URL must be a valid URL"),
  VITE_APP_NAME: z.string().min(1),
  VITE_ENABLE_MOCKS: z.coerce.boolean().default(false),
});

// This will throw at startup if env vars are invalid
export const env = envSchema.parse(import.meta.env);
```

```typescript
// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENABLE_MOCKS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 5. Dependency Flow Rule

This is the single most important architectural constraint. Memorize it.

```
┌─────────────┐
│    app/      │ ──can-import──▶  everything
├─────────────┤
│   pages/     │ ──can-import──▶  widgets, features, shared
├─────────────┤
│  widgets/    │ ──can-import──▶  features, shared
├─────────────┤
│  features/   │ ──can-import──▶  shared  (⛔ NOT other features)
├─────────────┤
│   shared/    │ ──can-import──▶  nothing above
└─────────────┘
```

> [!WARNING]
> **Feature-to-feature imports are FORBIDDEN.** If `features/orders/` needs user data from `features/auth/`, it does NOT import from auth directly. Instead:
>
> **Option A**: The page-level component passes the data down as props.
> **Option B**: The shared data contract lives in `shared/types/` and both features consume it independently.
> **Option C**: A widget composes both features.
>
> This prevents circular dependencies and keeps features independently deployable and testable.

---

## 6. Workflow Rules (Team Contract)

These are non-negotiable. Violating them creates the same spaghetti that FSD was designed to prevent.

### Rule 1: The Barrel Export Gate

Every feature folder MUST have an `index.ts` that explicitly exports its public API. **External consumers import ONLY from the barrel.**

```typescript
// ✅ Correct
import { useExamples, ExampleCard } from "@/features/example-feature";

// ❌ Forbidden — reaching into feature internals
import { useExamples } from "@/features/example-feature/hooks/useExamples";
```

**Why?** The barrel is a contract. You can refactor everything inside a feature (rename files, restructure folders) without breaking a single import anywhere else in the app.

---

### Rule 2: Generic UI → `shared/ui/`. Domain UI → `features/<name>/components/`.

Ask yourself: _"Does this component need to know about the business domain to work?"_

| Answer                                    | Location                      | Example                                       |
| ----------------------------------------- | ----------------------------- | --------------------------------------------- |
| **No** — it's a pure UI primitive         | `shared/ui/`                  | `Button`, `Modal`, `Input`, `Card`, `Spinner` |
| **Yes** — it renders domain-specific data | `features/<name>/components/` | `ExampleCard`, `WorkoutTimer`, `ExerciseForm` |

A `Button` doesn't care if it's in a workout app or a banking app. An `ExampleCard` renders `Example` domain objects — it belongs to the feature.

---

### Rule 3: No Cross-Feature Imports

Features are **islands**. They don't know each other exist.

```typescript
// ❌ NEVER — feature importing from another feature
import { useAuthStore } from "@/features/auth";  // inside features/orders/

// ✅ Instead — pass data from the page layer
// pages/orders/OrdersPage.tsx
import { useAuth } from "@/features/auth";
import { OrderList } from "@/features/orders";

export function OrdersPage() {
  const { user } = useAuth();
  return <OrderList userId={user.id} />;
}
```

---

### Rule 4: Co-locate Tests With Source

Tests live next to the code they test. Not in a separate top-level `__tests__/` directory.

```
features/example-feature/
├── hooks/
│   ├── useExamples.ts
│   └── __tests__/
│       └── useExamples.test.ts       ← Right next to the hook
├── components/
│   ├── ExampleCard.tsx
│   └── __tests__/
│       └── ExampleCard.test.tsx      ← Right next to the component
```

**Exception**: Small files where a single `.test.ts` sibling is cleaner than a `__tests__/` directory (e.g., `exampleStore.ts` + `exampleStore.test.ts`).

**Why?** When you delete a feature folder, all its tests go with it. No orphaned test files. No test files that test code that no longer exists.

---

### Rule 5: Server State = React Query. Client State = Zustand. Never Mix.

| State Type                          | Tool                                    | Example                                                          |
| ----------------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| Server state (data from API)        | React Query (`useQuery`, `useMutation`) | User profile, list of examples, dashboard metrics                |
| Client state (UI-only, ephemeral)   | Zustand store                           | Sidebar open/closed, active filters, selected items, form drafts |
| URL state (shareable, bookmarkable) | React Router (`useSearchParams`)        | Current page, sort order, active tab                             |

```typescript
// ❌ Don't store server data in Zustand
const useExampleStore = create((set) => ({
  examples: [],                      // This should be in React Query
  fetchExamples: async () => { ... } // This is React Query's job
}));

// ✅ Zustand handles client-only state
const useExampleStore = create((set) => ({
  selectedIds: new Set<string>(),
  isFilterPanelOpen: false,
  toggleFilterPanel: () => set((s) => ({ isFilterPanelOpen: !s.isFilterPanelOpen })),
}));
```

---

## 7. Naming Conventions

### Files & Folders

| Type                | Convention                                            | Example                                           |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------- |
| Feature folders     | `kebab-case`                                          | `example-feature/`, `user-settings/`              |
| React components    | `PascalCase.tsx`                                      | `ExampleCard.tsx`, `ErrorFallback.tsx`            |
| Hooks               | `camelCase.ts`, prefixed with `use`                   | `useExamples.ts`, `useDebounce.ts`                |
| Utilities / helpers | `camelCase.ts`                                        | `formatters.ts`, `validators.ts`                  |
| Store files         | `camelCase.ts`, suffixed with `Store`                 | `exampleStore.ts`, `authStore.ts`                 |
| API files           | `camelCase.ts`, suffixed with `Api`                   | `exampleApi.ts`, `authApi.ts`                     |
| Types files         | `camelCase.ts`, suffixed with `.types`                | `example.types.ts`, `api.types.ts`                |
| Test files          | Mirror source + `.test.ts(x)`                         | `ExampleCard.test.tsx`, `useExamples.test.ts`     |
| Barrel exports      | `index.ts`                                            | Always `index.ts` — never `index.tsx` for barrels |
| Constants           | `SCREAMING_SNAKE_CASE` values in `camelCase.ts` files | `const MAX_RETRY_COUNT = 3;`                      |

### React Query Keys

Use a factory pattern for type-safe, hierarchical cache keys:

```typescript
// features/example-feature/api/exampleApi.ts
export const exampleKeys = {
  all: ["examples"] as const,
  lists: () => [...exampleKeys.all, "list"] as const,
  list: (filters: ExampleFilters) => [...exampleKeys.lists(), filters] as const,
  details: () => [...exampleKeys.all, "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};
```

### Zustand Store Naming

```typescript
// The hook is named use<Domain>Store
export const useExampleStore = create<ExampleState>()(
  devtools(
    (set) => ({ ... }),
    { name: "example-store" }  // DevTools label uses kebab-case
  )
);
```

---

## 8. Core Configuration Files

These files live at the project root (outside `src/`):

| File                 | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `vite.config.ts`     | Vite build config, path aliases (`@/` → `src/`), plugins |
| `tsconfig.json`      | TypeScript compiler options, path mapping                |
| `tsconfig.app.json`  | App-specific TS config (extends base)                    |
| `tsconfig.node.json` | Node-specific TS config (Vite config file itself)        |
| `tailwind.config.ts` | Tailwind theme, custom colors, fonts, plugins            |
| `postcss.config.js`  | PostCSS plugins (Tailwind, autoprefixer)                 |
| `vitest.config.ts`   | Test runner config (or collocated in `vite.config.ts`)   |
| `.env`               | Local environment variables (git-ignored)                |
| `.env.example`       | Documented env var template (committed)                  |
| `eslint.config.js`   | Linting rules                                            |
| `prettier.config.js` | Code formatting rules                                    |

### Path Alias Setup

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```json
// tsconfig.app.json (relevant snippet)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 9. Adding a New Feature (Step-by-Step)

When you're tasked with building, say, a `notifications` feature:

### Step 1: Scaffold the directory

```
src/features/notifications/
├── index.ts
├── api/
│   └── notificationApi.ts
├── hooks/
│   ├── useNotifications.ts
│   └── index.ts
├── components/
│   ├── NotificationList.tsx
│   └── NotificationBadge.tsx
├── store/
│   └── notificationStore.ts
├── types/
│   └── notification.types.ts
└── utils/
```

### Step 2: Define types first

```typescript
// features/notifications/types/notification.types.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
```

### Step 3: Build the API layer

```typescript
// features/notifications/api/notificationApi.ts
import { apiClient } from "@/shared/lib";
import type { Notification } from "../types";
import type { ApiResponse } from "@/shared/types";

export const notificationApi = {
  getAll: () => apiClient.get<ApiResponse<Notification[]>>("/notifications"),
  markRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
};

export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
};
```

### Step 4: Create React Query hooks

```typescript
// features/notifications/hooks/useNotifications.ts
import { useQuery } from "@tanstack/react-query";
import { notificationApi, notificationKeys } from "../api/notificationApi";

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationApi.getAll().then((res) => res.data.data),
  });
}
```

### Step 5: Build components

Components consume hooks and render domain UI.

### Step 6: Wire up the barrel export

```typescript
// features/notifications/index.ts
export type { Notification } from "./types/notification.types";
export { useNotifications } from "./hooks";
export { NotificationList } from "./components/NotificationList";
export { NotificationBadge } from "./components/NotificationBadge";
```

### Step 7: Create the page

```typescript
// pages/notifications/NotificationsPage.tsx
import { NotificationList } from "@/features/notifications";

export function NotificationsPage() {
  return <NotificationList />;
}
```

### Step 8: Add the route

Add to `app/router/LazyImports.ts` and `app/router/routes.tsx`.

### Step 9: Write tests

Co-locate with the source code in `__tests__/` directories.

---

## Quick Reference Card

| I need to...                            | I put it in...                                       |
| --------------------------------------- | ---------------------------------------------------- |
| Add a new domain/feature                | `features/<name>/`                                   |
| Create a reusable Button/Modal/Input    | `shared/ui/<Name>/`                                  |
| Configure Axios/Day.js/QueryClient      | `shared/lib/`                                        |
| Add a global constant or route path     | `shared/config/`                                     |
| Create a generic hook like useDebounce  | `shared/hooks/`                                      |
| Build a new page                        | `pages/<name>/`                                      |
| Compose multiple features into a header | `widgets/<name>/`                                    |
| Add a new route                         | `app/router/routes.tsx`                              |
| Add a new provider                      | `app/providers/`                                     |
| Validate env variables                  | `shared/config/env.ts`                               |
| Add global error handling               | `app/providers/ErrorBoundaryProvider.tsx`            |
| Add feature-scoped error handling       | `features/<name>/components/<Name>ErrorBoundary.tsx` |
| Add MSW mock handlers                   | `test/mocks/handlers.ts`                             |
| Add a test render helper                | `test/utils/`                                        |

---

> [!TIP]
> **When in doubt, ask**: "If I delete this feature folder, will anything outside it break?"
> If the answer is "only the page that imports it" — you've structured it correctly.
> If the answer is "half the app breaks" — you have coupling that needs to be untangled.
