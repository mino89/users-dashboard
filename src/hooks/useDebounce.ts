import { useCallback, useRef } from "react";

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
