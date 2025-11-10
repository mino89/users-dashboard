import { render, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  test("should throw error when used outside ThemeProvider", () => {
    let error: Error;
    try {
      renderHook(() => useTheme());
    } catch (e) {
      error = e as Error;
    }
    expect(error!.message).toBe("useTheme must be used within a ThemeProvider");
  });
});
