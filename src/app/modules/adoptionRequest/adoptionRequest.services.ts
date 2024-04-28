import { NextFunction, Request, Response } from "express";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IPetFilterRequest } from "./adoptionRequest.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";
import { petSearchableFields } from "./adoptionRequest.constant";

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

const createAdoptionRequest = async (req: Request) => {
  let requestData: Prisma.AdoptionRequestCreateInput | undefined;
  if (req.user !== null) {
    requestData = {
      userId: req.user.id,
      ...req.body,
    };
  }
  if (requestData) {
    const result = await prisma.adoptionRequest.create({
      data: requestData,
    });
    console.log({ result });
    return result;
  } else {
    throw new Error("User information is missing.");
  }
};

export const AdoptionRequestServices = {
  createAdoptionRequest,
  getAllFromDB,
};
