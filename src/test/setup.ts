import { beforeEach, vi } from "vitest";

// Mock environment variables
vi.stubEnv("VITE_API_URL", "https://api.test.com");

// Setup global test configuration
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
});
