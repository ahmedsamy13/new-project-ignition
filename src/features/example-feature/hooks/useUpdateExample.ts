import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exampleApi } from '../api/exampleApi';

export function useUpdateExample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: import('../model').UpdateExampleDTO }) => exampleApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
