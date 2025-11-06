import { useCallback, useRef } from "react";

/**
 *
 * @param func {T} The function to debounce.
 * @param delay {number} The debounce delay in milliseconds.
 * @returns {T} The debounced function.
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number = 300,
): T {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    },
    [func, delay],
  );

  return debouncedFunc as T;
}
