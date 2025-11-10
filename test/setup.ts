import { beforeEach, afterEach, vi } from "vitest";

vi.stubEnv("VITE_API_URL", "https://api.test.com");

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});
