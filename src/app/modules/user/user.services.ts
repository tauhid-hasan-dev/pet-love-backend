import { Request } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

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

export const UserServices = {
  createUser,
};
