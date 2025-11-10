import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useFilters, useFiltersResults } from "./useFilters";
import { MOCK_DATA } from "@test/utils";

describe("useFilters hook", () => {
  describe("useFiltersResults", () => {
    test("should filter data based on set filters", async () => {
      const { result } = renderHook(() => useFiltersResults());

      act(() => {
        result.current.setFilters(MOCK_DATA.filters);
      });

      await waitFor(() => {
        const filtered = result.current.filteredData(MOCK_DATA.users);
        expect(filtered).toEqual([MOCK_DATA.users[1]]);
      });
    });

    describe("useFilters", () => {
      test("should update and reset filters correctly", async () => {
        const mockCallback = vi.fn();
        const initialValues = { role: "", status: "" };
        const { result } = renderHook(() =>
          useFilters(initialValues, mockCallback),
        );

        act(() => {
          result.current.updateFilters("role", "admin", true);
        });

        await waitFor(() => {
          expect(mockCallback).toHaveBeenCalledWith({
            role: "admin",
            status: "",
          });
        });

        act(() => {
          result.current.resetFilters();
        });

        await waitFor(() => {
          expect(mockCallback).toHaveBeenCalledWith(initialValues);
        });
      });
    });
    test("should return filterValues correctly", async () => {
      const mockCallback = vi.fn();
      const initialValues = { role: "user", status: "active" };
      const { result } = renderHook(() =>
        useFilters(initialValues, mockCallback),
      );

      expect(result.current.filterValues).toEqual(initialValues);
    });
  });
});
