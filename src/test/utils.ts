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
};
