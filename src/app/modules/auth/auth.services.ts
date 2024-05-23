import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

import prisma from "../../../shared/prisma";

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

export const AuthService = {
  loginUser,
};
