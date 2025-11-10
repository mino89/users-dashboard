import { vi } from "vitest";

export const MOCK_DATA = {
  errors: {
    404: {
      ok: false,
      status: 404,
      statusText: "not found",
    },
    500: {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    },
  },
  users: [
    {
      name: "Frank Freeman",
      role: "admin",
    },
    {
      name: "John Doe",
      role: "editor",
    },
  ],
  user: {
    id: 1,
    name: "John doe",
    role: "admin",
  },
  filtersConfig: [
    {
      key: "name",
      ariaLabel: "Filter by name",
      type: "text",
      value: "",
    },
    {
      key: "role",
      ariaLabel: "Filter by role",
      type: "text",
      value: "",
    },
  ],
  filters: {
    name: "John",
    role: "editor",
  },
};

export const mockLocalStorage = () => {
  Object.defineProperty(window, "localStorage", {
    value: vi.fn(() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })(),
  });
};

export const mockMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
    })),
  });
};
