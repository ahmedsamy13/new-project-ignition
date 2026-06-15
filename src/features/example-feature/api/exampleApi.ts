import { apiClient } from "@/shared/lib";
import type { Example, CreateExampleDTO, UpdateExampleDTO } from "../model";
import type { ApiResponse, PaginatedResponse } from "@/shared/types";

// ─── React Query Keys ───────────────────────────────────────────────
export const exampleKeys = {
  all: ["examples"] as const,
  lists: () => [...exampleKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...exampleKeys.lists(), { filters }] as const,
  details: () => [...exampleKeys.all, "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

// ─── API Client Functions ───────────────────────────────────────────
export const exampleApi = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get<PaginatedResponse<Example>>("/examples", {
      params: { page, limit },
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Example>>(`/examples/${id}`),

  create: (data: CreateExampleDTO) =>
    apiClient.post<ApiResponse<Example>>("/examples", data),

  update: (id: string, data: UpdateExampleDTO) =>
    apiClient.patch<ApiResponse<Example>>(`/examples/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/examples/${id}`),
};
