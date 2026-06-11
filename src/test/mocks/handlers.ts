import { http, HttpResponse } from "msw";
import { env } from "@/shared/config/env";

export const handlers = [
  http.get(`${env.VITE_API_BASE_URL}/examples`, () => {
    return HttpResponse.json({
      data: [
        { id: "1", title: "Test Example 1", status: "active", score: 100 },
        { id: "2", title: "Test Example 2", status: "draft", score: 50 },
      ],
      meta: { page: 1, limit: 10, total: 2, totalPages: 1 },
    });
  }),
];
