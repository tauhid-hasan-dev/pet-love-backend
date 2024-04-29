import { Request } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";


const createUser = async (req: Request) => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  const { password, ...userWithoutPassword } = result;

  return userWithoutPassword;
};

const getProfile = async (req: Request) => {
  if (req.user) {
    const userInfo = await prisma.user.findUniqueOrThrow({
      where: { email: req.user.email } 
    });
    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      createdAt : userInfo.createdAt,
      updatedAt : userInfo.updatedAt,
    };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User information not available");
  }
};


export const UserServices = {
  createUser,
  getProfile
};
