import { twMerge, type ClassNameValue } from "tailwind-merge";

/**
 * Merges tailwind classes and resolves conflicts correctly using tailwind-merge.
 *
 * @example
 * cn("px-2 py-1", isPrimary && "bg-blue-500", "px-4") // -> "py-1 bg-blue-500 px-4"
 */
export function cn(...inputs: ClassNameValue[]) {
  return twMerge(...inputs);
}
