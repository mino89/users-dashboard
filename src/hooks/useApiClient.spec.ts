import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useApiClient } from "./useApiClient";
import { TestWrapper } from "@test/test-wrapper";
import { MOCK_DATA } from "@test/utils";

const regularQueryHook = () =>
  renderHook(
    () =>
      useApiClient({
        queryKeys: ["users"],
      }),
    { wrapper: TestWrapper },
  );

const infiniteQueryHook = () =>
  renderHook(
    () =>
      useApiClient({
        queryKeys: ["users", "infinite"],
        infinite: true,
        initialPageParam: 0,
        getNextPageParam: (lastPage: any, allPages: any[]) => {
          const totalLoaded = allPages.length * 10;
          if (totalLoaded < lastPage.total) {
            return totalLoaded;
          }
          return undefined;
        },
      }),
    { wrapper: TestWrapper },
  );

describe("useApiClient", () => {
  describe("Regular Query", () => {
    it("should display successfully data", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => MOCK_DATA.users,
      });

      const { result } = regularQueryHook();

      await waitFor(() => {
        expect(result.current.data).toEqual(MOCK_DATA.users);
        expect(result.current.isError).toBe(false);
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should handle errors", async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(MOCK_DATA.errors[404]);
      const { result } = regularQueryHook();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("Infinite Query", () => {
    it("should fetch initial page successfully", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => MOCK_DATA.infiniteUsers.page1,
      });

      const { result } = infiniteQueryHook();

      await waitFor(() => {
        const infiniteResult = result.current as any;
        expect(infiniteResult.data).toBeDefined();
        expect(infiniteResult.data?.pages).toHaveLength(1);
        expect(infiniteResult.data?.pages[0]).toEqual(
          MOCK_DATA.infiniteUsers.page1,
        );
        expect(infiniteResult.isError).toBe(false);
        expect(infiniteResult.isLoading).toBe(false);
        expect(infiniteResult.hasNextPage).toBe(true);
      });
    });

    it("should fetch next page when fetchNextPage is called", async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => MOCK_DATA.infiniteUsers.page1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => MOCK_DATA.infiniteUsers.page2,
        });

      globalThis.fetch = fetchMock;

      const { result } = infiniteQueryHook();

      await waitFor(() => {
        const infiniteResult = result.current as any;
        expect(infiniteResult.data?.pages).toHaveLength(1);
        expect(infiniteResult.hasNextPage).toBe(true);
      });

      const infiniteResult = result.current as any;
      infiniteResult.fetchNextPage();

      await waitFor(() => {
        const infiniteResult = result.current as any;
        expect(infiniteResult.data?.pages).toHaveLength(2);
        expect(infiniteResult.data?.pages[0]).toEqual(
          MOCK_DATA.infiniteUsers.page1,
        );
        expect(infiniteResult.data?.pages[1]).toEqual(
          MOCK_DATA.infiniteUsers.page2,
        );
        expect(infiniteResult.hasNextPage).toBe(false);
      });

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/skip=0/),
        expect.any(Object),
      );
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/skip=10/),
        expect.any(Object),
      );
    });

    it("should use custom pageParamKey", async () => {
      const customPageHook = () =>
        renderHook(
          () =>
            useApiClient({
              queryKeys: ["users", "custom"],
              infinite: true,
              initialPageParam: 1,
              pageParamKey: "page",
              getNextPageParam: (lastPage: any) => {
                return lastPage.hasMore ? lastPage.nextPage : undefined;
              },
            }),
          { wrapper: TestWrapper },
        );

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => MOCK_DATA.infiniteUsers.customPage,
      });

      const { result } = customPageHook();

      await waitFor(() => {
        const infiniteResult = result.current as any;
        expect(infiniteResult.data?.pages).toHaveLength(1);
      });

      // Verify the custom page parameter was used
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/page=1/),
        expect.any(Object),
      );
    });

    it("should handle infinite query errors", async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(MOCK_DATA.errors[500]);
      const { result } = infiniteQueryHook();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeDefined();
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
