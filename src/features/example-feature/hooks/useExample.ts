import { useQuery } from '@tanstack/react-query';
import { exampleApi } from '../api/exampleApi';

export function useExample(id: string) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: () => exampleApi.getById(id),
  });
}
