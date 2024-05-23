export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  status?: undefined;
};

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Define the User type
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
};
