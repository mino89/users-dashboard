export type UserRole = "admin" | "user" | "moderator";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: UserRole;
};

export type UsersList = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
