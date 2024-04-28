export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  status?: undefined;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
