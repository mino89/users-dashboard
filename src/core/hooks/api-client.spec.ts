import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useApiClient } from "./api-client";
import { TestWrapper } from "@test/test-wrapper";
import { MOCK_DATA } from "@test/utils";

const hook = () =>
  renderHook(
    () =>
      useApiClient({
        queryKeys: ["users"],
      }),
    { wrapper: TestWrapper },
  );

describe("useApiClient", () => {
  it("should display succesfully data", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA.users,
    });

    const { result } = hook();

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_DATA.users);
      expect(result.current.isError).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should handle errors", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(MOCK_DATA.errors[404]);
    const { result } = hook();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
