import { z } from "zod/v4";
import type { BaseEntity } from "@/shared/types";

// ─── Domain Models ──────────────────────────────────────────────────
export interface Example extends BaseEntity {
  title: string;
  description?: string;
  status: "active" | "archived" | "draft";
  score: number;
}

// ─── DTOs (Data Transfer Objects) ───────────────────────────────────
export type CreateExampleDTO = Pick<Example, "title" | "description" | "status">;
export type UpdateExampleDTO = Partial<CreateExampleDTO>;

// ─── Validation Schemas ─────────────────────────────────────────────
export const exampleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["active", "archived", "draft"]),
});
