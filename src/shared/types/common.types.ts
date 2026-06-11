export type ID = string | number;

export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

/**
 * Useful for making specific properties optional while keeping others required.
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
