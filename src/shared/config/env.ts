// ─── Environment Variables Validation ───────────────────────────────
// Validates all required env vars at startup using Zod.
// If any are missing or malformed, the app crashes immediately
// with a clear error instead of failing silently at runtime.

import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_BASE_URL: z.url("VITE_API_BASE_URL must be a valid URL"),
  VITE_APP_NAME: z.string().min(1, "VITE_APP_NAME is required"),
  VITE_ENABLE_MOCKS: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(import.meta.env);
