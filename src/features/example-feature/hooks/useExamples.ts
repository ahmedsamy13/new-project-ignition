import { useQuery } from "@tanstack/react-query";
import { exampleApi, exampleKeys } from "../api/exampleApi";

export function useExamples(page = 1, limit = 10) {
  return useQuery({
    queryKey: exampleKeys.list({ page, limit }),
    queryFn: async () => {
      const { data } = await exampleApi.getAll(page, limit);
      return data;
    },
  });
}
