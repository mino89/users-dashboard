import { describe, test, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";
import { act } from "react";
import { renderHook } from "@testing-library/react";

describe("useDebounce hook", () => {
  test("should debounce a function", () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const { result } = renderHook(() => useDebounce(func, 500));
    const debouncedFunc = result.current;

    act(() => {
      debouncedFunc();
      debouncedFunc();
      debouncedFunc();
    });
    expect(func).not.toBeCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(func).toBeCalledTimes(1);

    vi.useRealTimers();
  });
});
