import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exampleApi, exampleKeys } from "../api/exampleApi";
import toast from "react-hot-toast";

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exampleApi.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
      toast.success("Example created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create example");
    },
  });
}
