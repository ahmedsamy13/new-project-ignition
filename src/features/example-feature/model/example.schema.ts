import { z } from "zod/v4";
import type { BaseEntity } from "@/shared/types";

// ─── Validation Schemas ─────────────────────────────────────────────
export const exampleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["active", "archived", "draft"]),
  score: z.number(),
});

export const createExampleSchema = exampleSchema.pick({
  title: true,
  description: true,
  status: true,
});

export const updateExampleSchema = createExampleSchema.partial();

// ─── Derived Types ──────────────────────────────────────────────────
export type Example = z.infer<typeof exampleSchema> & BaseEntity;
export type CreateExampleDTO = z.infer<typeof createExampleSchema>;
export type UpdateExampleDTO = z.infer<typeof updateExampleSchema>;
