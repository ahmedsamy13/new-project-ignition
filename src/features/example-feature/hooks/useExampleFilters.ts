import { useState } from 'react';

export function useExampleFilters() {
  const [filters, setFilters] = useState({});
  return { filters, setFilters };
}
