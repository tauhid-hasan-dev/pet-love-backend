import { NextFunction, Request, Response } from "express";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IPetFilterRequest } from "./pet.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";
import { petSearchableFields } from "./pet.constant";

const getAllFromDB = async (
  params: IPetFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.PetWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: petSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  //console.dir(andCondions, { depth: 'inifinity' })
  const whereConditons: Prisma.PetWhereInput = { AND: andCondions };

  const result = await prisma.pet.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createPet = async (req: Request) => {
  console.log(req.body);
  const result = await prisma.pet.create({
    data: req.body,
  });
  console.log(result);
  return result;
};

export const PetServices = {
  createPet,
  getAllFromDB,
};
