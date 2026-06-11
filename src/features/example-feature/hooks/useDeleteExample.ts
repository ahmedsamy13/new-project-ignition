import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exampleApi } from '../api/exampleApi';

export function useDeleteExample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
