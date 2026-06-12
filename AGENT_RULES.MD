# AI Agent Directives: Feature-Sliced Design (FSD)

This codebase strictly enforces Feature-Sliced Design (FSD). Any code modifications or generations MUST adhere to the following constraints.

## Conflict Resolution (Read First)

When rules conflict, prioritize in this order:

1. **Type Safety** (TypeScript / Zod correctness)
2. **FSD Layer Rules** (dependency flow, isolation)
3. **Naming Conventions**
4. **Styling / Formatting preferences**

If a task cannot be completed without violating a rule, stop and ask the user before proceeding.

---

## Before Coding

- Read related files before making changes.
- Understand existing patterns before creating new ones.
- Reuse existing abstractions whenever possible.
- Do not introduce new libraries without explicit user approval.

## Self Review

After every implementation:

- [ ] Check TypeScript errors
- [ ] Check lint errors
- [ ] Check unused imports
- [ ] Check edge cases
- [ ] Check accessibility concerns
- [ ] Check barrel exports are updated (`index.ts`)
- [ ] Check Zod schemas cover all new API fields
- [ ] Check `isLoading` and `isError` are handled for every `useQuery`
- [ ] Check `onError` is handled for every `useMutation`

---

## 1. Dependency Flow Constraints (CRITICAL)

Code may only import from layers strictly BELOW it in the following hierarchy:

`app/` ➔ `pages/` ➔ `widgets/` ➔ `features/` ➔ `shared/`

- **Forbidden 1:** `features/X` importing from `features/Y`. Features are strictly isolated. Data sharing must happen via `pages/` composition or `shared/` contracts.
- **Forbidden 2:** `shared/` containing any business logic or domain-specific names (e.g., `User`, `Product`).
- **Forbidden 3:** Reaching into a feature's internal directories. External layers MUST only import from `@/features/[name]/index.ts` (the Barrel file).

---

## 2. State & Data Constraints

- **Server State:** All API interactions must use `@tanstack/react-query`. You MUST use Query Key Factories (e.g., `export const userKeys = { all: ["users"] }`) located in the feature's `api/` directory.

- **Global UI State:** Use `zustand` ONLY for shared UI state that is accessed across multiple components (e.g., sidebar open/close, global notifications). Never store API response data in Zustand.

- **Local Component State:** Use `useState` or `useReducer` for state that is scoped to a single component. Do NOT create a Zustand store for local state like a modal toggle inside one component.

- **URL State:** Use React Router's `useSearchParams` for shareable state (pagination, filters).

- **Validation:** All incoming API data and form data must be validated using `zod`. Schemas live in `features/[name]/model/[domain].schema.ts`.

---

## 3. Component & UI Architecture

- **Pages:** Files in `pages/` must contain NO business logic, NO custom hooks, and NO API calls. They only compose features and layouts.

- **Routing:** All new pages MUST be lazy-loaded via `app/router/LazyImports.ts`. Never hardcode URLs; use the `ROUTES` constant from `shared/config/routes.ts`. When adding a new route, update `shared/config/routes.ts` first, then `app/router/LazyImports.ts`.

- **Styling:** Use Tailwind CSS v4. Construct dynamic classes using native template literals (e.g., `` `base-class ${isActive ? 'active-class' : ''}` ``). Do not use `cn` or `clsx` — this is intentional to avoid implicit dependency on utility libraries and keep class logic explicit and traceable.

- **Error Handling:** Every distinct feature page or complex widget must be wrapped in a localized Error Boundary rendering the generic `ErrorFallback` from `@/shared/ui`.

---

## 4. Strict Naming Conventions

- **Directories:** `kebab-case` (e.g., `features/user-profile/`)
- **Components:** `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Hooks:** `camelCase.ts` prefixed with `use` (e.g., `useUserProfile.ts`)
- **Types:** `[domain].types.ts` (e.g., `user.types.ts`)
- **Schemas:** `[domain].schema.ts` (e.g., `user.schema.ts`)
- **API/Store:** `[domain]Api.ts` and `[domain]Store.ts` (e.g., `userApi.ts`)
- **Tests:** Co-locate tests immediately next to the target file as `[filename].test.ts(x)`. Do NOT use `__tests__` folders for individual file tests unless testing a whole directory collectively.

---

## 5. Testing & Performance

- **Test User Behavior:** Use `@testing-library/react`. Interact with elements via roles (`getByRole`, `getByLabelText`) instead of `data-testid` or CSS classes whenever possible. Do not test internal component state.

- **Mocking:** Only mock the network layer (using MSW in `src/test/mocks/handlers.ts`). Update MSW handlers whenever API endpoints change. Do not mock child components unless absolutely necessary.

- **Defensive Rendering:**
  - For `useQuery`: explicitly handle `isLoading` and `isError` states before rendering data. Always use optional chaining (`data?.property`) when rendering API data.
  - For `useMutation`: always provide an `onError` callback. Never silently swallow mutation failures.

- **Optimization:** Do not use `useCallback` or `useMemo` prematurely. Only use them when passing props to deeply nested children, to `React.memo` components, or for very heavy computations.

---

## 6. TypeScript Standards

- **No `any`:** You must properly type all variables. If a type is complex or unknown at runtime, use `unknown` and parse it with Zod.
- **Interfaces vs Types:** Use `interface` for defining object shapes and API models. Use `type` exclusively for unions (e.g., `type Status = 'idle' | 'loading'`) or intersections.
- **Type Exports:** Export domain interfaces from `types/[domain].types.ts` and use them as the single source of truth across the feature.

---

## 7. Execution Rules for AI (CRITICAL)

- **Check Barrels:** Before using any feature component or hook externally, verify it is exported in the feature's `index.ts`. If not, export it first before importing.

- **Axios Instance:** Never import `axios` directly inside features. Always import `apiClient` from `@/shared/lib/axios.ts`.

- **Network Mocking:** Ensure MSW handlers in `src/test/mocks/handlers.ts` are updated whenever API endpoints change.

- **New Routes:** When adding a new page, follow this order: `shared/config/routes.ts` → `app/router/LazyImports.ts` → `pages/[page]/` → compose features inside.

- **New Features:** When creating a new feature, create the `index.ts` barrel immediately. Do not leave it empty — export everything that will be consumed externally from day one.

- **Zod First:** Before writing any interface that maps to an API response, write the Zod schema first in `features/[name]/model/[domain].schema.ts`, then derive the TypeScript type from it using `z.infer<>`.
