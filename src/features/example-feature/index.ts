// ─── Example Feature: Public API ──────────────────────────────────────

// Types
export type { Example, CreateExampleDTO, UpdateExampleDTO } from "./model";
export { exampleSchema, createExampleSchema, updateExampleSchema } from "./model";

// Store (Client State)
export { useExampleStore } from "./store";

// Hooks (Server State + Logic)
export { useExamples, useCreateExample } from "./hooks";

// API
export { exampleApi } from "./api/exampleApi";

// Components
export { ExampleList, ExampleCard, ExampleErrorBoundary } from "./components";
