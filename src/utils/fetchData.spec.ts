import { afterAll, describe, expect, it, vi } from "vitest";
import { fetchData } from "./fetchData";
import { MOCK_DATA } from "@test/utils";

const mockEndpoint = "https://test.co";
describe("fetchData", () => {
  it("must return an http response ", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      statusText: "OK",
      json: async () => MOCK_DATA.user,
    });

    expect(await fetchData(mockEndpoint)).toEqual(MOCK_DATA.user);
  });

  it("must return an error", async () => {
    globalThis.fetch = vi.fn().mockReturnValue(MOCK_DATA.errors[500]);
    await expect(fetchData(mockEndpoint)).rejects.toThrow(
      "500 : An error occurred",
    );
  });

  afterAll(() => {
    vi.resetAllMocks();
  });
});
