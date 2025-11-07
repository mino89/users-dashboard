export type UserRole = "admin" | "user" | "moderator";

export type LatLng = {
  lat: number;
  lng: number;
};

export type UserAddress = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  coordinates: LatLng;
};

export type UserCompany = {
  name: string;
  department: string;
  title: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
  gender: string;
  bloodGroup: string;
  address: UserAddress;
  company: UserCompany;
  role: UserRole;
};

export type UsersList = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
