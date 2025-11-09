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
  infiniteUsers: {
    page1: {
      users: [
        { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
        { id: 2, firstName: "Jane", lastName: "Smith", role: "editor" },
      ],
      total: 20,
      skip: 0,
      limit: 10,
    },
    page2: {
      users: [
        { id: 3, firstName: "Bob", lastName: "Johnson", role: "user" },
        { id: 4, firstName: "Alice", lastName: "Brown", role: "editor" },
      ],
      total: 20,
      skip: 10,
      limit: 10,
    },
    customPage: {
      data: [{ id: 1, firstName: "Custom", lastName: "User", role: "admin" }],
      hasMore: false,
      nextPage: null,
    },
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
