import bcrypt from "bcrypt";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

import prisma from "../../../shared/prisma";
import { IChangePassword } from "./auth.interface";
import { UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { AuthUtils } from "./auth.utils";
import { hashedPassword } from "../../../helpers/hashPasswordHelper";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = (await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  })) as UserData;

  console.log(userData);

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.createToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    accessToken: accessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  console.log(oldPassword);
  console.log(newPassword);
  console.log("from auth service", user);

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user?.id,
      status: UserStatus.ACTIVE,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await AuthUtils.comparePasswords(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  const hashPassword = await hashedPassword(newPassword);

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });
};

export const AuthService = {
  loginUser,
  changePassword,
};
