import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exampleApi } from '../api/exampleApi';

export function useUpdateExample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exampleApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
