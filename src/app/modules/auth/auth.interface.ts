export type ILoginUser = {
  email: string;
  password: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
