import { Request } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Prisma, Role, User, UserStatus } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUserFilterRequest } from "./user.interface";
import { userSearchableFields } from "./user.constant";

const getAllFromDB = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const whereConditions: any[] = [];

  if (searchTerm) {
    whereConditions.push({
      OR: userSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    Object.keys(filterData).forEach((key) => {
      whereConditions.push({
        [key]: {
          equals: (filterData as any)[key],
        },
      });
    });
  }

  whereConditions.push({
    isDeleted: false, // Filter out deleted users
  });

  const result = await prisma.user.findMany({
    where: {
      AND: whereConditions,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count({
    where: {
      AND: whereConditions,
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const createUser = async (req: Request) => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    profilePhoto:
      req.body.profilePhoto || "https://i.ibb.co/DDDbVvH/profile.png",
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
      where: { email: req.user.email },
    });
    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User information not available");
  }
};

const updateProfile = async (req: Request) => {
  if (req.user) {
    const userInfo = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: req.body,
    });
    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User information not available");
  }
};

const changeProfileStatus = async (userId: string, status: UserStatus) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exists!");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: status,
  });

  return updatedUser;
};

const updateRole = async (userId: string, role: Role) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exists!");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: role,
  });

  return updatedUser;
};

export const UserServices = {
  createUser,
  getProfile,
  updateProfile,
  getAllFromDB,
  changeProfileStatus,
  updateRole,
};
